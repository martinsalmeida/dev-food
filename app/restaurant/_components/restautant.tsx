'use client';
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchForRestaurants } from '../_actions/search';
import Header from '@/app/_components/header';
import RestaurantItem from '@/app/_components/restaurant-item';

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantsPage = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get('search');

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurant = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurant);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="p-5 ">
        <h2 className="text-lg font-semibold mb-6">Restaurantes encontrados</h2>
        <div className="flex flex-col gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantsPage;
