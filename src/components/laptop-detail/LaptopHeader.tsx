import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Stars from "@/components/ui/stars";
import { Laptop } from "@/types/laptop";

interface LaptopHeaderProps {
  laptop: Laptop;
}

export function LaptopHeader({ laptop }: LaptopHeaderProps) {
  return (
    <div className="mb-6">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/catalog" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Назад в каталог
        </Link>
      </Button>
      
      <h1 className="text-2xl md:text-3xl font-bold">{laptop.name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <Stars rating={laptop.rating} size={20} />
        <span className="text-sm text-muted-foreground">
          {laptop.rating.toFixed(1)} ({laptop.reviewCount} отзывов)
        </span>
      </div>
    </div>
  );
}

export default LaptopHeader;