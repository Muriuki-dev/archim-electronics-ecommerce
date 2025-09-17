import React, { useEffect, useState } from "react";
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

import { products as allProducts } from "@/data/products";

const tabs = ["new", "featured", "topSellers"];

const ProductArea = () => {
  // default to no filter (all products)
  const [activeTab, setActiveTab] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = activeTab
          ? allProducts.filter((product) => product.tags?.includes(activeTab))
          : allProducts;
        setFilteredProducts(filtered);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error loading products:", error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [activeTab]);

  const handleActiveTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  // Render Logic
  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (filteredProducts.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    content = filteredProducts.map((prd, i) => (
      <div key={i} className="col-xl-3 col-lg-3 col-sm-6 col-6">
        <ProductItem
          product={{
            ...prd,
            // Show image as is (do not remove)
            // Convert price to KES with formatting
            price: `KES ${prd.price.toLocaleString()}`,
          }}
        />
      </div>
    ));
  }

  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row align-items-end mb-4">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper">
              <h3 className="tp-section-title">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-7">
            <div className="tp-product-tab tp-product-tab-border tp-tab d-flex justify-content-md-end">
              <ul className="nav nav-tabs justify-content-sm-end">
                {tabs.map((tab, i) => (
                  <li key={i} className="nav-item">
                    <button
                      onClick={() => handleActiveTab(tab)}
                      className={`nav-link text-capitalize ${
                        activeTab === tab ? "active" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {tab}
                      <span className="tp-product-tab-line">
                        <TabLine />
                      </span>
                    </button>
                  </li>
                ))}
                <li className="nav-item">
                  <button
                    onClick={() => setActiveTab(null)}
                    className={`nav-link text-capitalize ${
                      activeTab === null ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    All
                    <span className="tp-product-tab-line">
                      <TabLine />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">{content}</div>
      </div>

      <style jsx>{`
        .tp-product-area {
          background: #f9f9f9;
          padding: 40px 0;
        }

        .tp-section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          position: relative;
          margin-bottom: 1rem;
        }

        .tp-product-tab .nav-link {
          font-weight: 600;
          color: #555;
          border: none;
          padding: 0.5rem 1rem;
          transition: color 0.3s;
        }

        .tp-product-tab .nav-link.active,
        .tp-product-tab .nav-link:hover {
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }

        /* Responsive: 2 items per row on small/mobile */
        @media (max-width: 768px) {
          .col-6 {
            max-width: 50% !important;
            flex: 0 0 50% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductArea;
