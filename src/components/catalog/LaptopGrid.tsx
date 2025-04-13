import { Laptop } from "@/types/laptop";
import LaptopCard from "@/components/LaptopCard";

interface LaptopGridProps {
  laptops: Laptop[];
  onAddToCart?: (laptop: Laptop) => void;
}

export function LaptopGrid({ laptops, onAddToCart }: LaptopGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {laptops.map((laptop) => (
        <LaptopCard 
          key={laptop.id} 
          laptop={laptop} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
}

export default LaptopGrid;