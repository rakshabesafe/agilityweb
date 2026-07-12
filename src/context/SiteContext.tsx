"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts, bundles as initialBundles, learnArticles as initialLearnArticles, initialAboutContent, Product, Bundle, LearnArticle, AboutContent } from '@/data/products';

interface SiteConfig {
  logoUrl: string;
  bannerText: string;
  bannerEnabled: boolean;
  theme: string;
  shiprocketEmail?: string;
  shiprocketPassword?: string;
}

interface SiteContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  bundles: Bundle[];
  setBundles: (bundles: Bundle[]) => void;
  learnArticles: LearnArticle[];
  setLearnArticles: (articles: LearnArticle[]) => void;
  aboutContent: AboutContent;
  setAboutContent: (content: AboutContent) => void;
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
  isLoaded: boolean;
}

const defaultConfig: SiteConfig = {
  logoUrl: '/assets/nutrio-logo.png',
  bannerText: 'Welcome to Nutrio!',
  bannerEnabled: false,
  theme: 'default',
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(initialProducts);
  const [bundles, setBundlesState] = useState<Bundle[]>(initialBundles);
  const [learnArticles, setLearnArticlesState] = useState<LearnArticle[]>(initialLearnArticles);
  const [aboutContent, setAboutContentState] = useState<AboutContent>(initialAboutContent);
  const [config, setConfigState] = useState<SiteConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/state')
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setProductsState(data.products);
        }
        if (data.bundles) {
          setBundlesState(data.bundles);
        }
        if (data.learnArticles) {
          setLearnArticlesState(data.learnArticles);
        }
        if (data.aboutContent) {
          setAboutContentState(data.aboutContent);
        }
        if (data.config) {
          setConfigState({ ...defaultConfig, ...data.config });
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error('Failed to fetch site state', err);
        setIsLoaded(true); // Fallback to defaults
      });
  }, []);

  const setProducts = (newProducts: Product[]) => {
    setProductsState(newProducts);
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: newProducts })
    });
  };

  const setBundles = (newBundles: Bundle[]) => {
    setBundlesState(newBundles);
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bundles: newBundles })
    }).catch(err => console.error(err));
  };

  const setLearnArticles = (newArticles: LearnArticle[]) => {
    setLearnArticlesState(newArticles);
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ learnArticles: newArticles })
    }).catch(err => console.error(err));
  };

  const setAboutContent = (newContent: AboutContent) => {
    setAboutContentState(newContent);
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aboutContent: newContent })
    }).catch(err => console.error(err));
  };

  const setConfig = (newConfig: SiteConfig) => {
    setConfigState(newConfig);
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config: newConfig })
    });
  };

  // Apply theme to body
  useEffect(() => {
    if (isLoaded) {
      document.body.className = `font-sans antialiased bg-white text-black min-h-screen flex flex-col ${config.theme !== 'default' ? 'theme-' + config.theme : ''}`;
    }
  }, [config.theme, isLoaded]);

  return (
    <SiteContext.Provider value={{ products, setProducts, bundles, setBundles, learnArticles, setLearnArticles, aboutContent, setAboutContent, config, setConfig, isLoaded }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
