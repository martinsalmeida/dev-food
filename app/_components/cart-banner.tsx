'use client';

import { useContext, useState } from 'react';
import { CartContext } from '../_context/cart';
import { Restaurant } from '@prisma/client';
import { formatCurrency } from '../_helper/price';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import Cart from './cart';

interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantProductCart = products.some(
    (product) => product.restaurantId === restaurant.id
  );

  if (!restaurantProductCart) return null;

  return (
    <div className="fixed bottom-0 left-0 h-20 w-full p-5 pt-3 bg-white border-t border-solid border-muted ">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{' '}
            <span className="text-xs text-muted-foreground">
              / {`${totalQuantity} ${totalQuantity > 1 ? 'itens' : 'item'}`}
            </span>
          </h3>
        </div>
        <div>
          <Button onClick={() => setIsCartOpen(true)}>Ver sacola</Button>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-[94vw]">
              <SheetHeader>
                <SheetTitle className="text-left">Sacola</SheetTitle>
              </SheetHeader>
              <Cart setIsOpen={setIsCartOpen} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default CartBanner;
