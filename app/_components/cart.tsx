import { useContext } from 'react';
import { CartContext } from '../_context/cart';
import CartItem from './cart-item';
import { Card, CardContent } from './ui/card';
import { formatCurrency } from '../_helper/price';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs ">
              <span className="text-muted-foreground">SubTotal</span>
              <span>{formatCurrency(subTotalPrice)}</span>
            </div>

            <Separator className="h-[0.5px] bg-[#ddd]" />

            <div className="flex items-center justify-between text-xs ">
              <span className="text-muted-foreground">Entrega</span>
              {Number(products[0].restaurant.deliveryFee) === 0 ? (
                <span className="uppercase text-primary">Gratis</span>
              ) : (
                formatCurrency(Number(products[0].restaurant.deliveryFee))
              )}
            </div>

            <Separator className="h-[0.5px] bg-[#ddd]" />

            <div className="flex items-center justify-between text-xs ">
              <span className="text-muted-foreground">Descontos</span>
              <span>-{formatCurrency(totalDiscount)}</span>
            </div>

            <Separator className="h-[0.5px] bg-[#ddd]" />

            <div className="flex items-center justify-between text-xs ">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button className="mt-6 w-full">Finalizar pedido</Button>
      </div>
    </div>
  );
};

export default Cart;
