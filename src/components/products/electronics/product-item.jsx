import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, offer_style = false }) => {
  const {
    _id,
    img,
    category,
    title,
    reviews,
    price = 0,
    discount = 0,
    status,
    offerDate,
  } = product || {};

  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);

  const [ratingVal, setRatingVal] = useState(0);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // Format price to KES
  const formatKES = (value) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(value);
  };

  const finalPrice = discount > 0
    ? price - (price * discount) / 100
    : price;

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const fallbackImage = "/images/default.jpg"; // Ensure this exists in your /public folder

  return (
    <div
      className={`${offer_style ? "tp-product-offer-item" : "mb-25"} tp-product-item transition-3`}
    >
      <div className="tp-product-thumb p-relative fix">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={img || fallbackImage}
            alt={title || "Product Image"}
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
          {status === "out-of-stock" && (
            <div className="tp-product-badge">
              <span className="product-hot">Out of Stock</span>
            </div>
          )}
        </Link>

        {/* Action buttons */}
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
                onClick={() => handleAddProduct(product)}
                type="button"
                className="tp-product-action-btn tp-product-add-cart-btn"
                disabled={status === "out-of-stock"}
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

            <button
              onClick={() => handleWishlistProduct(product)}
              type="button"
              className={`tp-product-action-btn ${isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
              disabled={status === "out-of-stock"}
            >
              <Wishlist />
              <span className="tp-product-tooltip">Add to Wishlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="tp-product-content">
        <div className="tp-product-category">
          <a href="#">{category?.name || "Unknown"}</a>
        </div>
        <h3 className="tp-product-title">
          <Link href={`/product-details/${_id}`}>{title || "No Title"}</Link>
        </h3>

        <div className="tp-product-rating d-flex align-items-center">
          <div className="tp-product-rating-icon">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly />
          </div>
          <div className="tp-product-rating-text">
            <span>({reviews?.length || 0} Review)</span>
          </div>
        </div>

        <div className="tp-product-price-wrapper">
          {discount > 0 ? (
            <>
              <span className="tp-product-price old-price">{formatKES(price)}</span>
              <span className="tp-product-price new-price">
                {formatKES(finalPrice)}
              </span>
            </>
          ) : (
            <span className="tp-product-price new-price">{formatKES(price)}</span>
          )}
        </div>

        {/* Countdown for offers */}
        {offer_style && (
          <div className="tp-product-countdown">
            <div className="tp-product-countdown-inner">
              {dayjs().isAfter(offerDate?.endDate) ? (
                <ul>
                  <li><span>0</span> Day</li>
                  <li><span>0</span> Hrs</li>
                  <li><span>0</span> Min</li>
                  <li><span>0</span> Sec</li>
                </ul>
              ) : (
                <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
