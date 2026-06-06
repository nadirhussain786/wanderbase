"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Star, Clock, CheckCircle, AlertCircle, Plane, Heart, Settings, Bell, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { tourPackages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const tabs = ["My Trips", "Wishlist", "Reviews", "Settings"];

const bookings = [
  {
    id: "B001",
    tour: tourPackages[0],
    status: "upcoming",
    departure: "2024-07-15",
    guests: 2,
    totalPaid: 4998,
    bookingRef: "WB-2024-001",
  },
  {
    id: "B002",
    tour: tourPackages[1],
    status: "completed",
    departure: "2024-03-10",
    guests: 2,
    totalPaid: 2998,
    bookingRef: "WB-2024-002",
  },
  {
    id: "B003",
    tour: tourPackages[4],
    status: "cancelled",
    departure: "2024-05-20",
    guests: 1,
    totalPaid: 0,
    bookingRef: "WB-2024-003",
  },
];

const statusConfig = {
  upcoming: { label: "Upcoming", color: "bg-blue-100 text-blue-700", icon: Plane },
  completed: { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600", icon: AlertCircle },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("My Trips");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-primary/20">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Welcome back,</p>
                <h1 className="text-2xl font-bold text-gray-900 font-display">James Thompson</h1>
              </div>
            </div>
            <p className="text-gray-500 text-sm ml-18">Member since January 2022 • Gold Member</p>
          </motion.div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
            </button>
            <button className="p-2.5 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Total Trips", value: "7", icon: Plane, color: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
            { label: "Countries Visited", value: "12", icon: MapPin, color: "from-teal-500 to-green-500", bg: "bg-teal-50" },
            { label: "Total Spent", value: "$24,500", icon: CreditCard, color: "from-purple-500 to-pink-500", bg: "bg-purple-50" },
            { label: "Reviews Written", value: "5", icon: Star, color: "from-amber-400 to-orange-500", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <div className={`w-6 h-6 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 font-display">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* My Trips */}
        {activeTab === "My Trips" && (
          <div className="space-y-5">
            {bookings.map((booking, i) => {
              const status = statusConfig[booking.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-56 h-40 md:h-auto flex-shrink-0">
                      <img
                        src={booking.tour.image}
                        alt={booking.tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              {status.label}
                            </span>
                            <span className="text-gray-400 text-xs">Ref: {booking.bookingRef}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-xl font-display mb-3">{booking.tour.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{booking.tour.destination}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" />{new Date(booking.departure).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{booking.guests} guests</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{booking.tour.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">Total Paid</p>
                          <p className="text-2xl font-bold text-primary font-display">{formatPrice(booking.totalPaid)}</p>
                          {booking.status === "upcoming" && (
                            <div className="mt-3 space-y-2">
                              <button className="w-full px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-[#0a3460] transition-colors">
                                View Details
                              </button>
                              <button className="w-full px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:border-red-300 hover:text-red-500 transition-colors">
                                Cancel
                              </button>
                            </div>
                          )}
                          {booking.status === "completed" && (
                            <button className="mt-3 w-full px-4 py-2 bg-amber-50 text-amber-700 text-sm font-semibold rounded-xl hover:bg-amber-100 transition-colors border border-amber-200">
                              Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="text-center pt-4">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl hover:shadow-lg transition-all"
              >
                <Plane className="w-4 h-4" />
                Book New Trip
              </Link>
            </div>
          </div>
        )}

        {/* Wishlist */}
        {activeTab === "Wishlist" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourPackages.slice(2, 5).map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 p-2 bg-red-500 rounded-full text-white">
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 font-display">{pkg.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{pkg.destination} • {pkg.duration}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                    <Link href={`/tours/${pkg.id}`} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl">
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === "Reviews" && (
          <div className="max-w-2xl space-y-5">
            {[1, 2].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={tourPackages[i].image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{tourPackages[i].title}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">An absolutely incredible experience. Every detail was perfect — from the accommodations to the guides. Would highly recommend to anyone.</p>
                <p className="text-gray-400 text-xs mt-3">Posted on March {10 + i}, 2024</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Settings */}
        {activeTab === "Settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-900 font-display mb-6">Account Settings</h3>
            <div className="space-y-5">
              {[
                { label: "Full Name", value: "James Thompson", type: "text" },
                { label: "Email Address", value: "james@example.com", type: "email" },
                { label: "Phone Number", value: "+44 20 9876 5432", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary transition-all text-sm"
                  />
                </div>
              ))}
              <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Save Changes
              </button>
              <button className="w-full py-3 border border-red-200 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
