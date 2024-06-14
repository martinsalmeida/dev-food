'use client';
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client';
import {
  BikeIcon,
  HeartIcon,
  Loader2,
  StarIcon,
  TimerIcon,
} from 'lucide-react';
import Image from 'next/image';
import { formatCurrency } from '../_helper/price';
import { Button } from './ui/button';
import Link from 'next/link';
import { toggleFavoritedRestaurants } from '../_actions/restaurant';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { relative } from 'path';

interface RestaurantItemProps {
  restaurant: Restaurant;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      setIsLoading(true);
      await toggleFavoritedRestaurants(data?.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? 'Restaurante removido com sucesso!'
          : 'Restaurante favoritado com sucesso!'
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-w-[256px]">
      <div className="w-full space-y-4 ">
        <div className="w-full h-[136px]" style={{ position: 'relative' }}>
          <Link href={`/restaurant/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="w-full h-[136px]"
              className="object-cover rounded-lg"
            />
          </Link>
          <div className="absolute top-2 left-2 bg-white px-2 py-[2px] rounded-full flex items-center">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-xs">5.0</span>
          </div>

          {data?.user.id && (
            <Button
              onClick={handleFavoriteClick}
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${
                isFavorite && 'bg-primary hover:bg-gray-700'
              }`}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{restaurant.name}</h3>
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? 'Entrega grátis'
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <TimerIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
