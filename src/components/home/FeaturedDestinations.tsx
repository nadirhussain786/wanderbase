"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { destinations } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

const tabs = ["All", "Europe", "Asia", "Africa", "South America"];

export default function FeaturedDestinations() {
  const [active, setActive] = useState("All");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = destinations.filter(
    (d) => d.featured && (active === "All" || d.continent === active)
  );

  const toggle = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section className="section-padding bg-[#f8f9fc]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow">✦ Handpicked for You</span>
            <h2 className="text-gray-900">
              Popular{" "}
              <em className="not-italic text-primary">Destinations</em>
            </h2>
            <p className="text-gray-500 mt-3 text-base max-w-lg leading-relaxed">
              Explore our most-loved destinations, curated by experts and loved by thousands of travelers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-2 flex-wrap mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                active === tab
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary/40 hover:text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {(filtered.length > 0 ? filtered : destinations.filter((d) => d.featured)).map((dest, i) => (
              <motion.article
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_-2px_rgba(0,0,0,.09)] hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,.18)] transition-all duration-400 hover:-translate-y-1.5 border border-gray-100/80"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Like */}
                  <button
                    onClick={() => toggle(dest.id)}
                    className={cn(
                      "absolute top-3.5 right-3.5 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                      liked.has(dest.id) ? "bg-rose-500 scale-110" : "bg-black/25 hover:bg-black/40"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", liked.has(dest.id) ? "text-white fill-white" : "text-white")} />
                  </button>

                  {/* Category tags */}
                  <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                    {dest.category.slice(0, 2).map((cat) => (
                      <span key={cat} className="px-2.5 py-0.5 text-[11px] font-semibold text-white/90 rounded-full bg-black/25 backdrop-blur-sm border border-white/20">
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-white font-bold text-lg leading-tight">{dest.name}</span>
                      <span className="text-white/60 text-sm">,&nbsp;{dest.country}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="font-bold text-gray-900 text-sm">{dest.rating}</span>
                      <span className="text-gray-400 text-xs">({dest.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {dest.duration}
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{dest.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {dest.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="px-2.5 py-1 bg-primary/5 text-primary text-[11px] font-semibold rounded-lg">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">From</p>
                      <p className="text-2xl font-bold text-primary leading-none mt-0.5">{formatPrice(dest.price)}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">per person</p>
                    </div>
                    <Link
                      href={`/destinations/${dest.id}`}
                      className="px-5 py-2.5 bg-linear-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl shadow hover:shadow-lg hover:-translate-y-px transition-all duration-300"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
