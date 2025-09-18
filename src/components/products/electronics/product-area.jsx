import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add_to_cart, openCartMini } from "@/redux/features/cartSlice";
import { products as allProducts } from "@/data/products";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Extract unique categories from products
  const categories = [...new Set(allProducts.map((product) => product?.type?.toLowerCase()))];

  // Handle Add to Cart same way as NewArrivals idea
  const handleAddToCart = (product) => {
    const cartItem = {
      _id: product._id ?? product.id,
      title: product.title ?? product.name,
      price: product.price,
      img: product.img ?? product.image,
      quantity: 1,
    };

    dispatch(add_to_cart(cartItem));
    dispatch(openCartMini());
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate fetching data with a timeout, like NewArrivals
    const timeout = setTimeout(() => {
      try {
        let result =
          activeTab === "all"
            ? [...allProducts]
            : allProducts.filter((prd) => prd?.type?.toLowerCase() === activeTab);

        if (searchTerm.trim() !== "") {
          const term = searchTerm.toLowerCase();
          result = result.filter(
            (prd) =>
              prd?.name?.toLowerCase().includes(term) ||
              prd?.title?.toLowerCase().includes(term) ||
              (prd?.description && prd.description.toLowerCase().includes(term))
          );
        }

        setFilteredProducts(result);
        setLoading(false);
      } catch (err) {
        setError("There was an error while fetching products.");
        setLoading(false);
      }
    }, 500); // 500ms delay like NewArrivals

    return () => clearTimeout(timeout);
  }, [activeTab, searchTerm]);

  let content = null;

  if (loading) {
    content = <HomePrdLoader loading={true} />;
  } else if (error) {
    content = <ErrorMsg msg={error} />;
  } else if (filteredProducts.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    content = (
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((prd) => (
          <div
            key={prd._id ?? prd.id}
            className="card h-100"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={prd.img ?? prd.image}
              alt={prd.title ?? prd.name}
              style={{ objectFit: "cover", height: "180px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/img/default-service.jpg";
              }}
            />
            <div className="card-body d-flex flex-column">
              <h5 style={{ fontSize: "16px", fontWeight: "600" }}>
                {prd.title ?? prd.name}
              </h5>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {prd.description?.slice(0, 70)}...
              </p>

              {/* Pricing */}
              {prd.price && (
                <div className="mt-auto">
                  <div className="d-flex align-items-center gap-2">
                    <h6 className="text-danger mb-0">
                      Ksh {prd.price.toLocaleString()}
                    </h6>
                    {prd.oldPrice && (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: "13px",
                            color: "#888",
                          }}
                        >
                          Ksh {prd.oldPrice.toLocaleString()}
                        </span>
                        <span className="badge bg-warning text-dark">
                          -{Math.round(((prd.oldPrice - prd.price) / prd.oldPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(prd)}
                className="btn btn-success mt-3 w-100"
                style={{ cursor: "pointer" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="tp-product-area py-5 bg-white">
      <div className="container">
        {/* Tabs */}
        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline-secondary"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`btn ${activeTab === cat ? "btn-primary" : "btn-outline-secondary"}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="form-control"
          />
        </div>

        {/* Product grid or error/loading */}
        {content}
      </div>
    </section>
  );
};

export default ProductArea;
