"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, Users, MapPin, CheckCircle, ArrowRight, Filter, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tourPackages } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";

const categories = ["All", "Beach & Culture", "Cultural & Spiritual", "Adventure", "Luxury", "Wildlife", "Cultural"];
const durations = ["All", "1-5 days", "6-10 days", "11-15 days", "15+ days"];
const difficulties = ["All", "Easy", "Moderate", "Challenging"];

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-700",
  "Most Popular": "bg-blue-100 text-blue-700",
  "Challenging": "bg-red-100 text-red-700",
  "Luxury": "bg-purple-100 text-purple-700",
  "New": "bg-green-100 text-green-700",
  "Premium": "bg-primary/10 text-primary",
};

const difficultyColors: Record<string, string> = {
  Easy: "text-green-600 bg-green-50",
  Moderate: "text-amber-600 bg-amber-50",
  Challenging: "text-red-600 bg-red-50",
};

export default function ToursPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [view, setView]           = useState<"grid" | "list">("grid");
  const [liked, setLiked]         = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/wishlist")
      .then((r) => r.ok ? r.json() : [])
      .then((items: any[]) => {
        const ids = items.filter((i) => i.tourId).map((i) => i.tourId);
        setLiked(new Set(ids));
      })
      .catch(() => {});
  }, []);

  const toggleLike = async (id: string) => {
    const res = await fetch("/api/user/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourId: id }),
    });
    if (res.status === 401) { toast.error("Sign in to save tours"); router.push("/auth/signin"); return; }
    if (res.ok) {
      const { added } = await res.json();
      setLiked((prev) => { const next = new Set(prev); added ? next.add(id) : next.delete(id); return next; });
      toast.success(added ? "Added to wishlist" : "Removed from wishlist");
    }
  };

  const filtered = tourPackages.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || t.category === category;
    const matchDifficulty = difficulty === "All" || t.difficulty === difficulty;
    return matchSearch && matchCategory && matchDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-72 bg-linear-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1600&q=80"
            alt="Tours"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-display mb-4"
          >
            Tour Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-xl"
          >
            {tourPackages.length} handcrafted experiences for every type of traveler
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours or destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary transition-all text-sm"
              />
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 min-w-[150px]"
            >
              {difficulties.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-500 text-sm">
            <strong className="text-gray-900">{filtered.length}</strong> packages found
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-400 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                {pkg.badge && (
                  <span className={cn("absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full", badgeColors[pkg.badge])}>
                    {pkg.badge}
                  </span>
                )}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => { e.preventDefault(); toggleLike(pkg.id); }}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${liked.has(pkg.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/40"}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked.has(pkg.id) ? "fill-white" : ""}`} />
                  </button>
                  <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-full", difficultyColors[pkg.difficulty])}>
                    {pkg.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span className="text-sm font-semibold">{pkg.destination}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-3 font-display line-clamp-1">{pkg.title}</h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" />{pkg.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-primary" />{pkg.groupSize} pax</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    {pkg.rating} ({pkg.reviews})
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pkg.includes.slice(0, 3).map((inc) => (
                    <span key={inc} className="flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                      <CheckCircle className="w-3 h-3" />{inc}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-gray-400 text-xs line-through">{formatPrice(pkg.originalPrice)}</span>
                    <p className="text-xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                    <p className="text-xs text-green-600 font-medium">
                      Save {formatPrice(pkg.originalPrice - pkg.price)}
                    </p>
                  </div>
                  <Link
                    href={`/tours/${pkg.id}`}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-linear-to-r from-primary to-secondary text-white text-sm font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Book Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
