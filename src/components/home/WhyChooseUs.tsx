"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Headphones, CreditCard, Map, Clock, ThumbsUp } from "lucide-react";

const features = [
  { icon: Shield,      title: "100% Safe & Secure",      desc: "All tours are fully insured with verified, background-checked local guides.",       grad: "from-blue-500 to-blue-400",    bg: "bg-blue-50" },
  { icon: Headphones,  title: "24 / 7 Expert Support",   desc: "Our travel experts are available around the clock, wherever you are in the world.", grad: "from-teal-500 to-emerald-400",  bg: "bg-teal-50" },
  { icon: CreditCard,  title: "Best Price Guarantee",    desc: "Find it cheaper? We'll match it. No hidden fees — ever.",                           grad: "from-violet-500 to-purple-400", bg: "bg-violet-50" },
  { icon: Map,         title: "Expert Local Guides",     desc: "Certified guides with deep local knowledge for truly authentic experiences.",        grad: "from-amber-400 to-orange-400",  bg: "bg-amber-50" },
  { icon: Clock,       title: "Flexible Booking",        desc: "Free cancellation up to 48 hours before departure. Reschedule anytime.",            grad: "from-rose-400 to-pink-400",     bg: "bg-rose-50" },
  { icon: ThumbsUp,    title: "Trusted by 50 K+",        desc: "Tens of thousands of happy travelers chose WanderBase and came back for more.",     grad: "from-primary to-secondary",     bg: "bg-primary/5" },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#f8f9fc]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left — copy & image ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <span className="eyebrow">✦ Why WanderBase</span>
            <h2 className="text-gray-900 mb-5">
              Travel With{" "}
              <em className="not-italic text-primary">Confidence</em>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              15 years perfecting the art of travel. From the moment you book to the day you return home, every detail is handled with precision and genuine care.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { v: "50 K+", l: "Travelers" },
                { v: "98%",   l: "Satisfaction" },
                { v: "120+",  l: "Countries" },
              ].map((s) => (
                <div key={s.l} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>{s.v}</p>
                  <p className="text-gray-500 text-xs mt-1 font-medium">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Hero image with testimonial chip */}
            <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&q=85"
                alt="Happy travelers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-2xl px-5 py-4">
                  <p className="text-white text-sm font-medium leading-snug">
                    ✈️ &ldquo;Best travel company I&apos;ve ever used. WanderBase made our honeymoon absolutely perfect!&rdquo;
                  </p>
                  <p className="text-white/60 text-xs mt-1.5">— Emma &amp; James, London · ★★★★★</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right — feature grid ─────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-350"
              >
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-8 h-8 bg-gradient-to-br ${f.grad} rounded-lg flex items-center justify-center`}>
                    <f.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-[1rem] mb-1.5" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
