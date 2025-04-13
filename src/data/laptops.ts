import { Laptop, Review } from "@/types/laptop";

export const laptops: Laptop[] = [
  {
    id: "1",
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    image: "/placeholder.svg",
    price: 129990,
    cpu: "Intel Core i7-1165G7",
    ram: "16 ГБ",
    storage: "512 ГБ SSD",
    display: "14.0\" (1920x1080) IPS",
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro",
    weight: "1.13 кг",
    battery: "57 Втч",
    ports: ["2x Thunderbolt 4", "2x USB-A", "HDMI", "3.5mm аудио"],
    rating: 4.8,
    reviewCount: 124,
    inStock: true
  },
  {
    id: "2",
    name: "MacBook Pro 14",
    brand: "Apple",
    image: "/placeholder.svg",
    price: 189990,
    cpu: "Apple M1 Pro",
    ram: "16 ГБ",
    storage: "512 ГБ SSD",
    display: "14.2\" (3024x1964) Liquid Retina XDR",
    gpu: "14-ядерный GPU",
    os: "macOS",
    weight: "1.6 кг",
    battery: "70 Втч",
    ports: ["3x Thunderbolt 4", "HDMI", "SDXC", "MagSafe 3", "3.5mm аудио"],
    rating: 4.9,
    reviewCount: 235,
    inStock: true
  },
  {
    id: "3",
    name: "XPS 13 Plus",
    brand: "Dell",
    image: "/placeholder.svg",
    price: 159990,
    cpu: "Intel Core i7-1260P",
    ram: "16 ГБ",
    storage: "1 TБ SSD",
    display: "13.4\" (3840x2400) OLED Touch",
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Home",
    weight: "1.24 кг",
    battery: "55 Втч",
    ports: ["2x Thunderbolt 4"],
    rating: 4.6,
    reviewCount: 87,
    inStock: true
  },
  {
    id: "4",
    name: "ROG Zephyrus G14",
    brand: "ASUS",
    image: "/placeholder.svg",
    price: 149990,
    cpu: "AMD Ryzen 9 6900HS",
    ram: "32 ГБ",
    storage: "1 TБ SSD",
    display: "14.0\" (2560x1600) IPS 120Hz",
    gpu: "NVIDIA GeForce RTX 3060",
    os: "Windows 11 Home",
    weight: "1.65 кг",
    battery: "76 Втч",
    ports: ["2x USB-C", "2x USB-A", "HDMI", "3.5mm аудио"],
    rating: 4.7,
    reviewCount: 156,
    inStock: false
  },
  {
    id: "5",
    name: "Surface Laptop 5",
    brand: "Microsoft",
    image: "/placeholder.svg",
    price: 114990,
    cpu: "Intel Core i5-1235U",
    ram: "8 ГБ",
    storage: "256 ГБ SSD",
    display: "13.5\" (2256x1504) Touch",
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Home",
    weight: "1.27 кг",
    battery: "47.4 Втч",
    ports: ["1x USB-C", "1x USB-A", "Surface Connect", "3.5mm аудио"],
    rating: 4.5,
    reviewCount: 68,
    inStock: true
  }
];

export const reviews: Review[] = [
  {
    id: "101",
    laptopId: "1",
    userName: "Александр П.",
    rating: 5,
    comment: "Отличный ноутбук для работы, легкий и производительный. Батарея держит весь рабочий день.",
    date: "2023-06-15"
  },
  {
    id: "102",
    laptopId: "1",
    userName: "Елена К.",
    rating: 4,
    comment: "Хороший ноутбук, но немного дороговат для своих характеристик.",
    date: "2023-07-22"
  },
  {
    id: "201",
    laptopId: "2",
    userName: "Максим С.",
    rating: 5,
    comment: "MacBook Pro с чипом M1 Pro - невероятно мощный! Работает без нагрева и шума.",
    date: "2023-05-30"
  },
  {
    id: "301",
    laptopId: "3",
    userName: "Ирина В.",
    rating: 5,
    comment: "Шикарный дисплей и очень компактный. Идеально подходит для поездок.",
    date: "2023-08-10"
  },
  {
    id: "401",
    laptopId: "4",
    userName: "Дмитрий Л.",
    rating: 4,
    comment: "Мощная игровая машина в компактном корпусе. Немного шумит под нагрузкой.",
    date: "2023-04-18"
  }
];

export const getLaptopById = (id: string): Laptop | undefined => {
  return laptops.find(laptop => laptop.id === id);
};

export const getReviewsByLaptopId = (laptopId: string): Review[] => {
  return reviews.filter(review => review.laptopId === laptopId);
};
