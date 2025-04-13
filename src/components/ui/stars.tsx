import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarsProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export function Stars({ rating, max = 5, size = 16, className }: StarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star 
          key={`full-${i}`} 
          className="text-yellow-500 fill-yellow-500" 
          size={size} 
        />
      ))}
      
      {hasHalfStar && (
        <StarHalf 
          className="text-yellow-500 fill-yellow-500" 
          size={size} 
        />
      )}
      
      {Array.from({ length: max - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star 
          key={`empty-${i}`} 
          className="text-muted-foreground" 
          size={size} 
        />
      ))}
    </div>
  );
}

export default Stars;