import Image from 'next/image';
import CategoryList from './_components/category-list';
import Header from './_components/header';
import Search from './_components/search';
import ProductList from './_components/product-list';
import { Button } from './_components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { db } from './_lib/prisma';
import PromoBanner from './_components/promo-banner';
import RestaurantList from './_components/restaurant-list';
import Link from 'next/link';

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />;
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 py-3">
        <CategoryList />
      </div>
      <div className="px-5 py-3">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>
      <div className="py-3 space-y-4">
        <div className="flex justify-between items-center px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>

          <Link href={'/products/recommended'}>
            <Button
              variant="ghost"
              className="text-primary h-fit p-0 hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <div className="px-5">
          <ProductList products={JSON.parse(JSON.stringify(products))} />
        </div>
      </div>
      <div className="px-5 py-3">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches!"
        />
      </div>
      <div className="py-6 space-y-4">
        <div className="flex justify-between items-center px-5">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Link href={'/restaurant/recomended'}>
            <Button
              variant="ghost"
              className="text-primary h-fit p-0 hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
