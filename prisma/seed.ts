import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding WanderBase database...");

  // ─── Clear existing data ────────────────────────────────────────────────────
  await prisma.commission.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.article.deleteMany();
  await prisma.guideline.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.user.deleteMany();

  // ─── Hash password helper ───────────────────────────────────────────────────
  const hash = (pw: string) => bcrypt.hash(pw, 12);

  // ─── 1. Admin User ──────────────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      email: "admin@wanderbase.com",
      name: "Alex Chen",
      password: await hash("Admin@1234"),
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
      phone: "+1 800 123 4567",
      bio: "WanderBase founder and platform administrator.",
      country: "USA",
    },
  });

  // ─── 2. Agent Users ────────────────────────────────────────────────────────
  const agentUser1 = await prisma.user.create({
    data: {
      email: "james.agent@wanderbase.com",
      name: "James Rivera",
      password: await hash("Agent@1234"),
      role: "AGENT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      phone: "+44 20 1234 5678",
      country: "UK",
    },
  });

  const agentUser2 = await prisma.user.create({
    data: {
      email: "priya.agent@wanderbase.com",
      name: "Priya Kapoor",
      password: await hash("Agent@1234"),
      role: "AGENT",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      phone: "+91 98765 43210",
      country: "India",
    },
  });

  // ─── 3. Agent Profiles ─────────────────────────────────────────────────────
  const agent1 = await prisma.agent.create({
    data: {
      userId: agentUser1.id,
      referralCode: "JAMES2024",
      commissionRate: 12.0,
      companyName: "Rivera Travel Co.",
      website: "https://riveratravel.com",
      status: "ACTIVE",
      totalEarnings: 4250.00,
      pendingAmount: 850.00,
    },
  });

  const agent2 = await prisma.agent.create({
    data: {
      userId: agentUser2.id,
      referralCode: "PRIYA2024",
      commissionRate: 10.0,
      companyName: "Kapoor Travels",
      website: "https://kapooradventures.com",
      status: "ACTIVE",
      totalEarnings: 2100.00,
      pendingAmount: 400.00,
    },
  });

  // ─── 4. Regular Users ──────────────────────────────────────────────────────
  const user1 = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      name: "Sarah Mitchell",
      password: await hash("User@1234"),
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      country: "USA",
      bio: "Adventure traveler and travel blogger.",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "carlos@example.com",
      name: "Carlos Mendez",
      password: await hash("User@1234"),
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      country: "Spain",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "yuki@example.com",
      name: "Yuki Tanaka",
      password: await hash("User@1234"),
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
      country: "Japan",
    },
  });

  // Agent referrals
  await prisma.referral.createMany({
    data: [
      { agentId: agent1.id, userId: user1.id },
      { agentId: agent1.id, userId: user2.id },
      { agentId: agent2.id, userId: user3.id },
    ],
  });

  // ─── 5. Destinations ───────────────────────────────────────────────────────
  const dest1 = await prisma.destination.create({
    data: {
      name: "Santorini",
      country: "Greece",
      continent: "Europe",
      description: "Iconic white-washed buildings perched on volcanic cliffs above the stunning Aegean Sea.",
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      ]),
      category: JSON.stringify(["Beach", "Romance", "Culture"]),
      highlights: JSON.stringify(["Oia Sunset", "Caldera Views", "Wine Tasting", "Ancient Akrotiri"]),
      rating: 4.9,
      reviewCount: 2847,
      priceFrom: 1299,
      duration: "7 days",
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const dest2 = await prisma.destination.create({
    data: {
      name: "Bali",
      country: "Indonesia",
      continent: "Asia",
      description: "The Island of Gods — lush rice terraces, ancient temples, and vibrant spiritual culture.",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1604999565976-8913ad2ddb37?w=800&q=80",
      ]),
      category: JSON.stringify(["Culture", "Adventure", "Spiritual"]),
      highlights: JSON.stringify(["Ubud Monkey Forest", "Tanah Lot", "Rice Terraces", "Kuta Beach"]),
      rating: 4.8,
      reviewCount: 3921,
      priceFrom: 899,
      duration: "10 days",
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const dest3 = await prisma.destination.create({
    data: {
      name: "Machu Picchu",
      country: "Peru",
      continent: "South America",
      description: "The Lost City of the Incas — a mystical ancient citadel high in the Andes Mountains.",
      imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      images: JSON.stringify([]),
      category: JSON.stringify(["Adventure", "History", "Trekking"]),
      highlights: JSON.stringify(["Inca Trail", "Sun Gate", "Huayna Picchu", "Sacred Valley"]),
      rating: 4.9,
      reviewCount: 1654,
      priceFrom: 1599,
      duration: "8 days",
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const dest4 = await prisma.destination.create({
    data: {
      name: "Maldives",
      country: "Maldives",
      continent: "Asia",
      description: "Crystal-clear turquoise lagoons, overwater bungalows, and pristine coral reefs.",
      imageUrl: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      images: JSON.stringify([]),
      category: JSON.stringify(["Beach", "Luxury", "Romance"]),
      highlights: JSON.stringify(["Overwater Villas", "Snorkeling", "Whale Sharks", "Sunset Cruises"]),
      rating: 5.0,
      reviewCount: 1243,
      priceFrom: 2499,
      duration: "7 days",
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const dest5 = await prisma.destination.create({
    data: {
      name: "Kyoto",
      country: "Japan",
      continent: "Asia",
      description: "Japan's ancient capital with thousands of classical Buddhist temples and traditional geisha districts.",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      images: JSON.stringify([]),
      category: JSON.stringify(["Culture", "History", "Food"]),
      highlights: JSON.stringify(["Fushimi Inari", "Arashiyama", "Geisha District", "Tea Ceremony"]),
      rating: 4.8,
      reviewCount: 2109,
      priceFrom: 1199,
      duration: "9 days",
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const dest6 = await prisma.destination.create({
    data: {
      name: "Safari Kenya",
      country: "Kenya",
      continent: "Africa",
      description: "Witness the Great Migration across the Masai Mara — the greatest wildlife show on Earth.",
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      images: JSON.stringify([]),
      category: JSON.stringify(["Wildlife", "Adventure", "Nature"]),
      highlights: JSON.stringify(["Big Five", "Great Migration", "Masai Village", "Hot Air Balloon"]),
      rating: 4.9,
      reviewCount: 987,
      priceFrom: 3299,
      duration: "12 days",
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  // ─── 6. Tours ──────────────────────────────────────────────────────────────
  const tour1 = await prisma.tour.create({
    data: {
      title: "Greek Islands Odyssey",
      destinationId: dest1.id,
      description: "Island-hop through the most beautiful Greek islands — Santorini, Mykonos, Crete, and Rhodes — on this epic 14-day odyssey.",
      imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      price: 2499,
      originalPrice: 3199,
      duration: "14 days",
      groupSizeMin: 8,
      groupSizeMax: 12,
      difficulty: "EASY",
      includes: JSON.stringify(["Flights", "Hotels", "Breakfast", "Guided Tours", "Ferry Tickets"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrive in Athens", description: "Welcome dinner at Plaka", activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"] },
        { day: 2, title: "Athens Highlights", description: "Acropolis and Parthenon tour", activities: ["Acropolis Museum", "Parthenon", "Greek lunch"] },
        { day: 3, title: "Ferry to Santorini", description: "Sail to Santorini", activities: ["Morning ferry", "Check-in Oia", "Sunset viewing"] },
      ]),
      category: "Beach & Culture",
      badge: "Best Seller",
      departure: "Every Saturday",
      rating: 4.9,
      reviewCount: 324,
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const tour2 = await prisma.tour.create({
    data: {
      title: "Bali Spirit Journey",
      destinationId: dest2.id,
      description: "Immerse yourself in Bali's spiritual heart — yoga retreats, temple ceremonies, rice terrace walks, and authentic village life.",
      imageUrl: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb37?w=800&q=80",
      price: 1499,
      originalPrice: 1999,
      duration: "10 days",
      groupSizeMin: 6,
      groupSizeMax: 10,
      difficulty: "EASY",
      includes: JSON.stringify(["Villa Stay", "Daily Breakfast", "Yoga Classes", "Temple Tours", "Cooking Class"]),
      itinerary: JSON.stringify([]),
      category: "Cultural & Spiritual",
      badge: "Most Popular",
      departure: "Every Monday",
      rating: 4.8,
      reviewCount: 512,
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const tour3 = await prisma.tour.create({
    data: {
      title: "Inca Trail Adventure",
      destinationId: dest3.id,
      description: "Trek the legendary Inca Trail through cloud forest and Andean highlands to the iconic Sun Gate above Machu Picchu.",
      imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
      price: 2199,
      originalPrice: 2699,
      duration: "8 days",
      groupSizeMin: 4,
      groupSizeMax: 8,
      difficulty: "CHALLENGING",
      includes: JSON.stringify(["Camping Gear", "All Meals", "Expert Guide", "Train Tickets", "Entry Permits"]),
      itinerary: JSON.stringify([]),
      category: "Adventure",
      badge: "Challenging",
      departure: "Every Thursday",
      rating: 4.9,
      reviewCount: 198,
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const tour4 = await prisma.tour.create({
    data: {
      title: "Maldives Luxury Escape",
      destinationId: dest4.id,
      description: "Seven nights of pure paradise — overwater bungalow, private beach, world-class diving, and gourmet dining under the stars.",
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
      price: 4999,
      originalPrice: 6499,
      duration: "7 days",
      groupSizeMin: 2,
      groupSizeMax: 4,
      difficulty: "EASY",
      includes: JSON.stringify(["Overwater Villa", "Full Board", "Snorkeling", "Seaplane Transfer", "Spa Credit"]),
      itinerary: JSON.stringify([]),
      category: "Luxury",
      badge: "Luxury",
      departure: "Any day",
      rating: 5.0,
      reviewCount: 87,
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  const tour5 = await prisma.tour.create({
    data: {
      title: "Japan Cultural Immersion",
      destinationId: dest5.id,
      description: "Journey through ancient Kyoto, futuristic Tokyo, and serene Nara on this comprehensive 12-day cultural deep dive.",
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      price: 3299,
      originalPrice: 3999,
      duration: "12 days",
      groupSizeMin: 6,
      groupSizeMax: 12,
      difficulty: "EASY",
      includes: JSON.stringify(["Ryokan Stay", "Shinkansen Pass", "Tea Ceremony", "Sake Tasting", "All Breakfasts"]),
      itinerary: JSON.stringify([]),
      category: "Cultural",
      badge: "New",
      departure: "Every Friday",
      rating: 4.8,
      reviewCount: 276,
      status: "ACTIVE",
      featured: false,
      createdBy: admin.id,
    },
  });

  const tour6 = await prisma.tour.create({
    data: {
      title: "African Safari Expedition",
      destinationId: dest6.id,
      description: "Witness the Great Migration, track the Big Five, and sleep under a canopy of stars on this ultimate African safari.",
      imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
      price: 5499,
      originalPrice: 6999,
      duration: "14 days",
      groupSizeMin: 4,
      groupSizeMax: 8,
      difficulty: "MODERATE",
      includes: JSON.stringify(["Safari Lodge", "All Meals", "Game Drives", "Hot Air Balloon", "Park Fees"]),
      itinerary: JSON.stringify([]),
      category: "Wildlife",
      badge: "Premium",
      departure: "Every Sunday",
      rating: 4.9,
      reviewCount: 143,
      status: "ACTIVE",
      featured: true,
      createdBy: admin.id,
    },
  });

  // ─── 7. Bookings ───────────────────────────────────────────────────────────
  const booking1 = await prisma.booking.create({
    data: {
      tourId: tour1.id,
      userId: user1.id,
      agentCode: "JAMES2024",
      departureDate: new Date("2024-07-15"),
      guests: 2,
      totalPrice: 4998,
      status: "CONFIRMED",
      paymentStatus: "PAID",
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      tourId: tour2.id,
      userId: user2.id,
      agentCode: "JAMES2024",
      departureDate: new Date("2024-03-10"),
      guests: 2,
      totalPrice: 2998,
      status: "COMPLETED",
      paymentStatus: "PAID",
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      tourId: tour4.id,
      userId: user3.id,
      agentCode: "PRIYA2024",
      departureDate: new Date("2024-08-20"),
      guests: 2,
      totalPrice: 9998,
      status: "PENDING",
      paymentStatus: "PENDING",
    },
  });

  const booking4 = await prisma.booking.create({
    data: {
      tourId: tour5.id,
      userId: user1.id,
      departureDate: new Date("2024-09-05"),
      guests: 1,
      totalPrice: 3299,
      status: "CONFIRMED",
      paymentStatus: "PAID",
    },
  });

  const booking5 = await prisma.booking.create({
    data: {
      tourId: tour3.id,
      userId: user2.id,
      agentCode: "JAMES2024",
      departureDate: new Date("2024-05-12"),
      guests: 1,
      totalPrice: 2199,
      status: "CANCELLED",
      paymentStatus: "REFUNDED",
    },
  });

  // ─── 8. Commissions ────────────────────────────────────────────────────────
  await prisma.commission.createMany({
    data: [
      {
        agentId: agent1.id,
        bookingId: booking1.id,
        amount: 599.76,
        rate: 12.0,
        status: "APPROVED",
      },
      {
        agentId: agent1.id,
        bookingId: booking2.id,
        amount: 359.76,
        rate: 12.0,
        status: "PAID",
        paidAt: new Date("2024-04-01"),
      },
      {
        agentId: agent2.id,
        bookingId: booking3.id,
        amount: 999.80,
        rate: 10.0,
        status: "PENDING",
      },
    ],
  });

  // ─── 9. Reviews ────────────────────────────────────────────────────────────
  await prisma.review.createMany({
    data: [
      {
        tourId: tour2.id,
        userId: user1.id,
        bookingId: booking2.id,
        rating: 5,
        title: "Absolutely magical experience!",
        content: "WanderBase completely transformed how I travel. The Bali trip was beyond magical — every detail was perfect. From the villa to the temple tours, I felt like a VIP the entire time.",
        status: "APPROVED",
      },
      {
        tourId: tour1.id,
        userId: user2.id,
        rating: 5,
        title: "Greek Islands at their finest",
        content: "The Greek Islands tour was absolutely spectacular. Our guide was incredibly knowledgeable, and the itinerary was perfectly paced. Santorini at sunset is something I'll never forget.",
        status: "APPROVED",
      },
    ],
  });

  // ─── 10. Articles ──────────────────────────────────────────────────────────
  await prisma.article.createMany({
    data: [
      {
        title: "10 Hidden Gems in Southeast Asia",
        slug: "hidden-gems-southeast-asia",
        content: "Beyond the typical tourist trail, these undiscovered paradises offer authentic experiences...",
        excerpt: "Discover the undiscovered paradises of Southeast Asia that most travelers miss.",
        coverImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
        authorId: user1.id,
        status: "PUBLISHED",
        category: "Destination Guides",
        tags: JSON.stringify(["Southeast Asia", "Hidden Gems", "Travel Tips"]),
        views: 3421,
        publishedAt: new Date("2024-03-15"),
      },
      {
        title: "The Ultimate Packing Guide for a 2-Week Safari",
        slug: "packing-guide-safari",
        content: "What to pack, what to leave behind, and the gear that experienced safari-goers swear by...",
        excerpt: "Expert packing tips for your African safari adventure.",
        coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        authorId: user2.id,
        status: "PUBLISHED",
        category: "Travel Tips",
        tags: JSON.stringify(["Safari", "Packing", "Africa"]),
        views: 2187,
        publishedAt: new Date("2024-04-01"),
      },
      {
        title: "My First Solo Trip to Japan",
        slug: "first-solo-trip-japan",
        content: "I was terrified to travel alone for the first time, but Japan turned out to be the perfect destination...",
        excerpt: "A personal account of navigating Japan solo as a first-time traveler.",
        coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        authorId: user3.id,
        status: "DRAFT",
        category: "Personal Stories",
        tags: JSON.stringify(["Japan", "Solo Travel", "First Time"]),
        views: 0,
      },
    ],
  });

  // ─── 11. Photos ────────────────────────────────────────────────────────────
  await prisma.photo.createMany({
    data: [
      { userId: user1.id, destinationId: dest1.id, url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", caption: "Sunset over the caldera in Oia 🌅", location: "Santorini, Greece", likes: 234 },
      { userId: user1.id, destinationId: dest2.id, url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", caption: "Morning yoga at the rice terraces 🧘", location: "Ubud, Bali", likes: 189 },
      { userId: user2.id, destinationId: dest3.id, url: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80", caption: "Made it to the top! Machu Picchu is breathtaking 🏔️", location: "Peru", likes: 412 },
      { userId: user3.id, destinationId: dest5.id, url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", caption: "Thousands of torii gates at Fushimi Inari ⛩️", location: "Kyoto, Japan", likes: 567 },
    ],
  });

  // ─── 12. Wishlists ─────────────────────────────────────────────────────────
  await prisma.wishlist.createMany({
    data: [
      { userId: user1.id, tourId: tour4.id },
      { userId: user1.id, tourId: tour6.id },
      { userId: user2.id, tourId: tour5.id },
      { userId: user3.id, tourId: tour1.id },
    ],
  });

  // ─── 13. Guidelines ────────────────────────────────────────────────────────
  await prisma.guideline.createMany({
    data: [
      {
        title: "Travel Insurance Requirements",
        content: "All WanderBase tour participants must have valid travel insurance covering medical emergencies, trip cancellation, and lost baggage. Minimum coverage: $100,000 medical, $50,000 evacuation.",
        category: "SAFETY",
        createdBy: admin.id,
      },
      {
        title: "Booking & Cancellation Policy",
        content: "Free cancellation up to 48 hours before departure. 50% refund for cancellations 7-48 hours prior. No refund for cancellations within 7 hours of departure. All bookings require 25% deposit to confirm.",
        category: "BOOKING",
        createdBy: admin.id,
      },
      {
        title: "Visa Requirements by Destination",
        content: "Visa requirements vary by destination and nationality. It is the traveler's responsibility to obtain the necessary visas before departure. WanderBase provides guidance but is not responsible for visa rejections.",
        category: "VISA",
        createdBy: admin.id,
      },
      {
        title: "Health & Safety Guidelines",
        content: "Consult your doctor 6-8 weeks before travel for vaccinations. Carry a basic first aid kit. Stay hydrated, use sunscreen, and follow your guide's safety instructions at all times.",
        category: "SAFETY",
        createdBy: admin.id,
      },
      {
        title: "Packing Recommendations",
        content: "Pack light — 20kg maximum for most tours. Bring comfortable walking shoes, layers for temperature changes, and a reusable water bottle. Detailed packing lists are provided for each specific tour.",
        category: "TRAVEL",
        createdBy: admin.id,
      },
    ],
  });

  console.log("✅ Seed complete!");
  console.log("\n📋 Login Credentials:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👑 Admin:  admin@wanderbase.com  / Admin@1234");
  console.log("🤝 Agent1: james.agent@wanderbase.com / Agent@1234 (code: JAMES2024)");
  console.log("🤝 Agent2: priya.agent@wanderbase.com / Agent@1234 (code: PRIYA2024)");
  console.log("👤 User1:  sarah@example.com / User@1234");
  console.log("👤 User2:  carlos@example.com / User@1234");
  console.log("👤 User3:  yuki@example.com / User@1234");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
