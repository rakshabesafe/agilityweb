import { NextResponse } from 'next/server';
import { products as initialProducts, bundles as initialBundles } from '@/data/products';
import fs from 'fs';

// For prototype persistence without a database, we'll write to a file in /tmp/
const DB_FILE = '/tmp/nutrio_db.json';

function readDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading DB:", err);
  }

  // Default State
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

function writeDB(data: unknown) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing DB:", err);
  }
}

export async function GET() {
  const state = readDB();

  // Create a copy without the password to send to the client context
  const clientState = {
    ...state,
    config: {
      ...state.config,
      shiprocketPassword: state.config.shiprocketPassword ? "********" : "" // Obscure password for client config reads
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
