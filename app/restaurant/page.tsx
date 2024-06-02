import { Suspense } from 'react';
import RestaurantsPage from './_components/restautant';

const Restaurants = () => {
  return (
    <Suspense>
      <RestaurantsPage />
    </Suspense>
  );
};

export default Restaurants;
