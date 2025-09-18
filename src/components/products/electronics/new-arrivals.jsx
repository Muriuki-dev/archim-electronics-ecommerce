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

  // Extract unique categories for tabs (including 'all')
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
      <div
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}
      >
        {filteredProducts.map(item => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    );
  }

  return (
    <section className="tp-product-arrival-area pb-55">
      <div className="container">
        <div className="tp-section-title-wrapper mb-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            style={{
              fontSize: '22px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onClick={() => alert('New Arrivals section clicked!')}
          >
            New Arrivals
          </button>
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="form-control"
            style={{ maxWidth: '300px', padding: '8px 12px', fontSize: '16px' }}
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-4" style={{ marginBottom: '20px' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              style={{
                marginRight: '10px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #28a745',
                backgroundColor: activeTab === category ? '#28a745' : 'transparent',
                color: activeTab === category ? '#fff' : '#28a745',
                cursor: 'pointer',
                fontWeight: '600',
                textTransform: 'capitalize',
              }}
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
