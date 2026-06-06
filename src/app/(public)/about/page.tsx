"use client";

import { motion } from "framer-motion";
import { Award, Globe, Heart, Users, Star, Shield } from "lucide-react";

const team = [
  { name: "Alexandra Chen", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80", bio: "15 years in travel. Passionate about sustainable tourism." },
  { name: "Marcus Williams", role: "Head of Operations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", bio: "Former guide turned manager. Knows every destination personally." },
  { name: "Priya Kapoor", role: "Lead Travel Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80", bio: "Creates itineraries that feel like stories unfolding." },
  { name: "James Rivera", role: "Customer Experience", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80", bio: "Your happiness is his mission — 24/7." },
];

const values = [
  { icon: Heart, title: "Passion for Travel", desc: "We live and breathe travel. Every route we craft comes from genuine love for exploration.", color: "from-red-400 to-pink-500" },
  { icon: Globe, title: "Global Expertise", desc: "120+ destinations, local partnerships, and boots-on-the-ground knowledge in every region.", color: "from-blue-500 to-cyan-500" },
  { icon: Shield, title: "Safe & Responsible", desc: "We are committed to sustainable tourism and the safety of every traveler and community.", color: "from-green-400 to-teal-500" },
  { icon: Star, title: "Excellence First", desc: "A 4.9-star rating isn't luck — it's the result of relentless attention to every detail.", color: "from-amber-400 to-orange-500" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
          alt="About us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/80 to-dark/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-16 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white font-display mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl max-w-2xl leading-relaxed"
          >
            Born from a love of adventure, built on trust, and dedicated to creating the world's most meaningful travel experiences.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Est. 2009</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mt-3 mb-6 leading-tight">
                15 Years of Creating{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                  Unforgettable
                </span>{" "}
                Journeys
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  WanderBase was founded in 2009 by Alexandra Chen after a life-changing solo trip around Southeast Asia. Frustrated by generic travel packages, she set out to build something different — travel experiences that feel personal, meaningful, and transformative.
                </p>
                <p>
                  What started as a small team of three passionate travel enthusiasts has grown into a global operation with offices in New York, London, and Singapore. We've helped over 50,000 travelers explore 120+ destinations across every continent.
                </p>
                <p>
                  Our secret? We only sell trips we'd take ourselves. Every itinerary is tested, every guide is vetted, and every hotel is visited in person by our team.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[{ v: "2009", l: "Founded" }, { v: "50K+", l: "Happy Travelers" }, { v: "4.9★", l: "Rating" }].map((s) => (
                  <div key={s.l} className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-2xl font-bold text-primary font-display">{s.v}</p>
                    <p className="text-gray-500 text-sm">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80" alt="" className="rounded-2xl h-48 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" alt="" className="rounded-2xl h-48 w-full object-cover mt-8" />
                <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80" alt="" className="rounded-2xl h-48 w-full object-cover -mt-8" />
                <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80" alt="" className="rounded-2xl h-48 w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-linear-to-br from-accent to-gold rounded-3xl flex items-center justify-center shadow-2xl z-10">
                <div className="text-center">
                  <p className="text-white text-3xl font-bold font-display">15</p>
                  <p className="text-white/90 text-xs font-medium">Years</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">Our Values</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">The principles that guide every decision we make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
              >
                <div className={`w-12 h-12 bg-linear-to-br ${v.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 font-display">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">Meet the Team</h2>
            <p className="text-gray-500 text-lg">Passionate travelers who make your dreams come true</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative w-36 h-36 mx-auto mb-5">
                  <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary/30 transition-all duration-300">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg font-display">{member.name}</h3>
                <p className="text-secondary font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
