import Image from 'next/image';
import { CartContext, CartProduct } from '../_context/cart';
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon, Trash } from 'lucide-react';
import { calculateProductTotalPrice, formatCurrency } from '../_helper/price';
import { useContext } from 'react';

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeCartProduct,
  } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 relative">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity
                )}
              </span>
            )}
          </div>
          <div className="flex gap-1 items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground h-8 w-8"
              onClick={() => decreaseProductQuantity(cartProduct.id)}
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="text-sm w-4">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={() => increaseProductQuantity(cartProduct.id)}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={() => removeCartProduct(cartProduct.id)}
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
