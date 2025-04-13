import { Laptop } from "@/types/laptop";

/**
 * Получение уникальных брендов из списка ноутбуков
 */
export const getUniqueBrands = (laptops: Laptop[]): string[] => {
  return Array.from(new Set(laptops.map(laptop => laptop.brand)));
};

/**
 * Получение минимальной и максимальной цены из списка ноутбуков
 */
export const getPriceRange = (laptops: Laptop[]): [number, number] => {
  const prices = laptops.map(laptop => laptop.price);
  return [Math.min(...prices), Math.max(...prices)];
};
