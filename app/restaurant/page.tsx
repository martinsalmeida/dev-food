import { Suspense } from 'react';
import RestaurantsPage from './_components/restautant';
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';
import { db } from '../_lib/prisma';

const Restaurants = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <Suspense>
      <RestaurantsPage userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
};

export default Restaurants;
