"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, CheckCircle, Calendar, Shield, ArrowLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { tourPackages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tour = tourPackages.find((t) => t.id === id) ?? tourPackages[0];

  const difficultyColors: Record<string, string> = {
    Easy: "text-green-600 bg-green-50 border-green-200",
    Moderate: "text-amber-600 bg-amber-50 border-amber-200",
    Challenging: "text-red-600 bg-red-50 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-6">
          <Link href="/tours" className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white/20 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Tours
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white/20 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white/20 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-0 right-0 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium">{tour.category}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${difficultyColors[tour.difficulty]}`}>{tour.difficulty}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-white/90">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" />{tour.destination}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" />{tour.duration}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-accent" />{tour.groupSize} pax</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <strong>{tour.rating}</strong>
              <span className="text-white/60">({tour.reviews} reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-4">About This Tour</h2>
              <p className="text-gray-600 leading-relaxed">
                Experience the ultimate {tour.destination} adventure with our expertly curated {tour.duration} tour. This carefully crafted journey combines the best cultural highlights, natural wonders, and authentic local experiences. Our small group of {tour.groupSize} ensures personalized attention and genuine connections.
              </p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-5">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tour.includes.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/20">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sample Itinerary */}
            {tour.itinerary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 font-display mb-5">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {day.day}
                      </div>
                      <div className="flex-1 pb-5 border-b border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-1">{day.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{day.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.activities.map((act) => (
                            <span key={act} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{act}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "Fully Insured", desc: "100% protected" },
                { icon: Star, label: "Top Rated", desc: `${tour.rating}/5 stars` },
                { icon: Users, label: "Small Groups", desc: `Max ${tour.groupSize}` },
              ].map((b) => (
                <div key={b.label} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{b.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg sticky top-24 overflow-hidden"
            >
              {/* Price */}
              <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white">
                <p className="text-white/70 text-sm">Starting from</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-3xl font-bold font-display">{formatPrice(tour.price)}</span>
                  <span className="text-white/60 pb-0.5">/ person</span>
                </div>
                <p className="text-white/70 text-sm line-through">{formatPrice(tour.originalPrice)}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-accent/30 border border-accent/50 rounded-full text-xs font-bold text-gold">
                  Save {formatPrice(tour.originalPrice - tour.price)}
                </span>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input type="date" className="bg-transparent flex-1 text-sm text-gray-700 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                    <Users className="w-4 h-4 text-gray-400" />
                    <select className="bg-transparent flex-1 text-sm text-gray-700 outline-none">
                      {["1 Person", "2 People", "3 People", "4 People", "5+ People"].map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{formatPrice(tour.price)} × 2 guests</span>
                    <span className="font-semibold text-gray-900">{formatPrice(tour.price * 2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Service fee</span>
                    <span className="font-semibold text-gray-900">{formatPrice(150)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-100 pt-3">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(tour.price * 2 + 150)}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-accent to-gold text-white font-bold rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-lg">
                  Book This Tour
                </button>

                <div className="flex items-center gap-2 justify-center text-gray-400 text-xs">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  Free cancellation up to 48 hours before departure
                </div>

                <p className="text-center text-gray-400 text-xs">Departures: {tour.departure}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
