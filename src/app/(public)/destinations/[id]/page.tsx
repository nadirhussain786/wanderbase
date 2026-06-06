"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Users, Heart, Share2, ArrowLeft, CheckCircle, Camera } from "lucide-react";
import Link from "next/link";
import { destinations, tourPackages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dest = destinations.find((d) => d.id === id) ?? destinations[0];
  const relatedTours = tourPackages.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-6 left-6">
          <Link href="/destinations" className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20"><Heart className="w-5 h-5" /></button>
          <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20"><Share2 className="w-5 h-5" /></button>
        </div>

        <div className="absolute bottom-10 left-0 right-0 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap gap-2 mb-4">
            {dest.category.map((cat) => (
              <span key={cat} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium">{cat}</span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-display mb-3">{dest.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <span className="flex items-center gap-1.5 text-lg"><MapPin className="w-5 h-5 text-accent" />{dest.country}</span>
            <span className="flex items-center gap-1.5"><Star className="w-5 h-5 fill-gold text-gold" /><strong>{dest.rating}</strong> ({dest.reviews.toLocaleString()} reviews)</span>
            <span className="flex items-center gap-1.5"><Clock className="w-5 h-5 text-accent" />{dest.duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{dest.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-5">Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span className="font-semibold text-gray-800">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gallery teaser */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900 font-display">Gallery</h2>
                <button className="flex items-center gap-1.5 text-primary text-sm font-semibold"><Camera className="w-4 h-4" />View All Photos</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[dest.image, ...tourPackages.slice(0, 5).map((t) => t.image)].slice(0, 6).map((img, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 h-52" : "h-24"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white">
                <p className="text-white/70 text-sm">Starting from</p>
                <p className="text-3xl font-bold font-display">{formatPrice(dest.price)}</p>
                <p className="text-white/70 text-sm">per person • {dest.duration}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-bold text-gray-900">{dest.rating}/5</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Reviews</p>
                    <p className="font-bold text-gray-900">{dest.reviews.toLocaleString()}</p>
                  </div>
                </div>
                <Link href="/tours" className="block w-full py-4 bg-gradient-to-r from-accent to-gold text-white font-bold text-center rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-lg">
                  View Available Tours
                </Link>
                <Link href="/contact" className="block w-full py-3 border-2 border-primary text-primary font-bold text-center rounded-2xl hover:bg-primary hover:text-white transition-all duration-300">
                  Ask an Expert
                </Link>
              </div>
            </motion.div>

            {/* Best Time */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 font-display">Best Time to Visit</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                  <div key={m} className={`text-center p-2 rounded-lg text-xs font-medium ${[3,4,5,8,9,10].includes(i) ? "bg-secondary text-white" : "bg-gray-100 text-gray-500"}`}>
                    {m}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Green = Peak season</p>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 font-display mb-8">Tours to {dest.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm">{tour.duration}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 font-display">{tour.title}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                    <span className="text-gray-400 text-xs">({tour.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">{formatPrice(tour.originalPrice)}</p>
                      <p className="text-lg font-bold text-primary">{formatPrice(tour.price)}</p>
                    </div>
                    <Link href={`/tours/${tour.id}`} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl">Book Now</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
