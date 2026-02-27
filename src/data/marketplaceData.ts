import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import seller1 from "@/assets/cheepy/seller-1.jpg";
import seller2 from "@/assets/cheepy/seller-2.jpg";
import seller3 from "@/assets/cheepy/seller-3.jpg";
import seller4 from "@/assets/cheepy/seller-4.jpg";
import promo1 from "@/assets/cheepy/promo-1.jpg";
import promo2 from "@/assets/cheepy/promo-2.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const productImages = [product1, product2, product3, product4, product5, product6];

export interface CategoryCard {
  slug: string;
  name: string;
  count: number;
  image: string;
}

export const popularCategories: CategoryCard[] = [
  { slug: "verkhnyaya-odezhda", name: "Верхняя одежда", count: 1240, image: hero1 },
  { slug: "obuv", name: "Обувь", count: 890, image: product3 },
  { slug: "sumki", name: "Сумки и рюкзаки", count: 560, image: product4 },
  { slug: "platya", name: "Платья", count: 720, image: hero2 },
  { slug: "sportivnaya", name: "Спортивная одежда", count: 430, image: product5 },
  { slug: "aksessuary", name: "Аксессуары", count: 980, image: product6 },
];

export interface HotDeal {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  endsAt: number; // timestamp
}

export const hotDeals: HotDeal[] = [
  { id: 101, name: "Куртка демисезонная", price: 3990, oldPrice: 7990, image: product1, endsAt: Date.now() + 3 * 3600 * 1000 },
  { id: 102, name: "Кроссовки Air Max", price: 5490, oldPrice: 10990, image: product2, endsAt: Date.now() + 5 * 3600 * 1000 },
  { id: 103, name: "Платье вечернее", price: 4990, oldPrice: 12990, image: product3, endsAt: Date.now() + 2 * 3600 * 1000 },
  { id: 104, name: "Рюкзак кожаный", price: 2490, oldPrice: 4990, image: product4, endsAt: Date.now() + 8 * 3600 * 1000 },
  { id: 105, name: "Свитшот оверсайз", price: 1990, oldPrice: 3990, image: product5, endsAt: Date.now() + 1 * 3600 * 1000 },
  { id: 106, name: "Пальто шерстяное", price: 8990, oldPrice: 15990, image: product6, endsAt: Date.now() + 6 * 3600 * 1000 },
  { id: 107, name: "Бомбер фиолетовый", price: 4290, oldPrice: 8990, image: product1, endsAt: Date.now() + 4 * 3600 * 1000 },
  { id: 108, name: "Джинсы slim fit", price: 2990, oldPrice: 5990, image: product2, endsAt: Date.now() + 7 * 3600 * 1000 },
];

export interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  endsAt: number;
  size: "large" | "small";
}

export const promotions: Promotion[] = [
  { id: 1, title: "Летняя распродажа до -70%", subtitle: "На более чем 5000 товаров", image: promo1, cta: "Смотреть", endsAt: Date.now() + 48 * 3600 * 1000, size: "large" },
  { id: 2, title: "Новая коллекция SS'25", subtitle: "Уже в каталоге", image: promo2, cta: "Открыть", endsAt: Date.now() + 72 * 3600 * 1000, size: "small" },
  { id: 3, title: "Скидка 15% на первый заказ", subtitle: "По промокоду WELCOME", image: hero2, cta: "Получить", endsAt: Date.now() + 24 * 3600 * 1000, size: "small" },
];

export interface BestsellProduct {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  seller: string;
  sold: number;
}

export const bestsellers: BestsellProduct[] = Array.from({ length: 8 }, (_, i) => ({
  id: 200 + i,
  name: ["Худи оверсайз", "Кроссовки беговые", "Футболка базовая", "Джинсы slim", "Сумка тоут", "Свитшот хлопковый", "Поло классическое", "Ботинки челси"][i],
  price: [4990, 8990, 1290, 5990, 4290, 2990, 3290, 9990][i],
  oldPrice: [6990, undefined, 1990, undefined, 5990, 4290, undefined, 13990][i] as number | undefined,
  image: productImages[i % 6],
  images: [productImages[i % 6], productImages[(i + 1) % 6], productImages[(i + 2) % 6]],
  rating: [4.9, 4.8, 4.7, 4.6, 4.8, 4.5, 4.7, 4.9][i],
  reviews: [523, 312, 890, 245, 178, 456, 134, 367][i],
  seller: ["Fashion Hub", "SportStyle", "ComfortWear", "DenimPro", "UrbanBag", "Casual Co", "Classic Shop", "StreetWear"][i],
  sold: [1523, 1312, 2890, 845, 678, 1456, 534, 967][i],
}));

