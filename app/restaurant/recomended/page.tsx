import Header from '@/app/_components/header';
import RestaurantItem from '@/app/_components/restaurant-item';
import { db } from '@/app/_lib/prisma';

const RecomendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="p-5 ">
        <h2 className="text-lg font-semibold mb-6">
          Restaurantes recomendados
        </h2>
        <div className="flex flex-col gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecomendedRestaurants;
