import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";

const CartItem = ({ product }) => {
  const { _id, img, title, price, orderQuantity = 0 } = product || {};
  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-content">
        {/* Product image */}
        <div className="product-image-container">
          <Link href={`/product-details/${_id}`}>
            <div className="product-image-wrapper">
              <Image 
                src={img} 
                alt={title}
                width={120}
                height={120}
                className="product-image"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Product details */}
        <div className="product-details">
          <Link href={`/product-details/${_id}`}>
            <h3 className="product-title">{title}</h3>
          </Link>
          
          <div className="product-price">KSh{price.toFixed(2)}</div>
          
          <button
            onClick={() => handleRemovePrd({ title, id: _id })}
            className="remove-button"
            aria-label="Remove item"
          >
            <Close className="remove-icon" />
          </button>
        </div>
        
        {/* Quantity and price */}
        <div className="quantity-price-section">
          {/* Quantity controls */}
          <div className="quantity-controls"> 
            <button
              onClick={() => handleDecrement(product)}
              className="quantity-button decrement"
              disabled={orderQuantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="quantity-icon" />
            </button>
            
            <input
              className="quantity-input"
              type="text"
              value={orderQuantity}
              readOnly
              aria-label="Quantity"
            />
            
            <button
              onClick={() => handleAddProduct(product)}
              className="quantity-button increment"
              aria-label="Increase quantity"
            >
              <Plus className="quantity-icon" />
            </button>
          </div>
          
          {/* Total price */}
          <div className="total-price">
            KSh{(price * orderQuantity).toFixed(2)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-item {
          padding: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
          position: relative;
          width: 100%;
          background-color: white;
          transition: all 0.3s ease;
        }
        
        .cart-item:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .cart-item-content {
          display: flex;
          align-items: flex-start;
          width: 100%;
          gap: 1rem;
        }
        
        /* Product image styles */
        .product-image-container {
          width: 120px;
          height: 120px;
          padding: 0.5rem;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          flex-shrink: 0;
          background: white;
          transition: transform 0.3s ease;
        }
        
        .product-image-container:hover {
          transform: scale(1.02);
        }
        
        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .product-image {
          object-fit: contain;
          mix-blend-mode: multiply;
        }
        
        /* Product details styles */
        .product-details {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding-right: 0.5rem;
          min-width: 0;
        }
        
        .product-title {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
          margin: 0 0 0.5rem 0;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease;
        }
        
        .product-title:hover {
          color: #000;
        }
        
        .product-price {
          font-size: 1rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.5rem;
        }
        
        .remove-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          background: white;
          padding: 0;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .remove-button:hover {
          background: #f8f8f8;
          border-color: #d0d0d0;
        }
        
        .remove-icon {
          width: 0.875rem;
          height: 0.875rem;
          color: #666;
        }
        
        /* Quantity and price styles */
        .quantity-price-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          margin-left: auto;
        }
        
        .quantity-controls {
          display: flex;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          height: 2.5rem;
        }
        
        .quantity-button {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .quantity-button:hover {
          background: #f9f9f9;
        }
        
        .quantity-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity-button:disabled:hover {
          background: white;
        }
        
        .quantity-icon {
          width: 0.875rem;
          height: 0.875rem;
          color: #333;
        }
        
        .quantity-input {
          width: 3rem;
          height: 2.5rem;
          border: none;
          border-left: 1px solid #e5e5e5;
          border-right: 1px solid #e5e5e5;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          background: white;
          color: #333;
        }
        
        .total-price {
          font-size: 1.125rem;
          font-weight: 600;
          color: #000;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .cart-item-content {
            flex-wrap: wrap;
          }
          
          .product-image-container {
            width: 80px;
            height: 80px;
          }
          
          .quantity-price-section {
            flex-direction: row;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px dashed #eee;
          }
          
          .product-title {
            font-size: 0.875rem;
          }
          
          .product-price, .total-price {
            font-size: 0.9375rem;
          }
        }
        
        @media (max-width: 480px) {
          .cart-item {
            padding: 1rem;
          }
          
          .product-details {
            padding-right: 0;
          }
          
          .quantity-controls {
            height: 2rem;
          }
          
          .quantity-button {
            width: 2rem;
            height: 2rem;
          }
          
          .quantity-input {
            height: 2rem;
            width: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;
