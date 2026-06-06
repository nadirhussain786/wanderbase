"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            ✦ Real Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4"
          >
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Travelers Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            Thousands of adventures, millions of memories. Here are a few stories from our community.
          </motion.p>
        </div>

        {/* Featured (large) testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative mb-12"
        >
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-1">
            <div className="bg-white rounded-[22px] p-8 md:p-12 relative overflow-hidden">
              {/* Background quote */}
              <div className="absolute top-0 right-0 text-gray-50 text-[200px] leading-none font-serif select-none pointer-events-none -translate-y-8 translate-x-8">
                &ldquo;
              </div>

              <div className="relative grid md:grid-cols-3 gap-8 items-center">
                {/* Nav */}
                <div className="md:col-span-1 flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={current}
                          src={testimonials[current].avatar}
                          alt={testimonials[current].name}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                      </AnimatePresence>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center"
                    >
                      <p className="font-bold text-gray-900 text-lg">{testimonials[current].name}</p>
                      <p className="text-gray-500 text-sm">{testimonials[current].location}</p>
                      <p className="text-secondary text-xs font-medium mt-1">{testimonials[current].tour}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 text-gray-600"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex gap-1.5">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`rounded-full transition-all duration-300 ${
                            i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 text-gray-600"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Review */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={current}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="text-gray-700 text-xl md:text-2xl leading-relaxed font-display italic mb-6"
                    >
                      &ldquo;{testimonials[current].review}&rdquo;
                    </motion.blockquote>
                  </AnimatePresence>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Traveled: {new Date(testimonials[current].date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 ${
                current === i
                  ? "border-primary bg-primary/5"
                  : "border-gray-100 bg-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">{t.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
