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

const Index = () => {
  return(
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />

      <main>
        <div className="max-w-[1400px] mx-auto px-4">
          <HeroSlider />

          <ProductGrid title="ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ" initialCount={6} />

          <ProductGrid title="ПОПУЛЯРНОЕ В КАТЕГОРИИ" initialCount={6} />

          <CategoryBanners />

          <ProductGrid title="ПОПУЛЯРНОЕ В КАТЕГОРИИ" initialCount={6} />

          <ProductGrid title="НОВОЕ ПОСТУПЛЕНИЕ" initialCount={12} />

          <ProductGrid title="ТРЕНДОВЫЕ ТОВАРЫ" initialCount={12} />
        </div>

        <section className="w-full">
          <div className="max-w-[1400px] mx-auto px-4">
            <LookOfTheDay />
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-4">
          <SellersSection />

          <InformBlock />

          <MapSection />
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
