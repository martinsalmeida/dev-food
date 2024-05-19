import { db } from '../_lib/prisma';
import CategoryItem from './category-item';

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="flex overflow-x-scroll  gap-3 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
