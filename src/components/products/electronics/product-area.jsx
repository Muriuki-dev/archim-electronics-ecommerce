import React, { useEffect, useState } from "react";
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

import { products as allProducts } from "@/data/products";

const tabs = ["new", "featured", "topSellers"];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        let filtered = activeTab
          ? allProducts.filter((product) => product.tags?.includes(activeTab))
          : allProducts;

        if (searchTerm.trim()) {
          filtered = filtered.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setFilteredProducts(filtered);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error loading products:", error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [activeTab, searchTerm]);

  const handleActiveTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Format price to Kenyan Shillings
  const formatPriceKES = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
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
    console.log("Rendering products:", filteredProducts);
    content = filteredProducts.map((prd) => (
      <div key={prd.id} className="col-xl-3 col-lg-3 col-sm-6 col-6">
        <ProductItem
  product={prd} // pass price as a number, don't format here
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
            <div className="filter-area d-flex flex-wrap justify-content-md-end align-items-center gap-3">
              <ul className="nav nav-tabs filter-tabs mb-0">
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

              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="product-search"
                aria-label="Search products"
              />
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

        .filter-area {
          gap: 1rem;
        }

        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }

        .filter-tabs .nav-item {
          margin-right: 0.5rem;
        }

        .filter-tabs .nav-link {
          font-weight: 600;
          color: #555;
          border: none;
          padding: 0.5rem 1rem;
          transition: color 0.3s;
          border-radius: 4px;
          background: #fff;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
        }

        .filter-tabs .nav-link.active,
        .filter-tabs .nav-link:hover {
          color: #007bff;
          border-bottom: 2px solid #007bff;
          background: #e9f2ff;
        }

        .product-search {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 180px;
          font-size: 1rem;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
          transition: border-color 0.3s;
        }

        .product-search:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 8px #007bff;
        }

        @media (max-width: 768px) {
          .col-6 {
            max-width: 50% !important;
            flex: 0 0 50% !important;
          }

          .filter-area {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .filter-tabs {
            justify-content: center;
            margin-bottom: 0.5rem;
          }

          .filter-tabs .nav-item {
            margin-right: 0.25rem;
          }

          .product-search {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductArea;
