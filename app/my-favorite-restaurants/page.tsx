import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';
import { notFound } from 'next/navigation';
import { db } from '../_lib/prisma';
import Header from '../_components/header';
import RestaurantItem from '../_components/restaurant-item';

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="p-5 ">
        <h2 className="text-lg font-semibold mb-6">Restaurantes favoritos</h2>
        <div className="flex flex-col gap-4">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={JSON.parse(JSON.stringify(restaurant))}
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3>Vocâ ainda não tem um restaurante favorito.</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
