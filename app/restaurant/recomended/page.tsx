import Header from '@/app/_components/header';
import RestaurantItem from '@/app/_components/restaurant-item';
import { authOptions } from '@/app/_lib/auth';
import { db } from '@/app/_lib/prisma';
import { getServerSession } from 'next-auth';

const RecomendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({});

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <>
      <Header />
      <div className="p-5 ">
        <h2 className="text-lg font-semibold mb-6">
          Restaurantes recomendados
        </h2>
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

export default RecomendedRestaurants;
