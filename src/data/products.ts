export interface NutritionItem {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  bestFor: string[];
  hero: string[];
  nutrition: NutritionItem[];
  ingredients: string[];
  image: string;
  accent: string;
  bgClass: string;
  price: number;
  mrp: number;
}

export interface Bundle {
  slug: string;
  name: string;
  desc: string;
  items: number;
  price: number;
  mrp: number;
  badge: string;
}

export const products: Product[] = [
  {
    slug: "immunity-bar",
    name: "ImmunityBar",
    tagline: "Strengthen your defenses, naturally.",
    shortDesc: "Daily defense built on Amla, Tulsi & Shatavari.",
    longDesc: "A functional nutrition bar made with nuts, seeds and super grains, naturally sweetened with dates and honey. Powered by Ayurvedic botanicals like Amla, Tulsi and Shatavari, and enriched with prebiotics, calcium and zinc — it supports immunity, gut health and everyday vitality.",
    benefits: ["Supports immune defense", "Promotes gut & digestive health", "Rich in antioxidants (Vitamin C)", "Adds calcium & zinc to your day"],
    bestFor: ["School kids", "Working professionals", "Daily wellness seekers", "Anyone falling sick often"],
    hero: ["Amla", "Tulsi", "Shatavari", "Prebiotics"],
    nutrition: [{ label: "Energy", value: "150 kcal" }, { label: "Plant Protein", value: "5 g" }, { label: "Fiber", value: "3 g" }, { label: "Added Sugar", value: "0 g" }],
    ingredients: ["Almonds", "Pumpkin Seeds", "Oats", "Dates", "Honey", "Amla", "Tulsi", "Shatavari"],
    image: "/assets/bar-immunity-DebNTmhV.jpg",
    accent: "--immunity",
    bgClass: "bg-[oklch(0.97_0.07_85)]",
    price: 79,
    mrp: 99
  },
  {
    slug: "skincare-bar",
    name: "SkinCareBar",
    tagline: "Beautiful skin, one delicious bar at a time.",
    shortDesc: "Glow from within with Turmeric, Shatavari & Yashtimadhu.",
    longDesc: "A nourishing blend of nuts, seeds and nutrient-rich grains, naturally sweetened for clean, sustained energy. Infused with Ayurvedic botanicals like Shatavari, Turmeric and Yashtimadhu, and antioxidant-rich ingredients — it supports skin health, hydration and overall wellness.",
    benefits: ["Promotes a natural glow", "Antioxidant rich — fights free radicals", "Supports skin hydration", "Clean, sustained energy"],
    bestFor: ["Teens & college students", "Beauty-conscious adults", "Anyone with dull, tired skin"],
    hero: ["Turmeric", "Shatavari", "Yashtimadhu", "Antioxidants"],
    nutrition: [{ label: "Energy", value: "150 kcal" }, { label: "Plant Protein", value: "5 g" }, { label: "Fiber", value: "3 g" }, { label: "Added Sugar", value: "0 g" }],
    ingredients: ["Almonds", "Sunflower Seeds", "Oats", "Dates", "Honey", "Turmeric", "Shatavari", "Yashtimadhu"],
    image: "/assets/bar-skin-Db_FUOyo.jpg",
    accent: "--skin",
    bgClass: "bg-[oklch(0.95_0.04_15)]",
    price: 79,
    mrp: 99
  },
  {
    slug: "energy-bar",
    name: "EnergyBar",
    tagline: "Fuel your body, power your day.",
    shortDesc: "Long-lasting energy from Ashwagandha & ancient grains.",
    longDesc: "A clean blend of nuts, seeds and ancient grains, naturally sweetened for balanced, long-lasting energy. Powered by functional botanicals like Ashwagandha, Yashtimadhu and Tulsi, and enhanced with warming spices and natural apple notes — it supports stamina, alertness and everyday vitality.",
    benefits: ["Sustained, balanced energy", "No sugar crash", "Boosts focus & alertness", "Pre/post workout friendly"],
    bestFor: ["Students", "Office workers", "Gym-goers", "Travelers"],
    hero: ["Ashwagandha", "Yashtimadhu", "Tulsi", "Ancient Grains"],
    nutrition: [{ label: "Energy", value: "170 kcal" }, { label: "Plant Protein", value: "5 g" }, { label: "Fiber", value: "4 g" }, { label: "Added Sugar", value: "0 g" }],
    ingredients: ["Oats", "Almonds", "Pumpkin Seeds", "Dates", "Apple", "Ashwagandha", "Cinnamon"],
    image: "/assets/bar-energy-Cdvww9cM.jpg",
    accent: "--energy",
    bgClass: "bg-[oklch(0.96_0.10_70)]",
    price: 79,
    mrp: 99
  },
  {
    slug: "shecare-bar",
    name: "SheCareBar",
    tagline: "Natural care for women — every bite, every day.",
    shortDesc: "Built for her — with Shatavari, iron & folate.",
    longDesc: "A clean, nourishing blend of superfoods, seeds, grains and Ayurvedic Shatavari, naturally sweetened with dates and honey. Enriched with protein, iron and folate — it supports everyday wellness and vitality for women across every life stage.",
    benefits: ["Supports hormonal balance", "Iron & folate for energy", "Cycle-friendly nutrition", "Daily strength & vitality"],
    bestFor: ["Teen girls", "Working women", "New & expecting mothers", "Women 40+"],
    hero: ["Shatavari", "Iron", "Folate", "Protein"],
    nutrition: [{ label: "Energy", value: "150 kcal" }, { label: "Plant Protein", value: "5 g" }, { label: "Iron", value: "30% RDA" }, { label: "Added Sugar", value: "0 g" }],
    ingredients: ["Almonds", "Flax Seeds", "Oats", "Dates", "Honey", "Shatavari", "Cranberries"],
    image: "/assets/bar-she-ASGmdszR.jpg",
    accent: "--she",
    bgClass: "bg-[oklch(0.93_0.06_5)]",
    price: 89,
    mrp: 109
  },
  {
    slug: "memory-bar",
    name: "MemoryBar",
    tagline: "Fuel your mind, naturally.",
    shortDesc: "Brain food with Omega-3, Brahmi & Ashwagandha.",
    longDesc: "A functional nutrition bar made with nuts, seeds and nutrient-dense grains, naturally sweetened with dates and honey. Enriched with Omega-3 (EPA & DHA) and neuro-supportive botanicals like Brahmi and Ashwagandha — it supports brain health, focus and memory with balanced everyday nutrition.",
    benefits: ["Supports focus & memory", "Omega-3 for brain health", "Reduces mental fatigue", "Great for study & deep work"],
    bestFor: ["School kids", "Students preparing for exams", "Knowledge workers", "Seniors"],
    hero: ["Brahmi", "Ashwagandha", "Omega-3", "Walnuts"],
    nutrition: [{ label: "Energy", value: "160 kcal" }, { label: "Plant Protein", value: "5 g" }, { label: "Omega-3", value: "Yes" }, { label: "Added Sugar", value: "0 g" }],
    ingredients: ["Walnuts", "Flax Seeds", "Oats", "Dates", "Honey", "Brahmi", "Ashwagandha"],
    image: "/assets/bar-memory-rxw9tyjs.jpg",
    accent: "--memory",
    bgClass: "bg-[oklch(0.93_0.08_275)]",
    price: 89,
    mrp: 109
  },
  {
    slug: "stamina-bar",
    name: "StaminaBar",
    tagline: "Power your performance, naturally.",
    shortDesc: "Built for endurance with Shilajit & Ashwagandha.",
    longDesc: "A functional nutrition bar made with nuts, seeds and ancient grains, naturally sweetened with dates and honey. Enriched with Ayurvedic adaptogens like Shilajit, Ashwagandha and Shatavari — it delivers clean, sustained energy, supports stamina, strength and faster recovery.",
    benefits: ["Boosts stamina & endurance", "Faster post-workout recovery", "Strength & vitality support", "Adaptogen powered"],
    bestFor: ["Athletes", "Gym-goers", "Active professionals", "Endurance enthusiasts"],
    hero: ["Shilajit", "Ashwagandha", "Shatavari", "Ancient Grains"],
    nutrition: [{ label: "Energy", value: "180 kcal" }, { label: "Plant Protein", value: "6 g" }, { label: "Fiber", value: "4 g" }, { label: "Added Sugar", value: "0 g" }],
    ingredients: ["Almonds", "Peanuts", "Oats", "Dates", "Honey", "Shilajit", "Ashwagandha", "Shatavari"],
    image: "/assets/bar-stamina-C-TtjXKV.jpg",
    accent: "--stamina",
    bgClass: "bg-[oklch(0.92_0.04_150)]",
    price: 99,
    mrp: 119
  }
];

export const bundles: Bundle[] = [
  {
    slug: "discover-pack",
    name: "Discover Pack — All 6 Flavours",
    desc: "One of each bar. The easiest way to try the entire functional family.",
    items: 6,
    price: 449,
    mrp: 594,
    badge: "Best for first-timers"
  },
  {
    slug: "daily-12",
    name: "Daily Dozen — Pack of 12",
    desc: "Two weeks of clean, functional fuel. Mix and match any 12 bars.",
    items: 12,
    price: 849,
    mrp: 1188,
    badge: "Most popular"
  },
  {
    slug: "corporate-gifting",
    name: "Corporate Gifting Box",
    desc: "Premium gift box of 24 bars with custom branding for teams & clients.",
    items: 24,
    price: 1799,
    mrp: 2376,
    badge: "Bulk & B2B"
  }
];
