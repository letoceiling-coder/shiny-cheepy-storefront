import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import HeroSlider from "@/components/HeroSlider";
import CategorySliderSection from "@/components/home/CategorySliderSection";
import LightCategoryNav from "@/components/home/LightCategoryNav";
import HotDeals from "@/components/sections/HotDeals";
import PopularCategories from "@/components/sections/PopularCategories";
import SpecialOffers from "@/components/sections/SpecialOffers";
import Bestsellers from "@/components/sections/Bestsellers";
import TrendingProducts from "@/components/sections/TrendingProducts";
import CustomerReviews from "@/components/sections/CustomerReviews";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import CompactCategories from "@/components/sections/CompactCategories";
import IconCategories from "@/components/sections/IconCategories";
import BrandsSlider from "@/components/sections/BrandsSlider";
import AllCategoriesGrid from "@/components/sections/AllCategoriesGrid";
import TopRatedSellers from "@/components/sections/TopRatedSellers";
import VerifiedSellersRow from "@/components/sections/VerifiedSellersRow";
import NewSellersBlock from "@/components/sections/NewSellersBlock";
import PopularSellersRow from "@/components/sections/PopularSellersRow";
import HowToOrder from "@/components/sections/HowToOrder";
import TrustBadges from "@/components/sections/TrustBadges";
import Newsletter from "@/components/sections/Newsletter";
import FAQ from "@/components/sections/FAQ";
import CTABlocks from "@/components/sections/CTABlocks";
import InformBlock from "@/components/InformBlock";
import SellersSection from "@/components/SellersSection";
import MapSection from "@/components/MapSection";
import ProductGrid from "@/components/ProductGrid";
import CategoryBanners from "@/components/CategoryBanners";
import LookOfTheDay from "@/components/LookOfTheDay";
import PromoBanners from "@/components/sections/PromoBanners";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />

      <main>
        <div className="max-w-[1400px] mx-auto px-4">
          <HeroSlider />

          {/* New Category Slider Section from strict */}
          <CategorySliderSection />

          {/* Light Category Nav from strict */}
          <LightCategoryNav />

          <PromoBanners />

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

          <ReviewsSlider />

          <CompactCategories />

          <IconCategories />

          <BrandsSlider />

          <AllCategoriesGrid />

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
