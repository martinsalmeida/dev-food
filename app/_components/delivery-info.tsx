import { BikeIcon, TimerIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Restaurant } from '@prisma/client';
import { formatCurrency } from '../_helper/price';

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="flex justify-around py-4 mt-6">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-sm font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Grátis</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Entrega</span>
          <TimerIcon size={14} />
        </div>
        {Number(restaurant.deliveryTimeMinutes) > 0 ? (
          <p className="text-sm font-semibold">
            {restaurant.deliveryTimeMinutes} min
          </p>
        ) : (
          <p className="text-sm font-semibold">-</p>
        )}
      </div>
    </Card>
  );
};

export default DeliveryInfo;
