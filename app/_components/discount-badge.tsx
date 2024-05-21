import { Product } from '@prisma/client';
import { ArrowDownIcon } from 'lucide-react';

interface DiscountBadgeProps {
  product: Pick<Product, 'discountPercentage'>;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
      <ArrowDownIcon size={12} />
      <span className="font-semibold text-xs">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadge;
