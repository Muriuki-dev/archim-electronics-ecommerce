"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Cart, QuickView } from "@/svg"; // Removed Wishlist
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";

// 🔁 Adjusted to match data from products.js:
// id, name, type, price, image, tags

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);

  const {
    id,
    name,
    type,
    price,
    image,
    tags,
  } = product;

  const isAddedToCart = cart_products.some((prd) => prd.id === id);

  // Format price to KES
  const formatKES = (value) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(value);

  const fallbackImage = "/images/default.jpg"; // Ensure this exists in /public

  const handleAddProduct = () => {
    dispatch(add_cart_product(product));
  };

  return (
    <div className="tp-product-item mb-25 transition-3">
      <div className="tp-product-thumb p-relative fix">
        <Link href={`/product-details/${id}`}>
          <Image
            src={image || fallbackImage}
            alt={name}
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </Link>

        {/* Action Buttons */}
        <div className="tp-product-action">
          <div className="tp-product-action-item d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className="tp-product-action-btn active tp-product-add-cart-btn"
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                onClick={handleAddProduct}
                type="button"
                className="tp-product-action-btn tp-product-add-cart-btn"
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}

            <button
              onClick={() => dispatch(handleProductModal(product))}
              type="button"
              className="tp-product-action-btn tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="tp-product-content">
        <div className="tp-product-category">
          <a href="#">{type || "Unknown"}</a>
        </div>
        <h3 className="tp-product-title">
          <Link href={`/product-details/${id}`}>{name || "No Title"}</Link>
        </h3>

        <div className="tp-product-price-wrapper">
          <span className="tp-product-price new-price">{formatKES(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
