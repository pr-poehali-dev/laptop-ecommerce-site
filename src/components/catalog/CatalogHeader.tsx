import LaptopSorter from "@/components/catalog/LaptopSorter";

interface CatalogHeaderProps {
  count: number;
  sortOption: string;
  onSortChange: (value: string) => void;
}

export function CatalogHeader({ count, sortOption, onSortChange }: CatalogHeaderProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        Найдено: {count} моделей
      </div>
      
      <LaptopSorter value={sortOption} onChange={onSortChange} />
    </div>
  );
}

export default CatalogHeader;