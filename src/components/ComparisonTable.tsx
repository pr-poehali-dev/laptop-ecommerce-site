import { Laptop } from "@/types/laptop";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/formatters";
import Stars from "@/components/ui/stars";

interface ComparisonTableProps {
  laptops: Laptop[];
  onRemove: (id: string) => void;
}

export function ComparisonTable({ laptops, onRemove }: ComparisonTableProps) {
  if (laptops.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="mb-2 text-lg font-medium">Нет ноутбуков для сравнения</h3>
        <p className="text-muted-foreground">
          Добавьте ноутбуки из каталога для сравнения характеристик
        </p>
      </div>
    );
  }

  const specs = [
    { name: "Бренд", key: "brand" },
    { name: "Цена", key: "price", format: (value: number) => formatPrice(value) },
    { name: "Процессор", key: "cpu" },
    { name: "Оперативная память", key: "ram" },
    { name: "Накопитель", key: "storage" },
    { name: "Дисплей", key: "display" },
    { name: "Видеокарта", key: "gpu" },
    { name: "Операционная система", key: "os" },
    { name: "Вес", key: "weight" },
    { name: "Батарея", key: "battery" },
    { name: "Рейтинг", key: "rating", format: (value: number) => (
      <div className="flex items-center gap-2">
        <Stars rating={value} size={16} />
        <span>{value.toFixed(1)}</span>
      </div>
    )},
  ];

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Характеристики</TableHead>
            {laptops.map((laptop) => (
              <TableHead key={laptop.id} className="min-w-[250px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{laptop.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(laptop.id)}
                      className="h-7 w-7"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="h-32 w-full object-contain"
                  />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {specs.map((spec) => (
            <TableRow key={spec.key}>
              <TableCell className="font-medium">{spec.name}</TableCell>
              {laptops.map((laptop) => (
                <TableCell key={`${laptop.id}-${spec.key}`}>
                  {spec.format 
                    ? spec.format(laptop[spec.key as keyof Laptop] as never)
                    : laptop[spec.key as keyof Laptop] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ComparisonTable;