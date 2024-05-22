'use client';

import { Button } from '@/app/_components/ui/button';
import { Restaurant } from '@prisma/client';
import { ChevronLeftIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();
  return (
    <div className="relative w-full h-[250px]">
      <Image
        src={restaurant.imageUrl.toString()}
        alt={restaurant.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />

      <Button
        className="absolute top-4 left-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute bg-gray-400 right-4 top-4 rounded-full"
      >
        <HeartIcon size={16} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
