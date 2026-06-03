export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6">
        Ayurveda-powered functional bars.
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Six functional bars for immunity, energy, focus, stamina, skin glow &amp; women&apos;s wellness. No refined sugar. No preservatives. 100% natural extracts.
      </p>
      <div className="flex gap-4">
        <button className="rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors">
          Shop All Bars
        </button>
        <button className="rounded-full bg-orange-100 px-8 py-3 text-sm font-semibold text-orange-800 shadow-sm hover:bg-orange-200 transition-colors">
          Explore Bundles
        </button>
      </div>
    </div>
  );
}
