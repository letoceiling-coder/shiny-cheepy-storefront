import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import CategoryBanners from "@/components/CategoryBanners";
import LookOfTheDay from "@/components/LookOfTheDay";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 pb-20 md:pb-0">
        <HeroSlider />

        <ProductGrid title="Успейте купить" subtitle="Горящие предложения" initialCount={6} />

        <CategoryBanners />

        <ProductGrid title='Рекомендуем в категории "Мужская одежда"' initialCount={6} />

        <LookOfTheDay />

        <ProductGrid title="Популярное сейчас" initialCount={12} />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
