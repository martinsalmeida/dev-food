import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';
import { redirect } from 'next/navigation';
import { db } from '../_lib/prisma';
import Header from '../_components/header';
import OrderItem from './_components/order-item';

const MyOrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/s');
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="font-semibold">Meus Pedidos</h2>
      </div>
      <div className="p-5 space-y-3">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default MyOrderPage;
