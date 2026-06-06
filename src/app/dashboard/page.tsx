"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Plane, Heart, FileText, Image as ImageIcon, Star, LogOut, MapPin, Clock, Calendar, CheckCircle, XCircle, Plus, Globe, X, Save } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const tabs = ["My Trips", "Wishlist", "My Articles", "My Photos", "My Reviews", "Settings"] as const;
type Tab = typeof tabs[number];

const bookingStatus: Record<string, { color: string; icon: any }> = {
  CONFIRMED: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  PENDING:   { color: "bg-amber-100 text-amber-700", icon: Clock },
  CANCELLED: { color: "bg-red-100   text-red-600",   icon: XCircle },
  COMPLETED: { color: "bg-blue-100  text-blue-700",  icon: Plane },
};

const articleStatus: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-700",
  DRAFT:     "bg-gray-100  text-gray-600",
  ARCHIVED:  "bg-red-100   text-red-600",
};

function EmptyState({ icon: Icon, label, action }: { icon: any; label: string; action?: { label: string; href: string } }) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-gray-600 font-semibold mb-1">{label}</p>
      {action && (
        <Link href={action.href} className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors">
          <Plus className="w-4 h-4" /> {action.label}
        </Link>
      )}
    </div>
  );
}

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>("My Trips");
  const [data, setData]           = useState<any>(null);
  const [loading, setLoading]     = useState(true);

  // Settings form
  const [profileForm, setProfileForm]   = useState({ name: "", phone: "", bio: "", country: "", avatar: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  // Review modal
  const [reviewModal, setReviewModal] = useState<any>(null);
  const [reviewForm, setReviewForm]   = useState({ rating: 5, title: "", content: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  const reload = () => fetch("/api/user/dashboard").then((r) => r.json()).then(setData).finally(() => setLoading(false));

  useEffect(() => { reload(); }, []);

  useEffect(() => {
    if (session?.user) {
      setProfileForm((p) => ({ ...p, name: session.user?.name ?? "", avatar: (session.user as any)?.image ?? "" }));
    }
  }, [session]);

  const saveProfile = async () => {
    setSavingProfile(true);
    const res = await fetch("/api/user/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profileForm) });
    setSavingProfile(false);
    if (res.ok) toast.success("Profile updated!");
    else toast.error("Failed to update profile");
  };

  const submitReview = async () => {
    if (!reviewForm.title || !reviewForm.content) { toast.error("Please fill in all fields"); return; }
    setSubmittingReview(true);
    const res = await fetch("/api/user/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourId: reviewModal.tour.id, bookingId: reviewModal.id, ...reviewForm }),
    });
    setSubmittingReview(false);
    if (res.ok) { toast.success("Review submitted!"); setReviewModal(null); reload(); }
    else if (res.status === 409) toast.error("You already reviewed this tour");
    else toast.error("Failed to submit review");
  };

  const user = session?.user;
  const completedBookings = data?.bookings?.filter((b: any) => b.status === "COMPLETED") ?? [];
  const reviewedTourIds = new Set(data?.reviews?.map((r: any) => r.tourId));

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-primary" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
              Wander<span className="text-accent">Base</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/tours" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl">Explore Tours</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-linear-to-br from-primary to-secondary shrink-0">
              {user?.image
                ? <img src={user.image} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">{user?.name?.[0]}</div>
              }
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">{user?.name}</h1>
              <p className="text-gray-500 text-sm truncate">{user?.email}</p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-3">
                {[
                  { label: "Trips",    value: data?.bookings?.length   ?? 0 },
                  { label: "Articles", value: data?.articles?.length   ?? 0 },
                  { label: "Photos",   value: data?.photos?.length     ?? 0 },
                  { label: "Reviews",  value: data?.reviews?.length    ?? 0 },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-bold text-gray-900 text-lg">{s.value}</p>
                    <p className="text-gray-400 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm mb-6 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:text-primary"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ─── MY TRIPS ────────────────────────────────────── */}
            {activeTab === "My Trips" && (
              <div className="space-y-4">
                {!data?.bookings?.length && <EmptyState icon={Plane} label="No trips booked yet." action={{ label: "Explore Tours", href: "/tours" }} />}
                {data?.bookings?.map((b: any, i: number) => {
                  const sc = bookingStatus[b.status] ?? bookingStatus.PENDING;
                  const Icon = sc.icon;
                  return (
                    <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row"
                    >
                      <div className="md:w-52 h-40 md:h-auto shrink-0">
                        <img src={b.tour?.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2 ${sc.color}`}>
                            <Icon className="w-3 h-3" />{b.status}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg">{b.tour?.title}</h3>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1.5">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" />{b.tour?.destination?.name}, {b.tour?.destination?.country}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" />{new Date(b.departureDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" />{b.tour?.duration}</span>
                          </div>
                        </div>
                        <div className="md:text-right shrink-0 space-y-2">
                          <div>
                            <p className="text-gray-400 text-xs">Total</p>
                            <p className="text-2xl font-bold text-primary">{formatPrice(b.totalPrice)}</p>
                            <p className="text-xs text-gray-400">{b.guests} guest{b.guests > 1 ? "s" : ""}</p>
                          </div>
                          {b.status === "COMPLETED" && !reviewedTourIds.has(b.tourId) && (
                            <button
                              onClick={() => { setReviewModal(b); setReviewForm({ rating: 5, title: "", content: "" }); setActiveTab("My Reviews"); }}
                              className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-1"
                            >
                              <Star className="w-3 h-3" /> Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div className="text-center pt-2">
                  <Link href="/tours" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-2xl text-sm">
                    <Plus className="w-4 h-4" /> Book New Trip
                  </Link>
                </div>
              </div>
            )}

            {/* ─── WISHLIST ────────────────────────────────────── */}
            {activeTab === "Wishlist" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {!data?.wishlists?.length && <div className="col-span-3"><EmptyState icon={Heart} label="Wishlist is empty." action={{ label: "Explore Tours", href: "/tours" }} /></div>}
                {data?.wishlists?.map((w: any) => {
                  const item = w.tour ?? w.destination;
                  if (!item) return null;
                  return (
                    <motion.div key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                      <div className="relative h-44 overflow-hidden">
                        <img src={item.imageUrl} alt={item.title ?? item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        <p className="absolute bottom-3 left-3 text-white font-bold text-sm">{item.title ?? item.name}</p>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <p className="text-xl font-bold text-primary">{formatPrice(item.price ?? item.priceFrom)}</p>
                        <Link href={w.tour ? `/tours/${w.tourId}` : `/destinations/${w.destinationId}`} className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl">Book</Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* ─── MY ARTICLES ─────────────────────────────────── */}
            {activeTab === "My Articles" && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl">
                    <Plus className="w-4 h-4" /> Write Article
                  </button>
                </div>
                {!data?.articles?.length && <EmptyState icon={FileText} label="No articles yet. Share your travel stories!" />}
                {data?.articles?.map((a: any) => (
                  <motion.div key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                    {a.coverImage && <img src={a.coverImage} alt="" className="w-24 h-20 rounded-xl object-cover shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${articleStatus[a.status] ?? articleStatus.DRAFT}`}>{a.status}</span>
                        <span className="text-gray-400 text-xs">{a.category}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 truncate">{a.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-1 mt-0.5">{a.excerpt}</p>
                      <p className="text-gray-400 text-xs mt-1.5">{a.views.toLocaleString()} views · {new Date(a.createdAt).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ─── MY PHOTOS ───────────────────────────────────── */}
            {activeTab === "My Photos" && (
              <div>
                <div className="flex justify-end mb-4">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl"><Plus className="w-4 h-4" /> Share Photo</button>
                </div>
                {!data?.photos?.length && <EmptyState icon={ImageIcon} label="No photos shared yet." />}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data?.photos?.map((p: any) => (
                    <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100">
                      <img src={p.url} alt={p.caption ?? ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-xs font-medium truncate">{p.caption}</p>
                          <p className="text-white/60 text-[11px]">{p.destination?.name ?? p.location}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── MY REVIEWS ──────────────────────────────────── */}
            {activeTab === "My Reviews" && (
              <div className="space-y-4">
                {/* Write Review prompt for completed unreviewed trips */}
                {completedBookings.filter((b: any) => !reviewedTourIds.has(b.tourId)).length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-amber-800 mb-3">You have completed trips waiting for a review:</p>
                    <div className="flex flex-wrap gap-2">
                      {completedBookings.filter((b: any) => !reviewedTourIds.has(b.tourId)).map((b: any) => (
                        <button key={b.id} onClick={() => { setReviewModal(b); setReviewForm({ rating: 5, title: "", content: "" }); }} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-300 text-amber-800 text-xs font-semibold rounded-xl hover:bg-amber-100 transition-colors">
                          <Star className="w-3.5 h-3.5" /> Review {b.tour?.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!data?.reviews?.length && <EmptyState icon={Star} label="No reviews yet. Complete a trip to leave a review!" />}
                {data?.reviews?.map((r: any) => (
                  <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                    <img src={r.tour?.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex gap-0.5">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${r.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{r.status}</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                      <p className="text-gray-500 text-xs line-clamp-2 mt-0.5">{r.content}</p>
                      <p className="text-gray-400 text-[11px] mt-1.5">{r.tour?.title} · {new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ─── SETTINGS ────────────────────────────────────── */}
            {activeTab === "Settings" && (
              <div className="max-w-lg bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h2 className="font-bold text-gray-900 text-lg mb-6">Account Settings</h2>
                <div className="space-y-4">
                  {[
                    { label: "Full Name",    key: "name",    type: "text"  },
                    { label: "Phone",        key: "phone",   type: "tel"   },
                    { label: "Country",      key: "country", type: "text"  },
                    { label: "Avatar URL",   key: "avatar",  type: "url"   },
                  ].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={(profileForm as any)[key]}
                        onChange={(e) => setProfileForm((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary transition-all resize-none"
                      placeholder="Tell us about yourself…"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input type="email" disabled value={user?.email ?? ""} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-100 text-gray-400 cursor-not-allowed" />
                  </div>
                  <button onClick={saveProfile} disabled={savingProfile} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> {savingProfile ? "Saving…" : "Save Changes"}
                  </button>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full py-3 border border-red-200 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Leave a Review</h3>
              <button onClick={() => setReviewModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{reviewModal.tour?.title}</p>

            {/* Star Rating */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Your Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} onClick={() => setReviewForm((p) => ({ ...p, rating: n }))} className="transition-transform hover:scale-110">
                    <Star className={`w-7 h-7 ${n <= reviewForm.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Review Title</label>
                <input type="text" value={reviewForm.title} onChange={(e) => setReviewForm((p) => ({ ...p, title: e.target.value }))} placeholder="Summarise your experience" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Review</label>
                <textarea value={reviewForm.content} onChange={(e) => setReviewForm((p) => ({ ...p, content: e.target.value }))} rows={4} placeholder="Tell other travelers about your experience…" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary resize-none transition-all" />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setReviewModal(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm">Cancel</button>
              <button onClick={submitReview} disabled={submittingReview} className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm disabled:opacity-60">
                {submittingReview ? "Submitting…" : "Submit Review"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
