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
          padding: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .product-thumb {
          position: relative;
          margin-bottom: 8px;
          width: 100%;
          overflow: hidden;
          border-radius: 8px;
          background-color: #f8f9fa;
        }

        .product-image {
          width: 100%;
          height: 160px;
          border-radius: 8px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .product-image {
            height: 140px;
          }
          .product-card {
            padding: 8px;
          }
        }

        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 991px) {
          .product-image {
            height: 160px;
          }
          .product-card {
            padding: 12px;
          }
        }

        /* Desktop styles */
        @media (min-width: 992px) {
          .product-image {
            height: 200px;
          }
          .product-card {
            padding: 16px;
          }
        }

        /* Large desktop styles */
        @media (min-width: 1200px) {
          .product-image {
            height: 220px;
          }
        }

        .product-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background-color: #ff4d4f;
          color: #fff;
          padding: 3px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-type {
          font-size: 11px;
          color: #666;
          margin-bottom: 4px;
          text-transform: capitalize;
        }

        .product-name {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #222;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-name a {
          color: inherit;
          text-decoration: none;
        }

        .product-name a:hover {
          color: #28a745;
        }

        .product-price {
          font-size: 14px;
          font-weight: bold;
          color: #28a745;
          margin-bottom: 8px;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: auto;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
          padding: 6px 8px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
          font-size: 12px;
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
          padding: 8px 10px;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          background-color: #28a745;
          color: white;
          transition: background 0.3s ease;
          font-size: 12px;
          text-decoration: none;
        }

        .full-width-btn:hover {
          background-color: #218838;
        }

        .full-width-btn:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }

        .countdown {
          margin-top: 8px;
          font-size: 11px;
        }

        .countdown ul {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .countdown ul li {
          text-align: center;
          font-size: 10px;
        }

        /* Desktop specific adjustments */
        @media (min-width: 992px) {
          .product-name {
            font-size: 16px;
          }
          
          .product-price {
            font-size: 16px;
          }
          
          .product-type {
            font-size: 12px;
          }
          
          .action-btn {
            font-size: 13px;
            padding: 8px 10px;
          }
          
          .full-width-btn {
            font-size: 13px;
            padding: 10px 12px;
          }
        }
      `}</style>

      {/* Product Image & Badges */}
      <div className="product-thumb">
        <Link href={`/product-details/${id}`}>
          <Image
            src={image}
            width={400}
            height={300}
            alt={name}
            className="product-image"
            priority={false}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </Link>
        {status === "out-of-stock" && (
          <div className="product-badge">Out of Stock</div>
        )}
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
              <Cart /> <span style={{ marginLeft: "6px" }}>View Cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddProduct}
              className="full-width-btn"
              disabled={status === "out-of-stock"}
            >
              <Cart />
              <span style={{ marginLeft: "6px" }}>
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
            <span style={{ marginLeft: "4px" }}>Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
