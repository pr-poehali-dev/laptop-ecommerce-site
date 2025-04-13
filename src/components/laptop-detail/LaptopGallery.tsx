import { Laptop } from "@/types/laptop";

interface LaptopGalleryProps {
  laptop: Laptop;
}

export function LaptopGallery({ laptop }: LaptopGalleryProps) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
      <img
        src={laptop.image}
        alt={laptop.name}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default LaptopGallery;