"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Clock, User, Tag, ArrowLeft, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const posts: Record<string, any> = {
  "hidden-gems-southeast-asia": {
    id: "1",
    title: "10 Hidden Gems in Southeast Asia You Must Visit in 2024",
    excerpt: "Beyond the typical tourist trail, these undiscovered paradises offer authentic experiences that will take your breath away.",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=80",
    author: "Alexandra Chen",
    authorImg: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
    authorBio: "Alexandra is a seasoned travel writer with 12 years of experience exploring Southeast Asia. She has visited over 40 countries.",
    date: "2024-04-15",
    readTime: "8 min read",
    category: "Destination Guides",
    featured: true,
    content: `
Southeast Asia is a treasure trove of incredible destinations, but beyond the famous beaches of Bali and the temples of Bangkok lies a world of hidden wonders waiting to be discovered.

## 1. Kampot, Cambodia

Nestled along the Preaek Tuek Chhu river, Kampot is a sleepy riverside town with a colonial French charm. Pepper plantations dot the surrounding countryside, and the nearby Bokor Hill Station offers misty highland views that feel worlds away from the tourist trail.

**Best time to visit:** November to April (dry season)
**Don't miss:** Sunset on the river, Kampot pepper farm tours, Bokor Mountain

## 2. Phong Nha, Vietnam

Home to some of the world's largest cave systems, Phong Nha remains delightfully off the beaten path despite its UNESCO World Heritage status. Son Doong Cave — the world's largest — can only be explored with a licensed guide.

**Best time to visit:** February to August
**Don't miss:** Paradise Cave, Dark Cave zip-line, cycling through jungle villages

## 3. Koh Lanta, Thailand

While Phuket and Koh Samui get all the attention, Koh Lanta offers the same stunning beaches with a fraction of the crowds. The southern tip of the island is protected as a national park, where hornbills nest in ancient trees.

## 4. Hsipaw, Myanmar

A small hill town in Shan State, Hsipaw is beloved by trekkers who come for multi-day hikes through Shan villages. The town itself has a fascinating mix of Chinese, Indian, and Shan cultures.

## 5. Mawlynnong, India (Meghalaya)

Often called "Asia's Cleanest Village," Mawlynnong sits in the misty hills of Meghalaya near the Bangladesh border. Living root bridges — grown from Ficus elastica trees over generations — are the main attraction.

## 6. Teluk Bahang, Malaysia

Skip Penang's crowded Georgetown and head to the village of Teluk Bahang at the island's northwestern tip. A national park with jungle trails, secluded beaches, and a butterfly farm await.

## 7. Pu Luong, Vietnam

This nature reserve in Thanh Hoa province offers terraced rice fields, traditional Thai villages, and river swimming without the Instagram crowds of Sapa. Best experienced by motorbike or bicycle.

## 8. Don Det, Laos

Part of the 4,000 Islands archipelago in southern Laos, Don Det is the perfect place to do absolutely nothing. Rent a bicycle, watch the Mekong flow past, and look for the rare Irrawaddy dolphins that live in the river.

## 9. Loei, Thailand

The "Little Switzerland of Thailand," Loei Province is known for its cool temperatures, rolling hills, and Phu Kradueng National Park — a mesa hike that rewards trekkers with pine forests and extraordinary sunrises.

## 10. Belitung Island, Indonesia

Struck with crystal-clear waters, massive granite boulders, and powdery white sand, Belitung is what Bali looked like before the resort developers arrived. It remains largely under the radar for international travelers.

---

*Planning your Southeast Asia adventure? Check out our curated tours that visit several of these hidden gems — led by local guides who know them best.*
    `,
    tags: ["Southeast Asia", "Hidden Gems", "Travel Tips", "Off the Beaten Path"],
    relatedPosts: [
      { id: "2", title: "The Ultimate Packing Guide for a 2-Week Safari", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80", category: "Travel Tips", readTime: "6 min read" },
      { id: "4", title: "How to Experience Japan on a Budget", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", category: "Budget Travel", readTime: "10 min read" },
    ],
  },
  "safari-packing-guide": {
    id: "2",
    title: "The Ultimate Packing Guide for a 2-Week Safari",
    excerpt: "What to pack, what to leave behind, and the gear that experienced safari-goers swear by.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    author: "Marcus Williams",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    authorBio: "Marcus has led over 80 safaris across East and Southern Africa. His packing philosophy: less is always more.",
    date: "2024-04-08",
    readTime: "6 min read",
    category: "Travel Tips",
    featured: false,
    content: `
A safari is one of the most extraordinary travel experiences on earth — and one of the most demanding in terms of logistics. What you pack can make or break your comfort in the bush.

## The Golden Rules

**1. Pack light.** Many safari camps are accessed by small bush planes with strict 15kg (33lb) luggage limits — and it must be in a soft-sided bag, not a hard-sided suitcase.

**2. Neutral colors only.** Leave the bright red t-shirts at home. Khaki, olive, tan, and brown blend into the landscape. White shows dust instantly, and blue attracts tsetse flies.

**3. Layers are everything.** Dawn game drives can be bitterly cold even in summer; afternoons often hit 35°C (95°F). Dress for both.

## The Essential Packing List

### Clothing
- 3–4 lightweight safari shirts (long sleeve preferred for sun protection)
- 2 pairs of convertible pants
- 1 fleece or lightweight jacket
- Wide-brim hat
- Comfortable walking shoes or boots
- Sandals for the lodge

### Gear
- Binoculars (8x42 or 10x42 magnification)
- Camera with telephoto lens (300mm+)
- Headlamp with extra batteries
- Reusable water bottle

### Health & Safety
- DEET insect repellent (40%+)
- Sunscreen SPF 50+
- Malaria prophylaxis (prescribed by your doctor)
- First aid kit
- Hand sanitizer

## What NOT to Pack
- Camouflage clothing (illegal in several African countries)
- Hard-sided luggage
- Hair dryer or other high-wattage appliances
- Excessive jewelry

---

*Heading on a safari? Browse our African Safari collection — all camps provide detailed packing lists specific to their region and season.*
    `,
    tags: ["Safari", "Packing", "Africa", "Travel Tips"],
    relatedPosts: [
      { id: "5", title: "The Machu Picchu Inca Trail: Everything You Need to Know", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&q=80", category: "Adventure", readTime: "15 min read" },
      { id: "6", title: "Sustainable Travel: How to Explore the World Responsibly", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", category: "Sustainable Travel", readTime: "7 min read" },
    ],
  },
  "greek-islands-ferry": {
    id: "3",
    title: "Greek Islands by Ferry: The Complete Island-Hopping Guide",
    excerpt: "Navigate the Aegean like a local with our comprehensive ferry schedule, island rankings, and insider tips.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
    author: "Priya Kapoor",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    authorBio: "Priya has island-hopped the Greek archipelago four times and considers it the world's most perfect vacation format.",
    date: "2024-04-01",
    readTime: "12 min read",
    category: "Destination Guides",
    featured: true,
    content: `
Greece has over 6,000 islands, of which about 230 are inhabited. The ferry network connecting them is vast, slightly chaotic, and utterly wonderful once you know how it works.

## The Big Three Routes

### Athens (Piraeus) → Cyclades
The most popular circuit. Start in Athens, ferry to Santorini (8 hours), then hop to Mykonos (3 hours), Paros (2 hours), and Naxos (1 hour) before returning to Piraeus.

### Ionian Islands
The western islands — Corfu, Kefalonia, Zakynthos — are reached from Patras, not Piraeus. Greener, less crowded, and dramatically beautiful.

### Dodecanese Chain
Rhodes to Kos to Kalymnos and beyond. A week minimum to do it justice. The ancient history here is unmatched.

## Booking Ferries

**Ferryscanner** and **Directferries** aggregate all operators. Book at least 2 weeks ahead in July-August. Off-season (October-May), ferries run less frequently but prices drop by 40%.

### Ticket Classes
- **Deck class:** Cheapest, fine in good weather
- **Seat class:** Comfortable airline-style seats
- **Cabin class:** Sleep on overnight crossings

## Island Rankings by Type

### Best for First-Timers
Santorini, Mykonos, Rhodes

### Best for Authenticity
Naxos, Ikaria, Tilos

### Best for Beaches
Milos, Koufonisia, Lefkada

### Best for History
Delos, Lindos (Rhodes), Crete

## Insider Tips

1. **Travel mid-week** — ferries on Fridays and Sundays are packed with Athenians.
2. **Book accommodations with flexible cancellation** — weather cancels ferries more often than you'd expect.
3. **Pack a picnic** — ferry food is mediocre and overpriced.
4. **Small high-speed ferries are worth the premium** — a 2-hour fast ferry beats a 5-hour slow ferry in summer heat.

---

*Ready to island-hop? Our Greek Islands Odyssey tour handles all the ferry logistics — you just show up and enjoy the view.*
    `,
    tags: ["Greece", "Islands", "Ferry", "Mediterranean"],
    relatedPosts: [
      { id: "1", title: "10 Hidden Gems in Southeast Asia You Must Visit in 2024", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80", category: "Destination Guides", readTime: "8 min read" },
      { id: "4", title: "How to Experience Japan on a Budget", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", category: "Budget Travel", readTime: "10 min read" },
    ],
  },
  "japan-budget-travel": {
    id: "4",
    title: "How to Experience Japan on a Budget (Without Missing Out)",
    excerpt: "Japan doesn't have to cost a fortune. Here's how to experience everything Japan has to offer without breaking the bank.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    author: "James Rivera",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    authorBio: "James lived in Tokyo for 3 years and now guides cultural tours across Japan. He eats ramen for breakfast.",
    date: "2024-03-22",
    readTime: "10 min read",
    category: "Budget Travel",
    featured: false,
    content: `
Japan has a reputation for being expensive, and that reputation is partly deserved. But with the right strategies, you can have an extraordinary Japanese experience on a reasonable budget.

## Getting There

**Japan Rail Pass:** If you're visiting for more than 5 days and plan to travel between cities, the JR Pass pays for itself quickly. A 7-day pass costs around ¥50,000 (~$340 USD) and covers the Shinkansen between Tokyo, Kyoto, Osaka, and Hiroshima.

**Budget airlines:** Peach, Jetstar Japan, and Starflyer serve domestic routes for a fraction of the Shinkansen price if you book early.

## Accommodation

**Capsule hotels** range from ¥3,000–¥5,000 per night and are perfectly comfortable for solo travelers. **Hostels** average ¥2,500–¥4,000. **Manga cafes** are a last resort but cost ¥1,500 for an overnight stay.

**Business hotels** (Toyoko Inn, APA Hotel) often run ¥6,000–¥8,000 per night — more than hostels but private and centrally located.

## Food

This is where Japan's budget reputation falls apart in your favor. You can eat extraordinarily well for almost nothing.

- **Convenience store (konbini) meals:** ¥500–¥800 for a complete, fresh meal. 7-Eleven Japan is genuinely good.
- **Ramen:** ¥800–¥1,200 for a bowl that might be the best thing you've ever eaten.
- **Standing sushi:** ¥1,500–¥2,500 for enough sushi to make you groan.
- **Department store basement (depachika):** Enormous food halls with incredible variety. Buy dinner from the discounted prepared food sections after 6pm.

## Free Attractions

Japan has hundreds of free shrines, temples, and natural areas. Highlights:
- Fushimi Inari (Kyoto) — always free
- Meiji Shrine (Tokyo) — free
- Hamarikyu Gardens (Tokyo) — ¥300 (almost free)
- Bamboo Grove at Arashiyama (Kyoto) — free
- Nara deer park — free (deer snacks cost ¥200)

## The IC Card

Get a Suica or Pasmo IC card at the airport and load it with ¥5,000. Use it for all trains, buses, and convenience store purchases. It saves significant time and often gives slight discounts on local transit.

---

*Want a guided Japan experience without the logistical headaches? Our Japan Cultural Immersion tour handles transport, accommodation, and translates everything — at a price that might surprise you.*
    `,
    tags: ["Japan", "Budget Travel", "Asia", "Tips"],
    relatedPosts: [
      { id: "3", title: "Greek Islands by Ferry: The Complete Island-Hopping Guide", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", category: "Destination Guides", readTime: "12 min read" },
      { id: "6", title: "Sustainable Travel: How to Explore the World Responsibly", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", category: "Sustainable Travel", readTime: "7 min read" },
    ],
  },
  "machu-picchu-inca-trail": {
    id: "5",
    title: "The Machu Picchu Inca Trail: Everything You Need to Know",
    excerpt: "Permits, altitude sickness, gear, fitness prep — our veteran trekkers share everything to make your trail perfect.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80",
    author: "Alexandra Chen",
    authorImg: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
    authorBio: "Alexandra has completed the Inca Trail twice and the Salkantay alternative once. She knows where to find hot showers.",
    date: "2024-03-15",
    readTime: "15 min read",
    category: "Adventure",
    featured: false,
    content: `
The Inca Trail to Machu Picchu is one of the world's great treks. Four days, 43 kilometers, 2,000-year-old stone paths — and a sunrise over the Sun Gate that you will never forget.

## Permits: Book Early (Very Early)

**The most important thing:** Inca Trail permits sell out within hours of going on sale, often 5–6 months in advance. Only 500 people per day are allowed on the trail (including porters and guides), and you must book through a licensed agency.

**When permits open:** Usually mid-October for the following year's season (April–October).

**Cost:** Expect to pay $500–$700 USD for a 4-day guided package inclusive of camping, meals, and entry fees.

## The Route

**Day 1:** Km 82 to Wayllabamba (12km, 400m ascent) — Gentle warm-up through cloud forest and river valleys

**Day 2:** Wayllabamba to Pacaymayo (12km, 1,200m ascent) — The hardest day. Dead Woman's Pass at 4,215m. Take your time.

**Day 3:** Pacaymayo to Wiñay Wayna (16km, net descent) — The most beautiful day. Ancient Inca ruins, orchids, cloud forest, multiple mountain passes.

**Day 4:** Wiñay Wayna to Machu Picchu (4am start, 3km) — Arrive at Sun Gate (Inti Punku) for sunrise. Descend to Machu Picchu for guided tour.

## Altitude Sickness (AMS)

Cusco sits at 3,400m; the trail's highest point is 4,215m. Altitude sickness is a real concern.

**Acclimatize properly:** Spend 2–3 days in Cusco (or Ollantaytambo at 2,800m) before starting the trail.

**Symptoms:** Headache, nausea, fatigue, dizziness. If symptoms are severe, descend immediately.

**Diamox (acetazolamide):** A prescription medication that helps many people acclimatize faster. Discuss with your doctor before traveling.

## Fitness Preparation

The Inca Trail is rated moderate-strenuous. Six weeks of preparation is recommended:
- Cardiovascular base: Running, cycling, swimming (30+ minutes, 4x per week)
- Leg strength: Squats, lunges, step-ups with weighted pack
- Hiking practice: At least 3 multi-hour hikes with a loaded pack before the trip

## What to Pack

- Sleeping bag rated to -5°C (23°F)
- Trekking poles (game changer on steep descents)
- Waterproof rain jacket (afternoon rains are common)
- Broken-in hiking boots with ankle support
- Altitude medication if prescribed
- Snacks: energy bars, nuts, electrolyte tablets
- Camera and extra batteries (cold kills battery life)
- Tip money for your porters (they deserve it)

---

*We offer the classic 4-day Inca Trail with expert local guides who know every ruin and ridge. Permits always included.*
    `,
    tags: ["Peru", "Hiking", "Machu Picchu", "Adventure", "Inca Trail"],
    relatedPosts: [
      { id: "2", title: "The Ultimate Packing Guide for a 2-Week Safari", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80", category: "Travel Tips", readTime: "6 min read" },
      { id: "6", title: "Sustainable Travel: How to Explore the World Responsibly", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", category: "Sustainable Travel", readTime: "7 min read" },
    ],
  },
  "sustainable-travel": {
    id: "6",
    title: "Sustainable Travel: How to Explore the World Responsibly",
    excerpt: "Tips on reducing your carbon footprint, supporting local communities, and choosing eco-friendly tour operators.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    author: "Priya Kapoor",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    authorBio: "Priya is a certified sustainable tourism consultant and has helped dozens of operators achieve responsible tourism certification.",
    date: "2024-03-05",
    readTime: "7 min read",
    category: "Sustainable Travel",
    featured: false,
    content: `
Travel is one of the greatest joys in life — but it comes at a cost to the planet. The good news: small changes to how we travel can make an enormous difference.

## Carbon Footprint

Flying is the single biggest contributor to a traveler's carbon footprint. A return flight from New York to London emits roughly 1.5 tonnes of CO₂ per passenger — equivalent to 2 months of driving.

**What you can do:**
- Fly direct when possible (takeoff and landing account for the majority of fuel consumption)
- Choose economy class (business class footprint is 3–4x economy)
- Offset your flights through **Gold Standard** certified projects
- For shorter trips, consider trains (80-95% lower emissions than flying)

## Accommodation

**Avoid major hotel chains** when possible. Local guesthouses keep money in the community and have a fraction of the corporate resort's environmental footprint.

**Look for certifications:**
- Rainforest Alliance (Latin America)
- Green Globe (global)
- LEED certification (global)
- GSTC (Global Sustainable Tourism Council)

## Supporting Local Communities

- Eat at locally owned restaurants, not international chains
- Hire local guides — they provide authentic experiences AND keep money circulating locally
- Buy handicrafts directly from artisans (avoid factory-made "local crafts" in airport shops)
- Stay at family-run guesthouses

## Wildlife Encounters

The rise of ethical wildlife tourism has been dramatic, but so has the rise of greenwashing.

**Avoid:**
- Elephant riding and shows
- Tiger temples
- Captive dolphin programs
- Walking with lions experiences

**Support:**
- Sanctuaries with rescue programs
- Wildlife photography tours
- National park visits where fees fund conservation

## The Plastic Problem

Many beautiful destinations — particularly coastal and island areas — are drowning in plastic waste.

**Bring:**
- Reusable water bottle + purification tablets or SteriPen
- Reusable shopping bags
- Bamboo utensil set
- Solid shampoo/soap bars (avoid packaging entirely)

**Refuse** single-use plastics whenever offered.

## What to Look for in Tour Operators

Ask these questions:
- What percentage of your guides are local?
- What is your policy on single-use plastics?
- Do you have a formal environmental management system?
- How do you give back to local communities?

A good operator will have detailed, specific answers. Vague answers are a red flag.

---

*WanderBase is committed to responsible tourism. All our tours use locally based guides, support community-owned accommodation where available, and partner with verified sustainable operators.*
    `,
    tags: ["Sustainability", "Responsible Travel", "Eco Tourism", "Tips"],
    relatedPosts: [
      { id: "1", title: "10 Hidden Gems in Southeast Asia You Must Visit in 2024", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80", category: "Destination Guides", readTime: "8 min read" },
      { id: "4", title: "How to Experience Japan on a Budget", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", category: "Budget Travel", readTime: "10 min read" },
    ],
  },
};

const slugMap: Record<string, string> = {
  "1": "hidden-gems-southeast-asia",
  "2": "safari-packing-guide",
  "3": "greek-islands-ferry",
  "4": "japan-budget-travel",
  "5": "machu-picchu-inca-trail",
  "6": "sustainable-travel",
};

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-3 font-display">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg font-bold text-gray-800 mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="font-semibold text-gray-800 mt-3 mb-1">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 my-3 text-gray-600">
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
      continue;
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-gray-200 my-8" />);
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(<p key={i} className="text-gray-600 leading-relaxed mb-4">{line}</p>);
    }
    i++;
  }
  return elements;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = posts[slug] ?? posts[slugMap[slug]];

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-black text-gray-200 mb-4">404</p>
          <p className="text-gray-600 mb-6">Article not found.</p>
          <Link href="/blog" className="text-primary font-semibold hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[500px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 py-10 max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded-full mb-3">
            {post.category}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-black text-white font-display leading-tight mb-4">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
              <span>{post.author}</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
          </motion.div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-xl text-gray-500 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">{post.excerpt}</p>

        <div className="prose-custom">{renderMarkdown(post.content)}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
          <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
          {post.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{tag}</span>
          ))}
        </div>

        {/* Share */}
        <div className="flex justify-end mt-4">
          <button onClick={share} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary hover:bg-primary/10 rounded-xl text-sm font-semibold transition-colors">
            <Share2 className="w-4 h-4" /> Share Article
          </button>
        </div>

        {/* Author Bio */}
        <div className="mt-10 p-6 bg-gray-50 rounded-2xl flex items-start gap-4">
          <img src={post.authorImg} alt={post.author} className="w-14 h-14 rounded-full object-cover shrink-0" />
          <div>
            <p className="font-bold text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500 mt-1">{post.authorBio}</p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {post.relatedPosts?.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-5">More Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {post.relatedPosts.map((rp: any) => {
              const relSlug = slugMap[rp.id];
              return (
                <Link key={rp.id} href={`/blog/${relSlug}`} className="group flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-primary">{rp.category}</span>
                    <p className="font-bold text-gray-900 text-sm mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">{rp.title}</p>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{rp.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
