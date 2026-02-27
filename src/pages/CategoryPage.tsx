import { useState } from "react";
import { ChevronDown, ChevronRight, SlidersHorizontal, Grid2X2, LayoutList, X } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { mockProducts, mockCategories, mockSubcategories } from "@/data/mock-data";

const CategoryPage = () => {
  const { slug } = useParams();
  const categoryName = slug ? decodeURIComponent(slug).replace(/-/g, " ") : mockCategories[0];

  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const subcategories = mockSubcategories[Object.keys(mockSubcategories)[0]] || ["Все", "Популярные", "Новинки", "Со скидкой"];
  const [activeSubcat, setActiveSubcat] = useState(0);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Чёрный", hex: "#000" },
    { name: "Белый", hex: "#fff" },
    { name: "Синий", hex: "#3B82F6" },
    { name: "Красный", hex: "#EF4444" },
    { name: "Серый", hex: "#9CA3AF" },
    { name: "Бежевый", hex: "#D2B48C" },
  ];
  const brands = ["Nike", "Zara", "H&M", "Mango", "Uniqlo", "Levi's"];
  const materials = ["Хлопок", "Полиэстер", "Шерсть", "Экокожа", "Замша", "Деним"];

  const perPage = 12;
  const products = mockProducts;
  const totalPages = Math.ceil(products.length / perPage);
  const pageProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleColor = (c: string) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleBrand = (b: string) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);

  const FilterSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
      <div className="border-b border-border pb-4 mb-4">
        <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-2">
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && children}
      </div>
    );
  };

  const filtersContent = (
    <div className="space-y-0">
      <FilterSection title="Цена">
        <div className="flex items-center gap-2">
          <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full py-2 px-3 rounded-lg border border-border bg-background text-foreground text-sm" placeholder="От" />
          <span className="text-muted-foreground">—</span>
          <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full py-2 px-3 rounded-lg border border-border bg-background text-foreground text-sm" placeholder="До" />
        </div>
      </FilterSection>

      <FilterSection title="Размер">
        <div className="flex flex-wrap gap-2">
          {sizes.map(s => (
            <button key={s} onClick={() => toggleSize(s)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedSizes.includes(s) ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary/50"}`}>
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Цвет">
        <div className="flex flex-wrap gap-2">
          {colors.map(c => (
            <button key={c.name} onClick={() => toggleColor(c.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedColors.includes(c.name) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
              <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Бренд">
        <div className="space-y-2">
          {brands.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)}
                className="rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-foreground">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Материал" defaultOpen={false}>
        <div className="space-y-2">
          {materials.map(m => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-foreground">{m}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Рейтинг">
        <div className="space-y-2">
          {[4, 3, 2, 1].map(r => (
            <button key={r} onClick={() => setSelectedRating(selectedRating === r ? null : r)}
              className={`flex items-center gap-1 text-sm ${selectedRating === r ? "text-primary" : "text-foreground"}`}>
              {"★".repeat(r)}{"☆".repeat(5 - r)}
              <span className="text-muted-foreground ml-1">от {r}</span>
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <a href="/" className="hover:text-primary transition-colors">Главная</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground capitalize">{categoryName}</span>
        </div>

        {/* Category banner */}
        <div className="gradient-primary rounded-2xl p-6 md:p-10 mb-6 text-primary-foreground">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize">{categoryName}</h1>
          <p className="text-sm opacity-80">Более {products.length * 10} товаров от проверенных продавцов</p>
        </div>

        {/* Subcategories slider */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
          {subcategories.map((s, i) => (
            <button key={s} onClick={() => setActiveSubcat(i)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === activeSubcat ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filters - desktop */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-[180px]">
              <h2 className="text-lg font-bold text-foreground mb-4">Фильтры</h2>
              {filtersContent}
            </div>
          </aside>

          {/* Mobile filter button */}
          <button onClick={() => setShowFilters(true)} className="lg:hidden fixed bottom-20 right-4 z-40 gradient-primary text-primary-foreground p-3 rounded-full shadow-lg">
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-[320px] bg-background overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">Фильтры</h2>
                  <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                </div>
                {filtersContent}
                <Button onClick={() => setShowFilters(false)} className="w-full gradient-primary text-primary-foreground rounded-lg mt-4">
                  Применить
                </Button>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{products.length} товаров</span>
              </div>
              <div className="flex items-center gap-3">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-sm py-2 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary">
                  <option value="popular">По популярности</option>
                  <option value="price_asc">Сначала дешёвые</option>
                  <option value="price_desc">Сначала дорогие</option>
                  <option value="new">Новинки</option>
                  <option value="rating">По рейтингу</option>
                </select>
                <div className="hidden md:flex border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {pageProducts.map(p => (
                <a key={p.id} href={`/product/${p.id}`} className="block">
                  <ProductCard product={p} />
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Registration CTA */}
            <div className="mt-8 gradient-primary rounded-2xl p-6 text-center text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Зарегистрируйтесь и получите -10%</h3>
              <p className="text-sm opacity-80 mb-4">На первый заказ от любого продавца</p>
              <a href="/auth" className="inline-block bg-background text-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                Зарегистрироваться
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default CategoryPage;
