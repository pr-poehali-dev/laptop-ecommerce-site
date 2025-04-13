import { useState } from "react";
import { useParams } from "react-router-dom";
import { getLaptopById, getReviewsByLaptopId } from "@/data/laptops";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Импортируем рефакторинговые компоненты
import LaptopHeader from "@/components/laptop-detail/LaptopHeader";
import LaptopGallery from "@/components/laptop-detail/LaptopGallery";
import LaptopSummary from "@/components/laptop-detail/LaptopSummary";
import LaptopPurchase from "@/components/laptop-detail/LaptopPurchase";
import LaptopSpecifications from "@/components/laptop-detail/LaptopSpecifications";
import LaptopReviews from "@/components/laptop-detail/LaptopReviews";
import LaptopNotFound from "@/components/laptop-detail/LaptopNotFound";

export function LaptopDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("specs");
  
  if (!id) {
    return <LaptopNotFound />;
  }
  
  const laptop = getLaptopById(id);
  
  if (!laptop) {
    return <LaptopNotFound />;
  }
  
  const reviews = getReviewsByLaptopId(id);
  
  return (
    <PageLayout>
      <div className="container py-8">
        <LaptopHeader laptop={laptop} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LaptopGallery laptop={laptop} />
          <LaptopSummary laptop={laptop} />
          <LaptopPurchase laptop={laptop} />
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="specs" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs">
              <LaptopSpecifications laptop={laptop} />
            </TabsContent>
            
            <TabsContent value="reviews">
              <LaptopReviews reviews={reviews} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}

export default LaptopDetail;