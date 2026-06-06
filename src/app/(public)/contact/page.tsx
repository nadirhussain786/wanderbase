"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";

const offices = [
  { city: "New York", address: "123 Travel Street, NY 10001", phone: "+1 (800) 123-4567", hours: "Mon-Fri: 9AM - 6PM EST" },
  { city: "London", address: "45 Adventure Ave, London W1A 1AA", phone: "+44 20 1234 5678", hours: "Mon-Fri: 9AM - 6PM GMT" },
  { city: "Singapore", address: "88 Explorer Road, Singapore 018960", phone: "+65 6123 4567", hours: "Mon-Fri: 9AM - 6PM SGT" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white font-display mb-3"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg"
          >
            Our travel experts are ready to help plan your perfect trip
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick contact */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white">
              <MessageSquare className="w-10 h-10 mb-5 text-white/80" />
              <h3 className="text-2xl font-bold font-display mb-3">Talk to an Expert</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Our travel designers are available 24/7 to help you plan your dream trip. Call, chat, or email — we're here.
              </p>
              <div className="space-y-4">
                <a href="tel:+18001234567" className="flex items-center gap-3 hover:text-gold transition-colors group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">+1 (800) 123-4567</span>
                </a>
                <a href="mailto:hello@wanderbase.com" className="flex items-center gap-3 hover:text-gold transition-colors group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">hello@wanderbase.com</span>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Available 24/7 for urgent travel support</span>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-lg">Our Offices</h4>
              {offices.map((office) => (
                <div key={office.city} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h5 className="font-bold text-gray-900 mb-2">{office.city}</h5>
                  <div className="space-y-1.5 text-sm text-gray-500">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                      {office.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      {office.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {office.hours}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
          >
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-8">Fill in the form and our team will get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={update("name")}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={update("email")}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={update("phone")}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={update("subject")}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary transition-all text-sm text-gray-700"
                      >
                        <option value="">Select a topic</option>
                        <option>Tour Inquiry</option>
                        <option>Booking Help</option>
                        <option>Cancellation</option>
                        <option>General Question</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={update("message")}
                      placeholder="Tell us about your dream trip or how we can help you..."
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-xl hover:scale-[1.01] transition-all duration-300 text-lg"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-display mb-3">Message Sent!</h3>
                <p className="text-gray-500 max-w-sm leading-relaxed">
                  Thank you for reaching out! Our travel experts will get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
