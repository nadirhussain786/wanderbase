"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Clock, Users, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { tourPackages } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

const badgeStyle: Record<string, string> = {
  "Best Seller":   "bg-amber-50 text-amber-700 border border-amber-200",
  "Most Popular":  "bg-blue-50  text-blue-700  border border-blue-200",
  "Challenging":   "bg-red-50   text-red-600   border border-red-200",
  "Luxury":        "bg-violet-50 text-violet-700 border border-violet-200",
  "New":           "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Premium":       "bg-primary/5 text-primary border border-primary/20",
};

const diffStyle: Record<string, string> = {
  Easy:        "text-emerald-700 bg-emerald-50",
  Moderate:    "text-amber-700   bg-amber-50",
  Challenging: "text-red-600     bg-red-50",
};

export default function TourPackages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="eyebrow"
          >
            ✦ Curated Experiences
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-gray-900 mb-4"
          >
            Tour{" "}
            <em className="not-italic text-primary">Packages</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed"
          >
            All-inclusive packages designed by experts — from adventure treks to luxury escapes.
          </motion.p>
        </div>

        {/* Featured card (horizontal) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="group grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-[0_4px_32px_-4px_rgba(0,0,0,.12)] hover:shadow-[0_20px_60px_-8px_rgba(0,0,0,.18)] transition-all duration-500 border border-gray-100 mb-8"
        >
          <div className="relative h-72 md:h-auto overflow-hidden">
            <img
              src={tourPackages[0].image}
              alt={tourPackages[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
            {tourPackages[0].badge && (
              <span className={cn("absolute top-5 left-5 px-3 py-1.5 text-xs font-bold rounded-full", badgeStyle[tourPackages[0].badge])}>
                ⭐ {tourPackages[0].badge}
              </span>
            )}
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4">
              <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-full", diffStyle[tourPackages[0].difficulty])}>
                {tourPackages[0].difficulty}
              </span>
              <span className="text-gray-400 text-xs">·</span>
              <span className="text-gray-500 text-xs font-medium">{tourPackages[0].category}</span>
            </div>

            <h3 className="text-gray-900 mb-3">{tourPackages[0].title}</h3>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{tourPackages[0].destination}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{tourPackages[0].duration}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{tourPackages[0].groupSize} pax</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < Math.floor(tourPackages[0].rating) ? "fill-gold text-gold" : "text-gray-200 fill-gray-200")} />
              ))}
              <span className="font-semibold text-gray-800 text-sm">{tourPackages[0].rating}</span>
              <span className="text-gray-400 text-xs">({tourPackages[0].reviews} reviews)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-7">
              {tourPackages[0].includes.slice(0, 4).map((inc) => (
                <div key={inc} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  {inc}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-sm line-through block">{formatPrice(tourPackages[0].originalPrice)}</span>
                <span className="text-3xl font-bold text-primary">{formatPrice(tourPackages[0].price)}</span>
                <span className="ml-2 text-xs text-secondary font-semibold">
                  Save {formatPrice(tourPackages[0].originalPrice - tourPackages[0].price)}
                </span>
              </div>
              <Link
                href={`/tours/${tourPackages[0].id}`}
                className="px-7 py-3.5 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-xl hover:-translate-y-px transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 5-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourPackages.slice(1, 6).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_-2px_rgba(0,0,0,.09)] hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,.18)] border border-gray-100 transition-all duration-400 hover:-translate-y-1.5"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />

                {pkg.badge && (
                  <span className={cn("absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold rounded-full", badgeStyle[pkg.badge])}>
                    {pkg.badge}
                  </span>
                )}
                <span className={cn("absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full", diffStyle[pkg.difficulty])}>
                  {pkg.difficulty}
                </span>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="text-white text-sm font-semibold">{pkg.destination}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-[1.05rem] mb-2 line-clamp-1" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" />{pkg.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-primary" />{pkg.groupSize}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-gold text-gold" />{pkg.rating}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-gray-400 text-xs line-through block">{formatPrice(pkg.originalPrice)}</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(pkg.price)}</span>
                  </div>
                  <Link
                    href={`/tours/${pkg.id}`}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary/8 text-primary text-sm font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link
            href="/tours"
            className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            View All Packages
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
