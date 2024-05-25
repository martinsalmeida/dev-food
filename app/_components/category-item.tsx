import { Category } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`}>
      <div className="flex justify-center items-center h-14 mb-3 py-3 px-8 gap-2 bg-white rounded-full shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={30}
          height={30}
        />
        <span className="font-semibold text-sm">{category.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
