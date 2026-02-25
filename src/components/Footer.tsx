import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const columns = [
    {
      title: "Покупателям",
      links: ["Как сделать заказ", "Способы оплаты", "Доставка", "Возврат товара", "Вопросы и ответы"],
    },
    {
      title: "Продавцам",
      links: ["Как начать продавать", "Правила площадки", "Комиссия", "Помощь продавцам"],
    },
    {
      title: "Компания",
      links: ["О нас", "Контакты", "Вакансии", "Блог"],
    },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold text-foreground mb-3">Cheepy</h3>
            <p className="text-sm text-muted-foreground mb-4">Маркетплейс модной одежды и аксессуаров</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Москва, Россия</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>8 (800) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@cheepy.ru</span>
              </div>
            </div>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-foreground mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 Cheepy. Все права защищены.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
