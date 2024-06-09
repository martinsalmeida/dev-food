'use client';

import { AvatarImage } from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent } from '@/app/_components/ui/card';
import { CartContext } from '@/app/_context/cart';
import { formatCurrency } from '@/app/_helper/price';
import { Order, OrderStatus, Prisma } from '@prisma/client';
import { Avatar } from '@radix-ui/react-avatar';
import { Separator } from '@radix-ui/react-separator';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useContext } from 'react';

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCard } = useContext(CartContext);

  const router = useRouter();

  const handleReOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCard({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }
    router.push(`/restaurant/${order.restaurantId}`);
  };

  const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'CANCELLED':
        return 'Cancelado';
      case 'FINISHED':
        return 'Entregue';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'DELIVERING':
        return 'Em transporte';
      case 'PREPARING':
        return 'Preparando';
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full bg-muted px-2 py-1 text-muted-foreground ${
            order.status !== 'CONFIRMED' && 'bg-green-500 text-white'
          }`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                className="rounded-full w-6 h-6"
                src={order.restaurant.imageUrl}
              />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant="link"
            className="h-5 w-5 text-black"
            size="icon"
            asChild
          >
            <Link href={`/restaurant/${order.restaurantId}`}>
              <ChevronRightIcon size={18} />
            </Link>
          </Button>
        </div>

        <div className="pt-3 pb-3">
          <Separator className="h-[0.5px] bg-[rgb(204,204,204)]" />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div className="flex gap-1" key={product.id}>
              <div className="w-5 h-5 rounded-full bg-muted-foreground flex items-center justify-center">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>

              <span className="text-sm text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 pb-3">
          <Separator className="h-[0.5px] bg-[rgb(204,204,204)]" />
        </div>

        <div className="flex items-center justify-between">
          <span>{formatCurrency(Number(order.totalPrice))}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={handleReOrderClick}
            disabled={order.status !== 'FINISHED'}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
