"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
interface FilterControlsProps {
  categories: Category[];
  brands: Brand[];
  priceRange: {
    min: number;
    max: number;
  };
}
export function FilterControls({
  categories,
  brands,
  priceRange: serverPriceRange,
}: FilterControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localPrice, setLocalPrice] = useState<[number, number]>([
    Number(searchParams.get("price[gte]") || serverPriceRange.min),
    Number(searchParams.get("price[lte]") || serverPriceRange.max),
  ]);
  console.log(localPrice);
  const handleFilterChange = (
    type: "sort" | "category" | "brand" | "price",
    value: string | [number, number]
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); 
    if (type === "price") {
      const [min, max] = value as [number, number];
      params.set("price[gte]", String(min));
      params.set("price[lte]", String(max));
    } else if (type === "sort") {
      params.set(type, value as string);
    } else {
      const currentValues = params.get(type)?.split(",") || [];
      const index = currentValues.indexOf(value as string);
      if (index === -1) {
        currentValues.push(value as string);
      } else {
        currentValues.splice(index, 1);
      }
      if (currentValues.length === 0) {
        params.delete(type);
      } else {
        params.set(type, currentValues.join(","));
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };
  useEffect(() => {
    const gte = Number(searchParams.get("price[gte]") || serverPriceRange.min);
    const lte = Number(searchParams.get("price[lte]") || serverPriceRange.max);
    setLocalPrice([gte, lte]);
  }, [searchParams, serverPriceRange]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["price"]} className="w-full">
        {}
        <AccordionItem value="sort">
          <AccordionTrigger className="text-base font-medium">
            Sort By
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Select
              onValueChange={(value) => handleFilterChange("sort", value)}
              defaultValue={searchParams.get("sort") || "-createdAt"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-createdAt">Newest</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="-price">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A-Z</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        {}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-4">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category._id}`}
                    checked={
                      searchParams.get("category")?.includes(category._id) ??
                      false
                    }
                    onCheckedChange={() =>
                      handleFilterChange("category", category._id)
                    }
                  />
                  <Label
                    htmlFor={`cat-${category._id}`}
                    className="cursor-pointer font-normal"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-base font-medium">
            Brands
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-4">
              {brands.map((brand) => (
                <div key={brand._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand._id}`}
                    checked={
                      searchParams.get("brand")?.includes(brand._id) ?? false
                    }
                    onCheckedChange={() =>
                      handleFilterChange("brand", brand._id)
                    }
                  />
                  <Label
                    htmlFor={`brand-${brand._id}`}
                    className="cursor-pointer font-normal"
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {}
        {}
      </Accordion>
    </div>
  );
}