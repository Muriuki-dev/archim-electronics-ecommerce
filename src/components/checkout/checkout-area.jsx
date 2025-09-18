import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// internal
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const { handleSubmit, submitHandler } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);

  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to order now</h3>
              <Link href="/" className="tp-checkout-btn">
                Return to Products
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <CheckoutOrderArea checkoutData={checkoutData} />
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