export interface TrendProduct {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  seller: string;
  span: "tall" | "wide" | "normal";
}

export const trendingProducts: TrendProduct[] = [
  { id: 300, name: "Тренч бежевый", price: 12990, oldPrice: 18990, image: product1, images: [product1, product2, product3], rating: 4.9, reviews: 234, seller: "Fashion Hub", span: "tall" },
  { id: 301, name: "Кеды белые", price: 6990, image: product2, images: [product2, product3, product4], rating: 4.7, reviews: 567, seller: "SportStyle", span: "normal" },
  { id: 302, name: "Платье миди", price: 7990, oldPrice: 11990, image: product3, images: [product3, product4, product5], rating: 4.8, reviews: 345, seller: "Glamour Shop", span: "normal" },
  { id: 303, name: "Рюкзак городской", price: 3490, image: product4, images: [product4, product5, product6], rating: 4.6, reviews: 189, seller: "UrbanBag", span: "wide" },
  { id: 304, name: "Пуховик зимний", price: 15990, oldPrice: 22990, image: product5, images: [product5, product6, product1], rating: 4.9, reviews: 412, seller: "Fashion Hub", span: "normal" },
  { id: 305, name: "Лоферы замшевые", price: 8990, image: product6, images: [product6, product1, product2], rating: 4.8, reviews: 278, seller: "Classic Shop", span: "tall" },
];

export interface CustomerReview {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  productName: string;
  productId: number;
}

export const customerReviews: CustomerReview[] = [
  { id: 1, name: "Мария К.", avatar: "М", rating: 5, text: "Отличное качество ткани! Заказывала худи — пришло точно как на фото. Буду заказывать ещё.", date: "2025-02-20", productName: "Худи оверсайз", productId: 200 },
  { id: 2, name: "Дмитрий С.", avatar: "Д", rating: 5, text: "Кроссовки сели идеально. Доставка за 2 дня в Москву. Рекомендую этот магазин!", date: "2025-02-18", productName: "Кроссовки беговые", productId: 201 },
  { id: 3, name: "Анна П.", avatar: "А", rating: 4, text: "Платье красивое, но размер чуть больше, чем ожидала. В остальном всё супер.", date: "2025-02-15", productName: "Платье вечернее", productId: 103 },
  { id: 4, name: "Алексей В.", avatar: "А", rating: 5, text: "Пальто шикарное! Шерсть натуральная, сидит как влитое. Цена-качество на высоте.", date: "2025-02-12", productName: "Пальто шерстяное", productId: 106 },
  { id: 5, name: "Елена Р.", avatar: "Е", rating: 5, text: "Уже третий заказ на Cheepy — ни разу не разочаровалась. Сумка просто 🔥", date: "2025-02-10", productName: "Сумка тоут", productId: 204 },
  { id: 6, name: "Игорь М.", avatar: "И", rating: 4, text: "Хорошие джинсы, но доставка заняла 5 дней. Качество отличное.", date: "2025-02-08", productName: "Джинсы slim fit", productId: 203 },
];

export interface BrandData {
  slug: string;
  name: string;
  logo: string;
  description: string;
  history: string;
  advantages: string[];
  certificates: string[];
  productCount: number;
  seoText: string;
  whyChoose: { icon: string; title: string; text: string }[];
}

