import { useContext, useState } from 'react';
import { CartContext } from '../_context/cart';
import CartItem from './cart-item';
import { Card, CardContent } from './ui/card';
import { formatCurrency } from '../_helper/price';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { createOrder } from '../_actions/order';
import { OrderStatus } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const Cart = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const { products, subTotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subTotalPrice,
        totalDiscounts: totalDiscount,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="space-y-4">
          {products.map((product) => (
            <CartItem cartProduct={product} key={product.id} />
          ))}
        </div>

        {products.length > 0 ? (
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
                  {Number(products[0]?.restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Gratis</span>
                  ) : (
                    formatCurrency(Number(products[0]?.restaurant.deliveryFee))
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

            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              Finalizar pedido
              {isSubmitLoading && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        ) : (
          <h2 className="text-center font-medium mt-10">
            Você ainda não adicionou nenhum produto a sua sacola.
          </h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar o seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              Finalizar
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
