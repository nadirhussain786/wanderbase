"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, User, Tag, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: "1",
    title: "10 Hidden Gems in Southeast Asia You Must Visit in 2024",
    excerpt: "Beyond the typical tourist trail, these undiscovered paradises offer authentic experiences that will take your breath away.",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    author: "Alexandra Chen",
    authorImg: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
    date: "2024-04-15",
    readTime: "8 min read",
    category: "Destination Guides",
    featured: true,
  },
  {
    id: "2",
    title: "The Ultimate Packing Guide for a 2-Week Safari",
    excerpt: "What to pack, what to leave behind, and the gear that experienced safari-goers swear by.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    author: "Marcus Williams",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    date: "2024-04-08",
    readTime: "6 min read",
    category: "Travel Tips",
    featured: false,
  },
  {
    id: "3",
    title: "Greek Islands by Ferry: The Complete Island-Hopping Guide",
    excerpt: "Navigate the Aegean like a local with our comprehensive ferry schedule, island rankings, and insider tips.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    author: "Priya Kapoor",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    date: "2024-04-01",
    readTime: "12 min read",
    category: "Destination Guides",
    featured: true,
  },
  {
    id: "4",
    title: "How to Experience Japan on a Budget (Without Missing Out)",
    excerpt: "Japan doesn't have to cost a fortune. Here's how to experience everything Japan has to offer without breaking the bank.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    author: "James Rivera",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    date: "2024-03-22",
    readTime: "10 min read",
    category: "Budget Travel",
    featured: false,
  },
  {
    id: "5",
    title: "The Machu Picchu Inca Trail: Everything You Need to Know",
    excerpt: "Permits, altitude sickness, gear, fitness prep — our veteran trekkers share everything to make your trail perfect.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    author: "Alexandra Chen",
    authorImg: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
    date: "2024-03-15",
    readTime: "15 min read",
    category: "Adventure",
    featured: false,
  },
  {
    id: "6",
    title: "Sustainable Travel: How to Explore the World Responsibly",
    excerpt: "Tips on reducing your carbon footprint, supporting local communities, and choosing eco-friendly tour operators.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    author: "Priya Kapoor",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    date: "2024-03-05",
    readTime: "7 min read",
    category: "Sustainable Travel",
    featured: false,
  },
];

const categories = ["All", "Destination Guides", "Travel Tips", "Adventure", "Budget Travel", "Sustainable Travel"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white font-display mb-3">
            Travel Stories & Tips
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-lg">
            Inspiration, guides, and insider tips from our travel experts
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-primary transition-all text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat ? "bg-primary text-white shadow" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {featured.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-400 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">Featured</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 font-display mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-gray-600 text-sm font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">{post.category}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 font-display line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img src={post.authorImg} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-gray-600 text-xs font-medium">{post.author}</span>
                  </div>
                  <span className="text-gray-400 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
