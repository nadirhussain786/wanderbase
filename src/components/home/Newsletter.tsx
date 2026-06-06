"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

const perks = ["Early access to deals", "Exclusive member offers", "Expert travel guides", "No spam, ever"];

export default function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary to-secondary" />
      <div
        className="absolute inset-0 opacity-[.05] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, type: "spring" }}
          className="inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-white/10 border border-white/20 mb-8"
        >
          <Mail className="w-7 h-7 text-accent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="text-white mb-4"
        >
          Get Inspired,{" "}
          <em className="not-italic text-accent">Stay Updated</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="text-white/65 text-lg mb-8 leading-relaxed"
        >
          Join 12,000+ travelers who get exclusive deals, expert guides, and destination inspiration every week.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
        >
          {perks.map((p) => (
            <span key={p} className="flex items-center gap-2 text-white/70 text-sm">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
              {p}
            </span>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto"
        >
          {!submitted ? (
            <div className="flex gap-2 p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <div className="flex-1 flex items-center gap-2.5 px-4">
                <Mail className="w-4 h-4 text-white/40 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-gold text-white font-semibold text-sm rounded-xl hover:opacity-90 hover:-translate-y-px transition-all duration-200 shrink-0"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-5 px-8 bg-white/10 rounded-2xl border border-white/20"
            >
              <CheckCircle className="w-6 h-6 text-secondary" />
              <span className="text-white font-semibold">Welcome to the WanderBase family! 🌍</span>
            </motion.div>
          )}
          <p className="text-white/30 text-xs mt-4">Unsubscribe anytime · We respect your privacy</p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="flex -space-x-2.5">
            {["photo-1494790108755-2616b612b786", "photo-1507003211169-0a1dd7228f2d", "photo-1517841905240-472988babdf9"].map((id) => (
              <div key={id} className="w-8 h-8 rounded-full border-2 border-white/30 overflow-hidden">
                <img src={`https://images.unsplash.com/${id}?w=80&q=80`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm">
            <strong className="text-white">12,000+</strong> subscribers worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
