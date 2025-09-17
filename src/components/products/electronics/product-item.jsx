import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Cart, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { useDispatch, useSelector } from "react-redux";
import { add_cart_product } from "@/redux/features/cartSlice";

const ProductItem = ({ product, offer_style = false }) => {
  const { id, name, type, price, image, offerDate, status } = product || {};
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart_products);

  // Ensure compatibility with cart slice (_id is required)
  const productWithId = {
    ...product,
    _id: product._id || product.id, // fallback if _id is missing
    title: product.name, // for toast notification
  };

  const isInCart = cartProducts.some((item) => item._id === productWithId._id);

  const handleAddProduct = () => {
    if (status !== "out-of-stock") {
      dispatch(add_cart_product(productWithId));
    }
  };

  const handleWishlistProduct = () => {
    // Wishlist logic if needed
  };

  return (
    <div className={`${offer_style ? "tp-product-offer-item" : "mb-25"} tp-product-item transition-3`}>
      <div className="tp-product-thumb p-relative fix">
        <Link href={`/product-details/${id}`}>
          <Image
            src={image}
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
            alt={name}
          />
          {status === "out-of-stock" && (
            <div className="tp-product-badge">
              <span className="product-hot">Out of Stock</span>
            </div>
          )}
        </Link>

        <div className="tp-product-action">
          <div className="tp-product-action-item d-flex flex-column">
            {isInCart ? (
              <Link href="/cart" className="tp-product-action-btn tp-product-add-cart-btn">
                <Cart /> <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                onClick={handleAddProduct}
                type="button"
                className="tp-product-action-btn tp-product-add-cart-btn"
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}

            <button
              type="button"
              className="tp-product-action-btn tp-product-add-to-wishlist-btn"
              onClick={handleWishlistProduct}
              disabled={status === "out-of-stock"}
            >
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>
          </div>
        </div>
      </div>

      <div className="tp-product-content">
        <div className="tp-product-category">
          <a href="#">{type}</a>
        </div>
        <h3 className="tp-product-title">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>

        <div className="tp-product-price-wrapper">
          <span className="tp-product-price new-price">Ksh{parseFloat(price).toFixed(2)}</span>
        </div>

        {offer_style && offerDate && (
          <div className="tp-product-countdown">
            <div className="tp-product-countdown-inner">
              {dayjs().isAfter(offerDate.endDate) ? (
                <ul>
                  <li><span>0</span> Day</li>
                  <li><span>0</span> Hrs</li>
                  <li><span>0</span> Min</li>
                  <li><span>0</span> Sec</li>
                </ul>
              ) : (
                <Timer expiryTimestamp={new Date(offerDate.endDate)} />
              )}
            </div>
          </div>
        )}

        <div className="tp-product-add-cart-btn-card-wrapper mt-2">
          {isInCart ? (
            <Link href="/cart" className="tp-product-add-cart-btn-card w-100">
              <Cart /> <span>View Cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddProduct}
              type="button"
              className="tp-product-add-cart-btn-card w-100"
              disabled={status === "out-of-stock"}
            >
              <Cart />
              <span>{status === "out-of-stock" ? "Out of Stock" : "Add to Cart"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
