import Image from 'next/image';
import CategoryList from './_components/category-list';
import Header from './_components/header';
import Search from './_components/search';
import ProductList from './_components/product-list';
import { Button } from './_components/ui/button';
import { ChevronRightIcon } from 'lucide-react';

const Home = () => {
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
          height={0}
          width={0}
          className="h-auto w-full"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="py-3 space-y-4">
        <div className="flex justify-between items-center px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            variant="ghost"
            className="text-primary h-fit p-0 hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList />
      </div>
    </>
  );
};

export default Home;
