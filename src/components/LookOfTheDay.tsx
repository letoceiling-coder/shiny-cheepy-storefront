import { ShoppingCart } from "lucide-react";
import look1 from "@/assets/look-1.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product5 from "@/assets/product-5.jpg";
import product4 from "@/assets/product-4.jpg";

const lookItems = [
  { name: "Пиджак тёмно-синий", price: 8990, image: product2 },
  { name: "Футболка чёрная", price: 1490, image: product1 },
  { name: "Джинсы голубые", price: 4990, image: product5 },
  { name: "Ботинки чёрные", price: 7990, image: product4 },
];

const LookOfTheDay = () => {
  const totalPrice = lookItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-5">Лук дня</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main look image */}
        <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
          <img src={look1} alt="Look of the day" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-6">
            <p className="text-primary-foreground text-lg font-bold">Smart Casual</p>
            <p className="text-primary-foreground/80 text-sm">Идеальный образ на каждый день</p>
          </div>
        </div>

        {/* Look items */}
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            {lookItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors cursor-pointer">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-sm font-bold text-foreground">{item.price.toLocaleString()} ₽</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-secondary rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Весь образ</span>
              <span className="text-xl font-bold text-foreground">{totalPrice.toLocaleString()} ₽</span>
            </div>
            <button className="w-full gradient-primary text-primary-foreground py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <ShoppingCart className="w-4 h-4" />
              Купить образ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookOfTheDay;
