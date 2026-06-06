"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Clock, Filter, Heart, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destinations } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const continents = ["All", "Europe", "Asia", "Africa", "South America", "Americas"];
const categories = ["All", "Beach", "Adventure", "Culture", "Luxury", "Wildlife", "Romance", "Trekking"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Reviews"];

export default function DestinationsPage() {
  const [search, setSearch]       = useState("");
  const [continent, setContinent] = useState("All");
  const [category, setCategory]   = useState("All");
  const [sort, setSort]           = useState("Featured");
  const [liked, setLiked]         = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/wishlist")
      .then((r) => r.ok ? r.json() : [])
      .then((items: any[]) => {
        const ids = items.filter((i) => i.destinationId).map((i) => i.destinationId);
        setLiked(new Set(ids));
      })
      .catch(() => {});
  }, []);

  const toggleLike = async (id: string) => {
    const res = await fetch("/api/user/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId: id }),
    });
    if (res.status === 401) { toast.error("Sign in to save destinations"); router.push("/auth/signin"); return; }
    if (res.ok) {
      const { added } = await res.json();
      setLiked((prev) => { const next = new Set(prev); added ? next.add(id) : next.delete(id); return next; });
      toast.success(added ? "Added to wishlist" : "Removed from wishlist");
    }
  };

  const filtered = destinations
    .filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
      const matchContinent = continent === "All" || d.continent === continent;
      const matchCategory = category === "All" || d.category.includes(category);
      return matchSearch && matchContinent && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Rating") return b.rating - a.rating;
      if (sort === "Reviews") return b.reviews - a.reviews;
      return Number(b.featured) - Number(a.featured);
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-80 bg-linear-to-br from-primary via-[#0a3460] to-secondary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
            alt="Destinations"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-display text-center mb-4"
          >
            Explore Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg text-center max-w-xl"
          >
            {destinations.length} incredible destinations waiting to be discovered
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {/* Search & Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations or countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 focus:border-primary min-w-45"
            >
              {sortOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Continent</p>
                  <div className="flex flex-wrap gap-2">
                    {continents.map((c) => (
                      <button
                        key={c}
                        onClick={() => setContinent(c)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          continent === c ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          category === c ? "bg-secondary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Continent Quick Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => setContinent(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                continent === c
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500 text-sm">
            Showing <strong className="text-gray-900">{filtered.length}</strong> destinations
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => toggleLike(dest.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                    liked.has(dest.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/40"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked.has(dest.id) ? "fill-white" : ""}`} />
                </button>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {dest.category.slice(0, 1).map((cat) => (
                    <span key={cat} className="px-2 py-0.5 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="font-semibold text-sm">{dest.name}</span>
                  <span className="text-white/70 text-xs">, {dest.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="font-bold text-sm">{dest.rating}</span>
                    <span className="text-gray-400 text-xs">({dest.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {dest.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-xs">From</span>
                    <p className="text-lg font-bold text-primary">{formatPrice(dest.price)}</p>
                  </div>
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
