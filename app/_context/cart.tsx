'use client';
import { Prisma, Product } from '@prisma/client';
import { ReactNode, createContext, useMemo, useState } from 'react';
import { calculateProductTotalPrice } from '../_helper/price';

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  addProductToCard: (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>,
    quantity: number
  ) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeCartProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  addProductToCard: (product: Product, quantity: number) => {},
  decreaseProductQuantity: (productId: string) => {},
  increaseProductQuantity: (productId: string) => {},
  removeCartProduct: (productId: string) => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subTotalPrice - totalPrice;

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const addProductToCard = (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>,
    quantity: number
  ) => {
    const isProductAlreadyCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (isProductAlreadyCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        })
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  const removeCartProduct = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCard,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeCartProduct,
        subTotalPrice,
        totalPrice,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};