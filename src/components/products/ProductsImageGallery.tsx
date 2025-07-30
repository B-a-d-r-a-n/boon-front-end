"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images?.[0] ?? "");

  if (!images || images.length === 0) {
    return (
      <Card className="aspect-square w-full flex items-center justify-center bg-secondary">
        <p className="text-muted-foreground">No Image</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square relative w-full">
            <Image
              src={mainImage}
              alt={`Main image of ${productName}`}
              fill
              sizes="500px"
              className="object-cover transition-opacity duration-300"
              priority
            />
          </div>
        </CardContent>
      </Card>

      {images.length > 1 && (
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 basis-1/4 md:basis-1/5">
                <div
                  className={cn(
                    "aspect-square relative w-full rounded-md overflow-hidden cursor-pointer opacity-60 transition-opacity hover:opacity-100",
                    {
                      "opacity-100 ring-2 ring-primary ring-offset-2":
                        mainImage === image,
                    }
                  )}
                  onClick={() => setMainImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1} of ${productName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      )}
    </div>
  );
}
