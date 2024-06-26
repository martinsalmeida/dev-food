import { db } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import RestaurantImage from '../_components/restaurante-image';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import DeliveryInfo from '@/app/_components/delivery-info';
import ProductList from '@/app/_components/product-list';
import CartBanner from '@/app/_components/cart-banner';

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={JSON.parse(JSON.stringify(restaurant))} />
      <div className="flex justify-between items-center px-5 pt-5 relative mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-[#f5f5f5]">
        <div className="flex items-center gap-1">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="bg-foreground px-2 py-[2px] gap-1 rounded-full flex items-center text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={JSON.parse(JSON.stringify(restaurant))} />
      </div>

      <div className="flex overflow-x-scroll gap-4 px-5 mt-3 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] p-1 bg-[#e7e7e7] text-center border border-solid rounded-sm text-xs"
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 mb-4">
        <h2 className="font-semibold">Mais Pedidos</h2>
        <ProductList
          products={JSON.parse(JSON.stringify(restaurant.products))}
        />
      </div>

      {restaurant.categories.map((category) => (
        <div className="px-5 mt-4 mb-4" key={category.id}>
          <h2 className="font-semibold">{category.name}</h2>
          <ProductList
            products={JSON.parse(JSON.stringify(category.products))}
          />
        </div>
      ))}

      <CartBanner restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </div>
  );
};

export default RestaurantPage;
