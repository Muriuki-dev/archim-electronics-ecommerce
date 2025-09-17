import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import Timer from "@/components/common/timer";

const ProductItem = ({ product, offer_style = false }) => {
  const { id, name, type, price, image, offerDate, status } = product || {};

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
      </div>

      <div className="tp-product-content">
        <div className="tp-product-category">
          <a href="#">{type}</a>
        </div>
        <h3 className="tp-product-title">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>

        <div className="tp-product-price-wrapper">
          <span className="tp-product-price new-price">
            Ksh{parseFloat(price).toFixed(2)}
          </span>
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
      </div>
    </div>
  );
};

export default ProductItem;
