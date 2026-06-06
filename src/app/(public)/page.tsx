import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TourPackages from "@/components/home/TourPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedDestinations />
      <TourPackages />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <Newsletter />
    </>
  );
}