export const brandsData: BrandData[] = [
  {
    slug: "nike",
    name: "Nike",
    logo: "nike",
    description: "Мировой лидер в производстве спортивной одежды и обуви",
    history: "Nike, Inc. — американская транснациональная корпорация, занимающаяся разработкой, производством, маркетингом и продажей обуви, одежды, оборудования, аксессуаров и услуг. Компания была основана в 1964 году как Blue Ribbon Sports и стала Nike в 1978 году. С тех пор бренд стал символом инноваций в спорте и моде.",
    advantages: ["Инновационные технологии", "Экологичное производство", "Глобальная гарантия"],
    certificates: ["ISO 9001", "OEKO-TEX", "bluesign"],
    productCount: 342,
    seoText: "Nike на Cheepy — это широкий ассортимент оригинальной спортивной одежды и обуви от мирового бренда. В нашем каталоге представлены кроссовки Nike Air Max, Air Force, Dunk, а также спортивная одежда для бега, тренировок и повседневной носки. Все товары сертифицированы и доставляются напрямую от официальных поставщиков. Покупайте Nike на Cheepy с гарантией подлинности и быстрой доставкой по всей России.",
    whyChoose: [
      { icon: "shield", title: "100% оригинал", text: "Прямые поставки от бренда" },
      { icon: "truck", title: "Быстрая доставка", text: "1-3 дня по всей России" },
      { icon: "rotate", title: "Гарантия возврата", text: "14 дней на возврат" },
      { icon: "star", title: "Лучшие цены", text: "Скидки до 50% на коллекции" },
    ],
  },
  {
    slug: "zara",
    name: "Zara",
    logo: "zara",
    description: "Испанский бренд быстрой моды с мировым именем",
    history: "Zara — испанская компания по производству одежды, основанная в 1975 году Амансио Ортегой. Zara является флагманским брендом группы Inditex. Бренд известен своей способностью быстро адаптировать модные тенденции с подиумов для массового рынка.",
    advantages: ["Быстрая мода", "Устойчивое развитие", "Тренды с подиумов"],
    certificates: ["Join Life", "OEKO-TEX"],
    productCount: 567,
    seoText: "Zara на Cheepy — коллекции женской, мужской и детской одежды от одного из самых популярных мировых брендов. Актуальные тренды каждого сезона, качественные материалы и доступные цены. Доставка по всей России, удобный возврат.",
    whyChoose: [
      { icon: "shield", title: "Оригинал", text: "Сертифицированные товары" },
      { icon: "truck", title: "Доставка", text: "Бесплатно от 3000 ₽" },
      { icon: "rotate", title: "Возврат", text: "Легкий возврат за 14 дней" },
      { icon: "star", title: "Тренды", text: "Новинки каждую неделю" },
    ],
  },
  {
    slug: "adidas",
    name: "Adidas",
    logo: "adidas",
    description: "Немецкий бренд спортивной одежды и обуви",
    history: "Adidas — немецкая транснациональная корпорация, специализирующаяся на производстве спортивной одежды и обуви. Основана в 1949 году Адольфом Дасслером. Три полоски Adidas стали одним из самых узнаваемых логотипов в мире спорта и моды.",
    advantages: ["Немецкое качество", "Инновации в спорте", "Экологичные материалы"],
    certificates: ["ISO 9001", "OEKO-TEX"],
    productCount: 428,
    seoText: "Adidas на Cheepy — коллекции спортивной одежды и обуви для спорта и повседневной жизни. Оригинальные кроссовки, спортивные костюмы и аксессуары с доставкой по России.",
    whyChoose: [
      { icon: "shield", title: "Оригинал", text: "100% подлинность" },
      { icon: "truck", title: "Доставка", text: "Быстрая доставка" },
      { icon: "rotate", title: "Возврат", text: "14 дней гарантия" },
      { icon: "star", title: "Качество", text: "Немецкие стандарты" },
    ],
  },
  {
    slug: "hm",
    name: "H&M",
    logo: "handm",
    description: "Шведская сеть магазинов модной одежды",
    history: "H&M (Hennes & Mauritz) — шведская компания, основанная в 1947 году. Бренд предлагает модную одежду и аксессуары по доступным ценам для мужчин, женщин и детей.",
    advantages: ["Доступные цены", "Модные коллекции", "Устойчивое развитие"],
    certificates: ["Conscious Collection", "OEKO-TEX"],
    productCount: 892,
    seoText: "H&M на Cheepy — модная одежда для всей семьи по доступным ценам. Новые коллекции каждый сезон, качественные материалы и быстрая доставка.",
    whyChoose: [
      { icon: "shield", title: "Качество", text: "Проверенный бренд" },
      { icon: "truck", title: "Доставка", text: "По всей России" },
      { icon: "rotate", title: "Возврат", text: "Простой возврат" },
      { icon: "star", title: "Цены", text: "Доступно для всех" },
    ],
  },
  {
    slug: "mango",
    name: "Mango",
    logo: "mango",
    description: "Испанский бренд современной женской одежды",
    history: "Mango — испанская компания, основанная в 1984 году в Барселоне. Специализируется на дизайне, производстве и продаже женской, мужской и детской одежды и аксессуаров.",
    advantages: ["Европейский дизайн", "Качественные ткани", "Актуальные тренды"],
    certificates: ["Committed Collection", "OEKO-TEX"],
    productCount: 634,
    seoText: "Mango на Cheepy — стильная женская одежда европейского качества. Платья, блузки, брюки и аксессуары с доставкой по России.",
    whyChoose: [
      { icon: "shield", title: "Качество", text: "Европейские стандарты" },
      { icon: "truck", title: "Доставка", text: "Быстро и надёжно" },
      { icon: "rotate", title: "Возврат", text: "14 дней" },
      { icon: "star", title: "Стиль", text: "Современный дизайн" },
    ],
  },
  {
    slug: "uniqlo",
    name: "Uniqlo",
    logo: "uniqlo",
    description: "Японский бренд качественной базовой одежды",
    history: "Uniqlo — японская компания розничной торговли одеждой, основанная в 1949 году. Известна своими инновационными технологиями в производстве базовой одежды и аксессуаров.",
    advantages: ["Инновационные ткани", "Японское качество", "Функциональность"],
    certificates: ["HeatTech", "AIRism", "OEKO-TEX"],
    productCount: 512,
    seoText: "Uniqlo на Cheepy — качественная базовая одежда с инновационными технологиями от японского бренда. Доставка по России.",
    whyChoose: [
      { icon: "shield", title: "Технологии", text: "HeatTech, AIRism" },
      { icon: "truck", title: "Доставка", text: "По всей России" },
      { icon: "rotate", title: "Возврат", text: "Легкий возврат" },
      { icon: "star", title: "Качество", text: "Японские стандарты" },
    ],
  },
];

