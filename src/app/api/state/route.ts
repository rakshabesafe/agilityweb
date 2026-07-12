import { NextResponse } from 'next/server';
import { products as initialProducts, bundles as initialBundles } from '@/data/products';
import fs from 'fs';
import path from 'path';
import os from 'os';

// For draft state without committing to git instantly, we'll write to a file in /tmp/
const DRAFT_FILE = path.join(os.tmpdir(), 'nutrio_draft.json');

function readDB() {
  // 1. Try reading the draft file first
  try {
    if (fs.existsSync(DRAFT_FILE)) {
      const data = fs.readFileSync(DRAFT_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading Draft:", err);
  }

  // 2. Fallback to reading from the public/assets JSON files
  try {
    const productsDir = path.join(process.cwd(), 'public', 'assets', 'products');
    const bundlesDir = path.join(process.cwd(), 'public', 'assets', 'bundles');

    const products = [];
    if (fs.existsSync(productsDir)) {
      const pFiles = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
      for (const file of pFiles) {
        products.push(JSON.parse(fs.readFileSync(path.join(productsDir, file), 'utf8')));
      }
    }

    const bundles = [];
    if (fs.existsSync(bundlesDir)) {
      const bFiles = fs.readdirSync(bundlesDir).filter(f => f.endsWith('.json'));
      for (const file of bFiles) {
        bundles.push(JSON.parse(fs.readFileSync(path.join(bundlesDir, file), 'utf8')));
      }
    }

    return {
      products: products.length > 0 ? products : initialProducts,
      bundles: bundles.length > 0 ? bundles : initialBundles,
      config: {
        logoUrl: '/assets/nutrio-logo.png',
        bannerText: 'Welcome to Nutrio!',
        bannerEnabled: false,
        theme: 'default',
        shiprocketEmail: '',
        shiprocketPassword: ''
      }
    };
  } catch (err) {
    console.error("Error reading JSON files:", err);
    return {
      products: initialProducts,
      bundles: initialBundles,
      config: {
        logoUrl: '/assets/nutrio-logo.png',
        bannerText: 'Welcome to Nutrio!',
        bannerEnabled: false,
        theme: 'default',
        shiprocketEmail: '',
        shiprocketPassword: ''
      }
    };
  }
}

function writeDB(data: unknown) {
  try {
    fs.writeFileSync(DRAFT_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing Draft DB:", err);
  }
}

export async function GET() {
  const state = readDB();

  // Create a copy without the passwords to send to the client context
  const clientState = {
    ...state,
    config: {
      ...state.config,
      shiprocketPassword: state.config.shiprocketPassword ? "********" : "", // Obscure password for client config reads
    }
  };

  return NextResponse.json(clientState);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentState = readDB();

    // Only update provided fields
    const newState = {
      products: body.products || currentState.products,
      bundles: body.bundles || currentState.bundles,
      config: {
        ...currentState.config,
        ...(body.config || {})
      }
    };

    // If the client sends "*******" for password, it means they didn't change it. Keep existing.
    if (body.config && body.config.shiprocketPassword === "********") {
      newState.config.shiprocketPassword = currentState.config.shiprocketPassword;
    }

    writeDB(newState);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update state' }, { status: 500 });
  }
}
