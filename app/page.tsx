import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedVehicles from "@/components/FeaturedVehicles";

export default function HomePage() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <CategoriesSection />
      <FeaturedVehicles />
    </>
  );
}
