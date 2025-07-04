import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Category } from "@/types/category";
interface CategoryCardProps {
  category: Category;
}
export function CategoryCard({ category }: CategoryCardProps) {
  const categoryUrl = `/products?category=${category._id}`;
  return (
    <Link href={categoryUrl} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-video relative w-full">
          <Image
            src={category.image ?? "/placeholder.png"} 
            alt={`Image for ${category.name} category`}
            fill
            sizes="500px"
            className="object-cover"
          />
          {}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white tracking-wider">
              {category.name}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}