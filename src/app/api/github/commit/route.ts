import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const DRAFT_FILE = path.join(os.tmpdir(), 'nutrio_draft.json');

export async function POST() {
  try {
    if (!fs.existsSync(DRAFT_FILE)) {
      return NextResponse.json({ error: 'No pending changes to commit.' }, { status: 400 });
    }

    const data = fs.readFileSync(DRAFT_FILE, 'utf8');
    const state = JSON.parse(data);

    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 
                (process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG 
                  ? `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}` 
                  : null);

    if (!repo || !token) {
      return NextResponse.json({ error: 'GitHub repository (GITHUB_REPO) or Token (GITHUB_TOKEN) is missing in environment variables.' }, { status: 400 });
    }

    // Clean up repo name (e.g. from https://github.com/user/repo to user/repo)
    let repoPath = repo.replace('https://github.com/', '').replace('http://github.com/', '').replace('.git', '');
    if (repoPath.endsWith('/')) repoPath = repoPath.slice(0, -1);

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    // 1. Get latest commit SHA
    const refRes = await fetch(`https://api.github.com/repos/${repoPath}/git/refs/heads/main`, { headers });
    if (!refRes.ok) {
      const errText = await refRes.text();
      throw new Error(`Failed to fetch main branch reference: ${errText}`);
    }
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2. Get base tree SHA
    const commitRes = await fetch(`https://api.github.com/repos/${repoPath}/git/commits/${latestCommitSha}`, { headers });
    if (!commitRes.ok) {
      const errText = await commitRes.text();
      throw new Error(`Failed to fetch latest commit: ${errText}`);
    }
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Create tree
    const tree = [];
    
    // Add products
    if (state.products) {
      for (const p of state.products) {
        tree.push({
          path: `public/assets/products/${p.slug}.json`,
          mode: '100644',
          type: 'blob',
          content: JSON.stringify(p, null, 2)
        });
      }
    }

    // Add bundles
    if (state.bundles) {
      for (const b of state.bundles) {
        tree.push({
          path: `public/assets/bundles/${b.slug}.json`,
          mode: '100644',
          type: 'blob',
          content: JSON.stringify(b, null, 2)
        });
      }
    }

    const createTreeRes = await fetch(`https://api.github.com/repos/${repoPath}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ base_tree: baseTreeSha, tree })
    });
    if (!createTreeRes.ok) {
      const errText = await createTreeRes.text();
      throw new Error(`Failed to create git tree: ${errText}`);
    }
    const treeData = await createTreeRes.json();
    const newTreeSha = treeData.sha;

    // 4. Create Commit
    const createCommitRes = await fetch(`https://api.github.com/repos/${repoPath}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: 'Update products and bundles via Admin Panel',
        tree: newTreeSha,
        parents: [latestCommitSha]
      })
    });
    if (!createCommitRes.ok) {
      const errText = await createCommitRes.text();
      throw new Error(`Failed to create commit: ${errText}`);
    }
    const newCommitData = await createCommitRes.json();
    const newCommitSha = newCommitData.sha;

    // 5. Update Reference
    const updateRefRes = await fetch(`https://api.github.com/repos/${repoPath}/git/refs/heads/main`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ sha: newCommitSha })
    });
    if (!updateRefRes.ok) {
      const errText = await updateRefRes.text();
      throw new Error(`Failed to update branch reference: ${errText}`);
    }

    // Clean up draft file now that it's committed
    fs.unlinkSync(DRAFT_FILE);

    return NextResponse.json({ success: true, message: 'Successfully committed changes to GitHub!' });
  } catch (err: unknown) {
    console.error('GitHub Commit Error:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
