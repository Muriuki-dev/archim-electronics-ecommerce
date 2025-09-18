import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CartCheckout from './cart-checkout';
import CartItem from './cart-item';

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);

  return (
    <section className="tp-cart-area pb-120">
      <div className="container">
        {cart_products.length === 0 ? (
          <div className="text-center pt-50">
            <h3>Your cart is empty</h3>
            <Link href="/" className="tp-cart-checkout-btn mt-20">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-items-wrapper">
            {cart_products.map((item, i) => (
              <CartItem key={i} product={item} />
            ))}

            {/* Checkout Box */}
            <CartCheckout />
          </div>
        )}
      </div>
    </section>
  );
};

export default CartArea;