export interface SellerData {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  registeredAt: string;
  positivePercent: number;
  responseTime: string;
  completedOrders: number;
  about: string;
  contacts: { type: string; value: string }[];
  reviews: { id: number; author: string; rating: number; text: string; date: string }[];
}

export const sellersData: SellerData[] = [
  {
    id: "fashion-hub",
    name: "Fashion Hub",
    avatar: seller1,
    rating: 4.9,
    reviewCount: 1245,
    productCount: 342,
    registeredAt: "2022-03-15",
    positivePercent: 97,
    responseTime: "< 1 часа",
    completedOrders: 8934,
    about: "Fashion Hub — ваш надёжный партнёр в мире моды. Мы работаем напрямую с производителями и предлагаем только оригинальную продукцию. Наша команда тщательно отбирает каждый товар, чтобы вы получали только лучшее. За 3 года работы на площадке мы обслужили более 8000 клиентов и поддерживаем рейтинг 4.9 из 5.",
    contacts: [{ type: "email", value: "info@fashionhub.ru" }],
    reviews: [
      { id: 1, author: "Мария", rating: 5, text: "Отличный магазин! Всегда быстрая доставка и качественные товары.", date: "2025-02-20" },
      { id: 2, author: "Алексей", rating: 5, text: "Заказываю регулярно, ни разу не подвели. Рекомендую!", date: "2025-02-18" },
      { id: 3, author: "Ольга", rating: 4, text: "Хороший ассортимент, но хотелось бы больше размеров.", date: "2025-02-15" },
    ],
  },
  {
    id: "sportstyle",
    name: "SportStyle",
    avatar: seller2,
    rating: 4.8,
    reviewCount: 890,
    productCount: 215,
    registeredAt: "2023-01-10",
    positivePercent: 95,
    responseTime: "< 2 часов",
    completedOrders: 5672,
    about: "SportStyle специализируется на спортивной одежде и обуви. Мы предлагаем широкий ассортимент от ведущих мировых брендов по конкурентным ценам.",
    contacts: [{ type: "email", value: "hello@sportstyle.ru" }],
    reviews: [
      { id: 1, author: "Дмитрий", rating: 5, text: "Кроссовки оригинальные, цена ниже чем в оффлайне.", date: "2025-02-19" },
      { id: 2, author: "Анна", rating: 4, text: "Всё хорошо, но упаковка могла быть лучше.", date: "2025-02-16" },
    ],
  },
];
