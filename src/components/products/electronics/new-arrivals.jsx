import React, { useEffect, useState } from 'react';
// Internal
import ErrorMsg from '@/components/common/error-msg';
import ProductItem from './product-item';
import HomeNewArrivalPrdLoader from '@/components/loader/home/home-newArrival-prd-loader';
import { products as allProducts } from '@/data/products'; // Update path as needed

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Simulate fetching data with a timeout
    setTimeout(() => {
      try {
        // Get one product from each category
        const uniqueCategories = [...new Set(allProducts.map(product => product.type))]; // Get unique categories
        const selectedProducts = uniqueCategories.map(category => {
          return allProducts.find(product => product.type === category); // Get one product from each category
        });

        setNewArrivals(selectedProducts);
        setLoading(false);
      } catch (err) {
        setError('There was an error while fetching products.');
        setLoading(false);
      }
    }, 500); // Simulate loading time
  }, []);

  let content = null;

  if (loading) {
    content = <HomeNewArrivalPrdLoader loading={true} />;
  } else if (error) {
    content = <ErrorMsg msg={error} />;
  } else if (newArrivals.length === 0) {
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
        {newArrivals.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    );
  }

  return (
    <section className="tp-product-arrival-area pb-55">
      <div className="container">
        <div className="tp-section-title-wrapper mb-40">
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
            onClick={() => alert('New Arrivals section clicked!')} // Optional: Add click handler
          >
            New Arrivals
          </button>
        </div>
        {content}
      </div>
    </section>
  );
};

export default NewArrivals;
