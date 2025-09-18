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

  const productWithId = {
    ...product,
    _id: product._id || product.id,
    title: product.name,
  };

  const isInCart = cartProducts.some((item) => item._id === productWithId._id);

  const handleAddProduct = () => {
    if (status !== "out-of-stock") {
      dispatch(add_cart_product(productWithId));
    }
  };

  const handleWishlistProduct = () => {
    // Wishlist logic
  };

  return (
    <div className="product-card">
      <style jsx>{`
        .product-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          padding: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .product-thumb {
          position: relative;
          margin-bottom: 12px;
        }

        .product-image {
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
          height: auto;
          max-height: 200px;
        }

        .product-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: #ff4d4f;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .product-type {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
          text-transform: capitalize;
        }

        .product-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: #222;
        }

        .product-price {
          font-size: 1rem;
          font-weight: bold;
          color: red;
          margin-bottom: 10px;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
          padding: 8px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        .action-btn:hover {
          background: #e6f4ea;
        }

        .action-btn:disabled {
          background: #eee;
          cursor: not-allowed;
        }

        .full-width-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 12px;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          background-color: #28a745;
          color: white;
          transition: background 0.3s ease;
        }

        .full-width-btn:hover {
          background-color: #218838;
        }

        .countdown {
          margin-top: 10px;
        }
      `}</style>

      {/* Product Image & Badges */}
      <div className="product-thumb">
        <Link href={`/product-details/${id}`}>
          <Image
            src={image}
            width={500}
            height={500}
            alt={name}
            className="product-image"
          />
          {status === "out-of-stock" && (
            <div className="product-badge">Out of Stock</div>
          )}
        </Link>
      </div>

      {/* Product Content */}
      <div className="product-info">
        <div className="product-type">{type}</div>
        <h3 className="product-name">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>
        <div className="product-price">Ksh{parseFloat(price).toFixed(2)}</div>

        {/* Countdown Timer (optional) */}
        {offer_style && offerDate && (
          <div className="countdown">
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
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          {isInCart ? (
            <Link href="/cart" className="full-width-btn">
              <Cart /> <span style={{ marginLeft: "8px" }}>View Cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddProduct}
              className="full-width-btn"
              disabled={status === "out-of-stock"}
            >
              <Cart />
              <span style={{ marginLeft: "8px" }}>
                {status === "out-of-stock" ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>
          )}

          <button
            className="action-btn"
            onClick={handleWishlistProduct}
            disabled={status === "out-of-stock"}
          >
            <Wishlist />
            <span style={{ marginLeft: "6px" }}>Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
