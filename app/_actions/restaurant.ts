'use server';
import { revalidatePath } from 'next/cache';
import { db } from '../_lib/prisma';

export const toggleFavoritedRestaurants = async (
  userId: string,
  restaurantId: string
) => {
  const isFavorited = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });
  if (isFavorited) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
    revalidatePath('/');
    return;
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
  revalidatePath('/');
};
