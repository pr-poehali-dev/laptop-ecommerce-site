import Stars from "@/components/ui/stars";
import { Review } from "@/types/laptop";

interface LaptopReviewsProps {
  reviews: Review[];
}

export function LaptopReviews({ reviews }: LaptopReviewsProps) {
  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{review.userName}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString("ru-RU")}
              </div>
            </div>
            <Stars rating={review.rating} size={16} className="mb-2" />
            <p className="text-sm">{review.comment}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Нет отзывов для этой модели</p>
        </div>
      )}
    </div>
  );
}

export default LaptopReviews;