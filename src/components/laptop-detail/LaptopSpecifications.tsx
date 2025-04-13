import { Laptop } from "@/types/laptop";

interface LaptopSpecificationsProps {
  laptop: Laptop;
}

export function LaptopSpecifications({ laptop }: LaptopSpecificationsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Процессор и память</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Процессор</span>
            <span className="font-medium">{laptop.cpu}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Оперативная память</span>
            <span className="font-medium">{laptop.ram}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Накопитель</span>
            <span className="font-medium">{laptop.storage}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Видеокарта</span>
            <span className="font-medium">{laptop.gpu}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Дисплей</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Дисплей</span>
            <span className="font-medium">{laptop.display}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Корпус и интерфейсы</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Вес</span>
            <span className="font-medium">{laptop.weight}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Батарея</span>
            <span className="font-medium">{laptop.battery}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Операционная система</span>
            <span className="font-medium">{laptop.os}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Порты</span>
            <span className="font-medium">{laptop.ports.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaptopSpecifications;