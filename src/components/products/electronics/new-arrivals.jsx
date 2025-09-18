import React, { useEffect, useState } from 'react';
// Internal
import ErrorMsg from '@/components/common/error-msg';
import ProductItem from './product-item';
import HomeNewArrivalPrdLoader from '@/components/loader/home/home-newArrival-prd-loader';
import { products as allProducts } from '@/data/products'; // Update path as needed

const NewArrivals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', ...new Set(allProducts.map(product => product.type))];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      try {
        let result =
          activeTab === 'all'
            ? [...allProducts]
            : allProducts.filter(prd => prd?.type?.toLowerCase() === activeTab.toLowerCase());

        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          result = result.filter(
            prd =>
              (prd?.name?.toLowerCase().includes(term) ||
                prd?.title?.toLowerCase().includes(term) ||
                (prd?.description && prd.description.toLowerCase().includes(term))) ?? false
          );
        }

        setFilteredProducts(result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('There was an error while fetching products.');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [activeTab, searchTerm]);

  let content = null;

  if (loading) {
    content = <HomeNewArrivalPrdLoader loading={true} />;
  } else if (error) {
    content = <ErrorMsg msg={error} />;
  } else if (filteredProducts.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    content = (
      <div className="product-grid">
        {filteredProducts.map(item => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    );
  }

  return (
    <section className="tp-product-arrival-area pb-55">
      <style jsx>{`
        .arrival-btn {
          font-size: 22px;
          padding: 10px 20px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Mobile: 2 per row */
          gap: 20px;
          width: 100%;
        }

        /* Tablet breakpoint - 3 products per row */
        @media (min-width: 768px) and (max-width: 991px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Desktop/Laptop breakpoint - 4 products per row */
        @media (min-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Extra large screens - 5 products per row */
        @media (min-width: 1400px) {
          .product-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .category-tab {
          margin-right: 10px;
          margin-bottom: 10px; /* Added for better mobile spacing */
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #28a745;
          background-color: transparent;
          color: #28a745;
          cursor: pointer;
          font-weight: 600;
          text-transform: capitalize;
          transition: all 0.3s ease;
        }

        .category-tab:hover {
          background-color: #28a745;
          color: #fff;
          transform: translateY(-1px);
        }

        .category-tab.active {
          background-color: #28a745;
          color: #fff;
        }

        .search-input {
          max-width: 300px;
          width: 100%;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #28a745;
          box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
        }

        /* Mobile responsive header */
        @media (max-width: 767px) {
          .tp-section-title-wrapper {
            flex-direction: column !important;
            gap: 15px;
            align-items: stretch !important;
          }
          
          .search-input {
            max-width: 100%;
          }
          
          .arrival-btn {
            font-size: 18px;
            padding: 8px 16px;
            justify-content: center;
          }
          
          .category-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .category-tab {
            margin-right: 0;
            flex: 1;
            min-width: fit-content;
            text-align: center;
          }
        }
      `}</style>

      <div className="container">
        <div
          className="tp-section-title-wrapper mb-20"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <button className="arrival-btn" onClick={() => alert('New Arrivals section clicked!')}>
            New Arrivals
          </button>

          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="search-input"
          />
        </div>

        {/* Category Tabs */}
        <div className="category-tabs mb-4" style={{ marginBottom: '20px' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`category-tab ${activeTab === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {content}
      </div>
    </section>
  );
};

export default NewArrivals;
