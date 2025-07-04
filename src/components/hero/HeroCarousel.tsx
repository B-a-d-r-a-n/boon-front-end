"use client"; 
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Commercial } from "@/types/commercial";
import Autoplay from "embla-carousel-autoplay"; 
interface HeroCarouselProps {
  commercials: Commercial[];
}
export function HeroCarousel({ commercials }: HeroCarouselProps) {
  if (!commercials || commercials.length === 0) {
    return null; 
  }
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 5000, 
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        loop: true, 
      }}
    >
      <CarouselContent>
        {commercials.map((commercial) => (
          <CarouselItem key={commercial._id}>
            <Link href={commercial.link || "#"}>
              <Card className="overflow-hidden border-none shadow-none">
                <CardContent className="flex aspect-[16/6] items-center justify-center p-0 relative">
                  <Image
                    src={commercial.image}
                    alt={commercial.name}
                    fill
                    className="object-cover"
                    priority 
                  />
                  {}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                    <h2 className="text-4xl font-bold text-white shadow-lg">
                      {commercial.name}
                    </h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 hidden sm:inline-flex" />
      <CarouselNext className="absolute right-4 hidden sm:inline-flex" />
    </Carousel>
  );
}