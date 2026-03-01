import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
  productId: number;
  productName: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Мария К.",
    date: "2025-02-20",
    rating: 5,
    comment: "Отличное качество ткани! Заказывала худи — пришло точно как на фото. Буду заказывать ещё.",
    productId: 200,
    productName: "Худи оверсайз",
  },
  {
    id: 2,
    author: "Дмитрий С.",
    date: "2025-02-18",
    rating: 5,
    comment: "Кроссовки сели идеально. Доставка за 2 дня в Москву. Рекомендую этот магазин!",
    productId: 201,
    productName: "Кроссовки беговые",
  },
  {
    id: 3,
    author: "Анна П.",
    date: "2025-02-15",
    rating: 4,
    comment: "Платье красивое, но размер чуть больше, чем ожидала. В остальном всё супер.",
    productId: 103,
    productName: "Платье вечернее",
  },
  {
    id: 4,
    author: "Алексей В.",
    date: "2025-02-12",
    rating: 5,
    comment: "Пальто шикарное! Шерсть натуральная, сидит как влитое. Цена-качество на высоте.",
    productId: 106,
    productName: "Пальто шерстяное",
  },
  {
    id: 5,
    author: "Елена Р.",
    date: "2025-02-10",
    rating: 5,
    comment: "Уже третий заказ на Cheepy — ни разу не разочаровалась. Сумка просто 🔥",
    productId: 204,
    productName: "Сумка тоут",
  },
  {
    id: 6,
    author: "Игорь М.",
    date: "2025-02-08",
    rating: 4,
    comment: "Хорошие джинсы, но доставка заняла 5 дней. Качество отличное.",
    productId: 203,
    productName: "Джинсы slim fit",
  },
];

const ReviewsSlider = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 356;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-bold text-foreground">ОТЗЫВЫ ПОКУПАТЕЛЕЙ</h2>
      </div>

      <div className="relative flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="shrink-0 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Назад"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto flex gap-4 py-2 no-scrollbar snap-x snap-mandatory"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="shrink-0 w-[340px] bg-card rounded-xl border border-border p-5 snap-start flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {getInitials(review.author)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-foreground flex-1 mb-3 line-clamp-3">
                {review.comment}
              </p>

              <Link
                to={`/product/${review.productId}`}
                className="text-xs text-primary hover:underline"
              >
                {review.productName}
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="shrink-0 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Вперёд"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ReviewsSlider;
