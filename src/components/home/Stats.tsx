"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Globe, Award, Star } from "lucide-react";

const stats = [
  { value: "50,000+",  label: "Happy Travelers",    icon: Users,  grad: "from-blue-500 to-cyan-400"     },
  { value: "120+",     label: "Destinations",        icon: Globe,  grad: "from-teal-500 to-emerald-400"  },
  { value: "15 Years", label: "of Excellence",       icon: Award,  grad: "from-violet-500 to-fuchsia-500" },
  { value: "4.9 / 5",  label: "Average Rating",      icon: Star,   grad: "from-amber-400 to-orange-400"  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0b3764] via-primary to-secondary" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-20 left-1/4 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.13, ease: "easeOut" }}
              className="text-center group"
            >
              {/* Icon */}
              <div className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-linear-to-br ${s.grad} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="w-7 h-7 text-white" strokeWidth={1.75} />
              </div>

              {/* Value — explicit inline color so base styles can't override */}
              <p
                className="font-bold leading-none mb-3"
                style={{
                  fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  color: "#ffffff",
                }}
              >
                {s.value}
              </p>

              {/* Label */}
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
