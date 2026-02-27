import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import CategoryBanners from "@/components/CategoryBanners";
import LookOfTheDay from "@/components/LookOfTheDay";
import InformBlock from "@/components/InformBlock";
import SellersSection from "@/components/SellersSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import PopularCategories from "@/components/sections/PopularCategories";
import HotDeals from "@/components/sections/HotDeals";
import SpecialOffers from "@/components/sections/SpecialOffers";
import Bestsellers from "@/components/sections/Bestsellers";
import TrendingProducts from "@/components/sections/TrendingProducts";
import CustomerReviews from "@/components/sections/CustomerReviews";
import TopRatedSellers from "@/components/sections/TopRatedSellers";
import VerifiedSellersRow from "@/components/sections/VerifiedSellersRow";
import NewSellersBlock from "@/components/sections/NewSellersBlock";
import PopularSellersRow from "@/components/sections/PopularSellersRow";
import HowToOrder from "@/components/sections/HowToOrder";
import TrustBadges from "@/components/sections/TrustBadges";
import Newsletter from "@/components/sections/Newsletter";
import FAQ from "@/components/sections/FAQ";
import CTABlocks from "@/components/sections/CTABlocks";

const Index = () => {
  return(
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />

      <main>
        <div className="max-w-[1400px] mx-auto px-4">
          <HeroSlider />

          <PopularCategories />

          <HotDeals />

          <ProductGrid title="ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ" initialCount={6} />

          <SpecialOffers />

          <ProductGrid title="ПОПУЛЯРНОЕ В КАТЕГОРИИ" initialCount={6} />

          <CategoryBanners />

          <Bestsellers />

          <ProductGrid title="НОВОЕ ПОСТУПЛЕНИЕ" initialCount={12} />

          <TrendingProducts />
        </div>

        <section className="w-full">
          <div className="max-w-[1400px] mx-auto px-4">
            <LookOfTheDay />
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-4">
          <CustomerReviews />

          <SellersSection />

          <TopRatedSellers />

          <VerifiedSellersRow />

          <NewSellersBlock />

          <PopularSellersRow />

          <HowToOrder />

          <InformBlock />

          <MapSection />

          <Newsletter />

          <FAQ />

          <CTABlocks />
        </div>

        <TrustBadges />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
