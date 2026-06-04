import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Dynamic Hero Section */}
      <HeroCarousel products={products} />

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet the Functional Family
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Targeted nutrition for every need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="inline-flex rounded-full bg-gray-100 px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 transition-colors">
            View all 6 flavours
          </Link>
        </div>
      </section>
    </div>
  );
}
