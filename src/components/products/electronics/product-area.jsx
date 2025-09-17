import React, { useEffect, useState } from "react";
import { products as allProducts } from "@/data/products";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import Modal from "react-modal";

// Make sure to bind modal to your appElement
Modal.setAppElement('#__next');

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    county: "",
    town: "",
    notes: ""
  });

  const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", 
  "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", 
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", 
  "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", 
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", 
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", 
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", 
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", 
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", 
  "Vihiga", "Wajir", "West Pokot"
];

  const categories = [...new Set(allProducts.map((product) => product.type.toLowerCase()))];

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      county: "",
      town: "",
      notes: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const whatsappNumber = "254795211116";
    const productName = selectedProduct.name;
    const productPrice = selectedProduct.id === 4 ? '' : `Ksh ${selectedProduct.price.toLocaleString()}`;
    
    const message = `*New Booking Request*%0A%0A
*Service:* ${productName}%0A
*Amount:* ${productPrice}%0A%0A
*Customer Details*%0A
Name: ${formData.name}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A
Preferred Date: ${formData.date}%0A
County: ${formData.county}%0A
Nearest Town: ${formData.town}%0A%0A
*Additional Notes:*%0A${formData.notes}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let result = activeTab === "all" 
        ? [...allProducts] 
        : allProducts.filter((prd) => prd.type.toLowerCase() === activeTab);
      
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        result = result.filter((prd) => 
          prd.name.toLowerCase().includes(term) || 
          (prd.description && prd.description.toLowerCase().includes(term))
        );
      }
      
      setFilteredProducts(result);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [activeTab, searchTerm]);

  let content = null;

  if (loading) {
    content = <HomePrdLoader loading={true} />;
  } else if (filteredProducts.length === 0) {
    content = <ErrorMsg msg="No Services found!" />;
  } else {
    content = filteredProducts.map((prd, i) => (
      <div key={i} className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-4">
        <div className="card" style={{ 
          borderRadius: '15px', 
          boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img 
                src={prd.image} 
                className="img-fluid rounded-start" 
                alt={prd.name}
                style={{ 
                  height: '100%', 
                  width: '100%', 
                  objectFit: 'cover',
                  borderTopLeftRadius: '15px',
                  borderBottomLeftRadius: '15px'
                }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/assets/img/default-service.jpg';
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body" style={{ padding: '2rem' }}>
                <h3 className="card-title" style={{ 
                  fontSize: '24px', 
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '1rem'
                }}>
                  {prd.name}
                </h3>
                <p className="card-text" style={{ 
                  fontSize: '16px', 
                  color: '#555',
                  marginBottom: '1.5rem'
                }}>
                  {prd.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  {/* Only show price if ID is not 4 */}
        {prd.id !== 4 && (
          <h4 className="mb-0" style={{ 
            color: 'red', 
            fontWeight: '700',
            fontSize: '22px'
          }}>
            Ksh {prd.price.toLocaleString()}
          </h4>
        )}
        {/* Add empty div to maintain flex layout when price is hidden */}
        {prd.id === 4 && <div></div>}
                  <button 
                    onClick={() => openModal(prd)}
                    className="btn"
                    style={{
                      padding: '12px 30px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '8px',
                      backgroundColor: 'green',
                      border: 'none',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 8px rgba(42, 89, 254, 0.3)',
                      ':hover': {
                        backgroundColor: '#1a49e4',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <section 
  className="tp-product-area" 
  style={{ 
    padding: "2rem 0",
    backgroundColor: "#ffffff"
  }}
>
  <div className="container">
    <div className="row align-items-center" style={{ marginBottom: "2rem" }}>
      {/* Category Tabs */}
      <div className="col-xl-8">
        <div 
          className="filter-tabs-container" 
          style={{ 
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >
          <button
            className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
            style={{
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: "500",
              backgroundColor: activeTab === "all" ? "#0d6efd" : "#f8f9fa",
              color: activeTab === "all" ? "white" : "#495057",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: activeTab === "all" 
                ? "0 4px 12px rgba(13, 110, 253, 0.3)" 
                : "0 2px 4px rgba(0,0,0,0.05)",
              transform: "translateY(0)",
              marginTop: "4px"
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "all") {
                e.currentTarget.style.backgroundColor = "#e9ecef";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "all") {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }
            }}
          >
            All Services
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`filter-tab ${activeTab === category ? "active" : ""}`}
              onClick={() => setActiveTab(category)}
              style={{
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: "500",
                backgroundColor: activeTab === category ? "#0d6efd" : "#f8f9fa",
                color: activeTab === category ? "white" : "#495057",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: activeTab === category 
                  ? "0 4px 12px rgba(13, 110, 253, 0.3)" 
                  : "0 2px 4px rgba(0,0,0,0.05)",
                transform: "translateY(0)",
                marginTop: "4px"
              }}
              onMouseEnter={(e) => {
                if (activeTab !== category) {
                  e.currentTarget.style.backgroundColor = "#e9ecef";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== category) {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                }
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      
    </div>
    
    {/* Content Section */}
    <div className="row" style={{ marginTop: "1.5rem" }}>
      {content} </div>
   

         {/* Booking Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Booking Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            },
            content: {
              position: 'relative',
              top: 'auto',
              left: 'auto',
              right: 'auto',
              bottom: 'auto',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              borderRadius: '12px',
              padding: '20px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              overflowY: 'auto'
            }
          }}
        >
          {selectedProduct && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '1px solid #eee'
              }}>
                <h2 style={{ 
                  margin: 0,
                  color: '#2a59fe',
                  fontSize: '24px',
                  fontWeight: '700'
                }}>
                  Book {selectedProduct.name}
                </h2>
                <button 
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    color: '#999',
                    cursor: 'pointer',
                    ':hover': {
                      color: '#666'
                    }
                  }}
                >
                  &times;
                </button>
              </div>
              
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ 
                    margin: 0,
                    color: '#2c3e50',
                    fontSize: '16px'
                  }}>
                    Service Amount
                  </h4>
                  <p style={{ 
                    margin: '5px 0 0',
                    color: '#7f8c8d',
                    fontSize: '14px'
                  }}>
                    Total payable amount
                  </p>
                </div>
                {/* Conditional price display - returns null for id 4 */}
  {selectedProduct.id !== 4 ? (
    <div style={{
      fontSize: '20px',
      fontWeight: '700',
      color: '#2a59fe'
    }}>
      Ksh {selectedProduct.price.toLocaleString()}
    </div>
  ) : null}
</div>
              
              
              <form onSubmit={handleBookingSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label" style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '14px'
                    }}>
                      Full Name <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label" style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '14px'
                    }}>
                      Email <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label" style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '14px'
                    }}>
                      Phone Number <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="date" className="form-label" style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '14px'
                    }}>
                      Preferred Date <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required 
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="county" className="form-label" style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '14px'
                    }}>
                      County <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <select 
                      className="form-select" 
                      id="county" 
                      name="county"
                      value={formData.county}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        transition: 'all 0.3s',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                        backgroundSize: '16px'
                      }}
                    >
                      <option value="">Select County</option>
                      {counties.map((county) => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="town" className="form-label" style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '14px'
                    }}>
                      Nearest Town <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="town" 
                      name="town"
                      value={formData.town}
                      onChange={handleInputChange}
                      required 
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label" style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    fontSize: '14px'
                  }}>
                    Additional Notes
                  </label>
                  <textarea 
                    className="form-control" 
                    id="notes" 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      transition: 'all 0.3s',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                
                <div className="d-flex justify-content-end align-items-center mt-3">
                  <button 
                    type="button" 
                    onClick={closeModal}
                    className="btn"
                    style={{ 
                      padding: '10px 20px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      backgroundColor: 'white',
                      color: '#2c3e50',
                      fontWeight: '600',
                      marginRight: '10px',
                      transition: 'all 0.3s',
                      fontSize: '14px',
                      ':hover': {
                        backgroundColor: '#f8f9fa'
                      }
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn"
                    style={{ 
                      padding: '10px 20px',
                      borderRadius: '6px',
                      backgroundColor: '#2a59fe',
                      border: 'none',
                      color: 'white',
                      fontWeight: '600',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 8px rgba(42, 89, 254, 0.3)',
                      fontSize: '14px',
                      ':hover': {
                        backgroundColor: '#1a49e4',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Submit Booking
                  </button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default ProductArea;
