import { db } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import ProductImage from './_components/product-image';
import ProductDetails from './_components/product-details';
import { Button } from '@/app/_components/ui/button';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <ProductImage product={JSON.parse(JSON.stringify(product))} />
      {/* TITULO E PRECO */}
      <ProductDetails
        product={JSON.parse(JSON.stringify(product))}
        complementaryProduct={JSON.parse(JSON.stringify(juices))}
      />

      <div className="mt-6 mb-6 px-5">
        <Button className="w-full font-semibold">Adicionar a sacola</Button>
      </div>
    </div>
  );
};

export default ProductPage;
