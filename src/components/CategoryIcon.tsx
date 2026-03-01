interface CategoryIconProps {
  icon: string;
  className?: string;
}

const icons: Record<string, (cls: string) => JSX.Element> = {
  dress: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2l3 6v14h6V8l3-6" /><path d="M9 8h6" /><path d="M6 2h12" />
    </svg>
  ),
  jacket: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l2-2h12l2 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /><path d="M12 2v6" /><path d="M8 8h8" /><path d="M4 12h4" /><path d="M16 12h4" />
    </svg>
  ),
  "baby-shirt": (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l3 4v2h-3v14H8V8H5V6l3-4z" /><path d="M10 2a2 2 0 004 0" />
    </svg>
  ),
  heel: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18h20v2H2z" /><path d="M4 18l2-8h4l6 3h4l2 5" /><path d="M16 13v5" />
    </svg>
  ),
  shoe: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16h20v3H2z" /><path d="M4 16l2-6h3l2 2h5l4 4" /><path d="M6 10l1-4" />
    </svg>
  ),
  "baby-shoe": (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 16h18v3H3z" /><path d="M5 16c0-4 3-8 7-8s7 4 7 8" /><circle cx="10" cy="12" r="1" /><circle cx="14" cy="12" r="1" />
    </svg>
  ),
  lingerie: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4c2 5 4 7 8 7s6-2 8-7" /><path d="M12 11v6" /><path d="M8 17h8" /><path d="M4 4l2 13h12l2-13" />
    </svg>
  ),
  cosmetics: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="8" width="10" height="14" rx="2" /><path d="M10 8V4h4v4" /><path d="M12 2v2" /><path d="M7 14h10" />
    </svg>
  ),
  perfume: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="8" width="12" height="14" rx="2" /><path d="M10 8V5h4v3" /><path d="M12 2v3" /><path d="M9 2h6" /><path d="M6 14h12" />
    </svg>
  ),
  bag: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="14" rx="2" /><path d="M8 8V6a4 4 0 018 0v2" />
    </svg>
  ),
  home: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" /><path d="M9 21V12h6v9" />
    </svg>
  ),
  plate: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="9" ry="5" /><path d="M3 14V10" /><path d="M21 14V10" /><path d="M12 9v-4" />
    </svg>
  ),
  kitchen: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v6a4 4 0 008 0V2" /><path d="M12 12v10" /><path d="M18 2v4c0 1.5-1 3-3 3" />
    </svg>
  ),
  chip: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
    </svg>
  ),
  appliance: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M4 14h16" /><circle cx="12" cy="8" r="3" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" />
    </svg>
  ),
  toy: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="6" /><path d="M12 16v4" /><path d="M8 22h8" /><circle cx="10" cy="9" r="1" /><circle cx="14" cy="9" r="1" /><path d="M10 12h4" />
    </svg>
  ),
  earring: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="3" /><path d="M12 9v3" /><path d="M9 15a3 3 0 006 0" /><circle cx="12" cy="19" r="2" />
    </svg>
  ),
  car: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14v-5l-2-5H7L5 12v5z" /><circle cx="8" cy="17" r="2" /><circle cx="16" cy="17" r="2" /><path d="M5 12h14" />
    </svg>
  ),
  pen: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2 7h-4l2-7z" /><rect x="10" y="9" width="4" height="11" rx="1" /><path d="M12 20v2" />
    </svg>
  ),
  leaf: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21c0-8 4-14 12-14 0 8-4 14-12 14z" /><path d="M6 21C8 14 12 10 18 7" />
    </svg>
  ),
  dumbbell: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7v10" /><path d="M18 7v10" /><path d="M3 9v6" /><path d="M21 9v6" /><path d="M6 12h12" />
    </svg>
  ),
  hook: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8" /><path d="M12 10c0 4-3 6-3 9a3 3 0 006 0c0-3-3-5-3-9z" />
    </svg>
  ),
  vest: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12l2 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6l2-4z" /><path d="M12 2v20" /><path d="M6 8h4" /><path d="M14 8h4" />
    </svg>
  ),
  fabric: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
    </svg>
  ),
  gift: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="14" rx="1" /><path d="M12 8v14" /><rect x="2" y="5" width="20" height="3" rx="1" /><path d="M12 5c-2-3-5-3-5 0s5 3 5 0" /><path d="M12 5c2-3 5-3 5 0s-5 3-5 0" />
    </svg>
  ),
  giftbox: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="14" rx="2" /><path d="M12 8v14" /><path d="M3 12h18" /><rect x="4" y="5" width="16" height="3" rx="1" />
    </svg>
  ),
  misc: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="3" /><rect x="14" y="4" width="6" height="6" rx="1" /><path d="M7 14l3 8H4l3-8z" /><circle cx="17" cy="18" r="3" />
    </svg>
  ),
  star: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7l3-7z" />
    </svg>
  ),
  nail: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2h6v8a3 3 0 01-6 0V2z" /><path d="M12 10v12" /><path d="M9 18h6" />
    </svg>
  ),
  phone: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" />
    </svg>
  ),
  hairpin: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v14a4 4 0 008 0V2" /><path d="M8 10h8" />
    </svg>
  ),
  scissors: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.12 8.12L20 20" /><path d="M20 4L8.12 15.88" />
    </svg>
  ),
  tree: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L6 10h3l-3 6h3l-3 6h12l-3-6h3l-3-6h3L12 2z" /><path d="M11 22h2v-2h-2z" />
    </svg>
  ),
  fur: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12l2 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8l2-6z" /><path d="M12 2v5" /><path d="M4 10h16" /><path d="M8 14c0 2 2 4 4 4s4-2 4-4" />
    </svg>
  ),
  grid: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  "jacket-w": (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h14l2 5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8l2-5z" /><path d="M12 3v19" /><path d="M5 10h6" /><path d="M13 10h6" />
    </svg>
  ),
  hygiene: (c) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 014 4v3H8V6a4 4 0 014-4z" /><rect x="6" y="9" width="12" height="13" rx="2" /><path d="M12 13v4" />
    </svg>
  ),
};

const CategoryIcon = ({ icon, className = "w-5 h-5" }: CategoryIconProps) => {
  const renderIcon = icons[icon];
  if (!renderIcon) {
    return icons.grid(className);
  }
  return renderIcon(className);
};

export default CategoryIcon;
