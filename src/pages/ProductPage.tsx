import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ChevronRight, Star, Minus, Plus, Share2, Shield, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import ReviewModal from "@/components/ReviewModal";
import { mockProducts } from "@/data/mock-data";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";

const ProductPage = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === Number(id)) || mockProducts[0];
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"about" | "reviews" | "delivery">("about");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const similarProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 6);
  const recentlyViewed = mockProducts.slice(8, 14);
  const buyTogether = mockProducts.slice(3, 7);

  const mockReviews = [
    { id: 1, author: "Мария", date: "2024-12-10", rating: 5, text: "Отличная вещь! Соответствует описанию.", pros: "Качественная ткань, красивый цвет", cons: "Нет" },
    { id: 2, author: "Дмитрий", date: "2024-12-05", rating: 4, text: "Хорошее качество за свою цену.", pros: "Удобная, хорошо сидит", cons: "Немного отличается от фото" },
    { id: 3, author: "Анна", date: "2024-11-28", rating: 5, text: "Заказываю второй раз. Рекомендую!", pros: "Быстрая доставка, качество", cons: "Нет" },
  ];

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/category/all" className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>

        {/* Product top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">
          {/* Gallery */}
          <div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-3">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImage ? "border-primary" : "border-transparent"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{product.name}</h1>
              <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href }).catch(() => {})} className="shrink-0 p-2 rounded-lg border border-border text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} отзывов</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">{(product.price * quantity).toLocaleString()} ₽</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{(product.oldPrice * quantity).toLocaleString()} ₽</span>
                  <span className="gradient-hero text-primary-foreground text-sm font-semibold px-2 py-0.5 rounded-full">-{discount}%</span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground mb-2">Цвет: <span className="text-muted-foreground">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors ${selectedColor === c ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary/50"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Размер: <span className="text-muted-foreground">{selectedSize}</span></p>
                <button className="text-sm text-primary hover:underline">Таблица размеров</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`w-12 h-10 rounded-lg text-sm font-medium border transition-colors ${selectedSize === s ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary/50"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Количество</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button onClick={() => addToCart(product, selectedColor, selectedSize)}
                className="flex-1 gradient-primary text-primary-foreground rounded-xl py-3 h-auto text-sm font-semibold gap-2">
                <ShoppingCart className="w-4 h-4" />
                Добавить в корзину
              </Button>
              <button onClick={() => toggleFavorite(product)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${isFavorite(product.id) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-primary hover:border-primary"}`}>
                <Heart className={`w-5 h-5 ${isFavorite(product.id) ? "fill-primary" : ""}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Гарантия качества" },
                { icon: Truck, label: "Бесплатная доставка" },
                { icon: RotateCcw, label: "Возврат 14 дней" },
              ].map(g => (
                <div key={g.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary text-center">
                  <g.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-0">
            {[
              { key: "about" as const, label: "О товаре" },
              { key: "reviews" as const, label: `Отзывы (${mockReviews.length})` },
              { key: "delivery" as const, label: "Доставка" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "about" && (
          <div className="max-w-3xl mb-10">
            <p className="text-foreground mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Бренд", value: product.brand },
                { label: "Материал", value: product.material },
                { label: "Категория", value: product.category },
                { label: "Артикул", value: `CP-${product.id.toString().padStart(6, "0")}` },
              ].map(r => (
                <div key={r.label} className="flex justify-between py-2 border-b border-border text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="text-foreground font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl mb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Отзывы покупателей</h3>
              {isAuthenticated ? (
                <Button onClick={() => setShowReviewModal(true)} variant="outline" className="rounded-lg text-sm">Написать отзыв</Button>
              ) : (
                <Link to="/auth" className="text-sm text-primary hover:underline">Войдите, чтобы оставить отзыв</Link>
              )}
            </div>
            <div className="space-y-4">
              {mockReviews.map(r => (
                <div key={r.id} className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">{r.author}</span>
                      <div className="flex">{[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-yellow-500 text-yellow-500" : "text-border"}`} />)}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-foreground mb-2">{r.text}</p>
                  {r.pros && <p className="text-xs text-muted-foreground"><span className="text-green-600 font-medium">Достоинства:</span> {r.pros}</p>}
                  {r.cons && r.cons !== "Нет" && <p className="text-xs text-muted-foreground"><span className="text-destructive font-medium">Недостатки:</span> {r.cons}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="max-w-3xl mb-10 space-y-4">
            <div className="p-4 rounded-xl border border-border">
              <h4 className="font-semibold text-foreground mb-2">Доставка курьером</h4>
              <p className="text-sm text-muted-foreground">от 1-3 дней, бесплатно при заказе от 3000 ₽</p>
            </div>
            <div className="p-4 rounded-xl border border-border">
              <h4 className="font-semibold text-foreground mb-2">Самовывоз из ПВЗ</h4>
              <p className="text-sm text-muted-foreground">от 2-5 дней, бесплатно</p>
            </div>
            <div className="p-4 rounded-xl border border-border">
              <h4 className="font-semibold text-foreground mb-2">Возврат</h4>
              <p className="text-sm text-muted-foreground">В течение 14 дней после получения</p>
            </div>
          </div>
        )}

        {/* Seller info */}
        <div className="p-5 rounded-2xl border border-border mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              {product.seller[0]}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{product.seller}</h4>
              <p className="text-sm text-muted-foreground">Рейтинг продавца: 4.8 · На площадке 2 года</p>
            </div>
            <Button variant="outline" className="ml-auto rounded-lg text-sm">Все товары</Button>
          </div>
        </div>

        {/* Recently viewed */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Недавно просмотренные</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewed.map(p => (
              <a key={p.id} href={`/product/${p.id}`}><ProductCard product={p} /></a>
            ))}
          </div>
        </section>

        {/* Buy together */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Покупают вместе</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {buyTogether.map(p => (
              <a key={p.id} href={`/product/${p.id}`}><ProductCard product={p} /></a>
            ))}
          </div>
        </section>

        {/* Similar */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Похожие товары</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarProducts.map(p => (
              <a key={p.id} href={`/product/${p.id}`}><ProductCard product={p} /></a>
            ))}
          </div>
        </section>
      </main>

      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} productName={product.name} />}
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ProductPage;
