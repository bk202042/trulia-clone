import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import HowTruliaHelps from "@/components/home/HowTruliaHelps";
import ExploreRentals from "@/components/home/ExploreRentals";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <HowTruliaHelps />
      <ExploreRentals />
    </div>
  );
}
