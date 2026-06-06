import Link from "next/link";
import { Globe, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const SocialFacebook = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SocialInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const SocialTwitter = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const SocialYoutube = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  destinations: [
    { label: "Europe", href: "/destinations?continent=Europe" },
    { label: "Asia & Pacific", href: "/destinations?continent=Asia" },
    { label: "Africa", href: "/destinations?continent=Africa" },
    { label: "Americas", href: "/destinations?continent=Americas" },
    { label: "Middle East", href: "/destinations?continent=Middle+East" },
  ],
  tours: [
    { label: "Adventure Tours", href: "/tours?category=Adventure" },
    { label: "Luxury Escapes", href: "/tours?category=Luxury" },
    { label: "Family Holidays", href: "/tours?category=Family" },
    { label: "Beach & Islands", href: "/tours?category=Beach" },
    { label: "Wildlife Safari", href: "/tours?category=Wildlife" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: SocialFacebook, href: "#", label: "Facebook" },
  { icon: SocialInstagram, href: "#", label: "Instagram" },
  { icon: SocialTwitter, href: "#", label: "Twitter" },
  { icon: SocialYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                Wander<span className="text-accent">Base</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Your trusted travel companion for over 15 years. We craft unforgettable journeys to the world's most breathtaking destinations.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              <a href="tel:+18001234567" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                +1 (800) 123-4567
              </a>
              <a href="mailto:hello@wanderbase.com" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                hello@wanderbase.com
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>123 Travel Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-linear-to-br hover:from-primary hover:to-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 WanderBase. All rights reserved. Made with ❤️ for travelers worldwide.
            </p>
            <div className="flex items-center gap-2">
              {/* Payment icons */}
              {["Visa", "MC", "PayPal", "Stripe"].map((p) => (
                <span key={p} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/10">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
