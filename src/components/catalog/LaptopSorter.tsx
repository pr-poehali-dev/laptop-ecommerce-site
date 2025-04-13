import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpZA, CircleDollarSign } from "lucide-react";

interface LaptopSorterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LaptopSorter({ value, onChange }: LaptopSorterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Сортировать по" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">По популярности</SelectItem>
        <SelectItem value="price-asc">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4" />
            По возрастанию цены
          </div>
        </SelectItem>
        <SelectItem value="price-desc">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4" />
            По убыванию цены
          </div>
        </SelectItem>
        <SelectItem value="name-asc">
          <div className="flex items-center gap-2">
            <ArrowDownAZ className="h-4 w-4" />
            По названию (А-Я)
          </div>
        </SelectItem>
        <SelectItem value="name-desc">
          <div className="flex items-center gap-2">
            <ArrowUpZA className="h-4 w-4" />
            По названию (Я-А)
          </div>
        </SelectItem>
        <SelectItem value="rating">По рейтингу</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LaptopSorter;