import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const WhatsAppButton = ({ className }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isBookingHovering, setIsBookingHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [waveVisible, setWaveVisible] = useState(false);
  const [starsVisible, setStarsVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const buttonRef = useRef(null);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    nearestTown: "",
    serviceType: "",
    county: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: ""
  });

  // Common questions for autocare
  const commonQuestions = [
    "What services do you offer for vehicle maintenance?",
    "Do you provide roadside assistance?",
    "How much does a full service cost?",
    "Do you work on all vehicle makes and models?",
    "What are your working hours?",
    "Do you offer mobile/on-site services?",
    "How often should I service my vehicle?",
    "Do you provide warranty on your services?",
    "What payment methods do you accept?",
    "How quickly can you attend to an emergency?"
  ];

  // Service types for booking
  const serviceTypes = [
    "Smart Tracker Installation",
    "Vehicle Alarm Installation",
    "Fuel Cutout System Installation",
    "Smart Key Programming",
    "Car Audio System Installation",
    "Reverse Camera Installation",
    "GPS Tracking System",
    "Remote Start Installation",
    "Window Tinting",
    "Central Locking System",
    "Car Alarm Repair/Service",
    "Tracker Reactivation/Service",
    "Immobilizer Installation",
    "Dashcam Installation",
    "Bluetooth System Installation",
    "Car Play/Android Auto Installation",
    "Vehicle Security Consultation",
    "Electrical System Diagnostics",
    "Battery Backup System",
    "Other Security/Audio Service"
  ];

  // All counties in Kenya
  const kenyaCounties = [
    "Mombasa",
    "Kwale",
    "Kilifi",
    "Tana River",
    "Lamu",
    "Taita-Taveta",
    "Garissa",
    "Wajir",
    "Mandera",
    "Marsabit",
    "Isiolo",
    "Meru",
    "Tharaka-Nithi",
    "Embu",
    "Kitui",
    "Machakos",
    "Makueni",
    "Nyandarua",
    "Nyeri",
    "Kirinyaga",
    "Murang'a",
    "Kiambu",
    "Turkana",
    "West Pokot",
    "Samburu",
    "Trans Nzoia",
    "Uasin Gishu",
    "Elgeyo-Marakwet",
    "Nandi",
    "Baringo",
    "Laikipia",
    "Nakuru",
    "Narok",
    "Kajiado",
    "Kericho",
    "Bomet",
    "Kakamega",
    "Vihiga",
    "Bungoma",
    "Busia",
    "Siaya",
    "Kisumu",
    "Homa Bay",
    "Migori",
    "Kisii",
    "Nyamira",
    "Nairobi"
  ];

  // Animation effects
  useEffect(() => {
    // Wave animation every 15 seconds
    const waveInterval = setInterval(() => {
      setWaveVisible(true);
      setTimeout(() => setWaveVisible(false), 2000);
    }, 15000);

    // Stars animation every 30 seconds
    const starsInterval = setInterval(() => {
      setStarsVisible(true);
      setTimeout(() => setStarsVisible(false), 1500);
    }, 30000);

    return () => {
      clearInterval(waveInterval);
      clearInterval(starsInterval);
    };
  }, []);

  // Freeze background when popup is open
  useEffect(() => {
    if (showPopup || showBookingPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPopup, showBookingPopup]);

  const toggleOption = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option) 
        : [...prev, option]
    );
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const message = `Hello, I need help with: ${selectedOptions.join(", ")}. ${customQuestion ? "Additional question: " + customQuestion : ""}`;
    window.open(`https://wa.me/254713735187?text=${encodeURIComponent(message)}`, '_blank');
    setShowPopup(false);
    setSelectedOptions([]);
    setCustomQuestion("");
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const message = `New Booking Request:
Name: ${bookingForm.name}
Phone: ${bookingForm.phone}
Service: ${bookingForm.serviceType}
Date: ${bookingForm.preferredDate}
Time: ${bookingForm.preferredTime}
County: ${bookingForm.county || 'Not specified'}
Nearest Town: ${bookingForm.nearestTown || 'Not specified'}
Notes: ${bookingForm.additionalNotes || 'None'}`;

    window.open(`https://wa.me/254713735187?text=${encodeURIComponent(message)}`, '_blank');
    setShowBookingPopup(false);
    setBookingForm({
      name: "",
      phone: "",
      nearestTown: "",
      serviceType: "",
      county: "",
      preferredDate: "",
      preferredTime: "",
      additionalNotes: ""
    });
  };

  return (
    <div className={`whatsapp-button-wrapper ${className || ""}`}>
      {/* Booking Button - positioned below WhatsApp button */}
      <div style={{ position: "fixed", bottom: "80px", left: "20px", zIndex: 1001 }}>
        <button
          onClick={() => setShowBookingPopup(true)}
          aria-label="Book a consultation with Archim Electronics"
          style={{
            backgroundColor: isBookingHovering ? "#075E54" : "#128C7E",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "32px",
            boxShadow: isBookingHovering ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "0 6px 16px rgba(0, 0, 0, 0.15)",
            fontSize: "15px",
            fontWeight: 500,
            border: "none",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 300ms ease",
            transform: isBookingHovering ? "translateY(-2px)" : "translateY(0)",
            position: "relative",
            overflow: "visible",
            zIndex: 1002
          }}
          onMouseEnter={() => setIsBookingHovering(true)}
          onMouseLeave={() => setIsBookingHovering(false)}
        >
          <CalendarIcon />
          <span style={{ marginLeft: "12px" }}>Book Consultation</span>
        </button>
      </div>

      {/* Main WhatsApp Button */}
      <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 1001 }}>
        <button
          ref={buttonRef}
          onClick={() => setShowPopup(true)}
          aria-label="Chat with Archim Electronics on WhatsApp"
          style={{
            backgroundColor: isHovering ? "#128C7E" : "#25D366",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "32px",
            boxShadow: isHovering ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "0 6px 16px rgba(0, 0, 0, 0.15)",
            fontSize: "15px",
            fontWeight: 500,
            border: "none",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 300ms ease",
            transform: isHovering ? "translateY(-2px)" : "translateY(0)",
            position: "relative",
            overflow: "visible",
            zIndex: 1002
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <WhatsAppIcon />
          <span style={{ marginLeft: "12px" }}>Archim Electronics Support</span>
          {waveVisible && <WaveEffect />}
          {starsVisible && <StarsEffect />}
        </button>
      </div>

      {/* WhatsApp Popup Modal */}
      {showPopup && (
        <WhatsAppPopup 
          commonQuestions={commonQuestions}
          selectedOptions={selectedOptions}
          customQuestion={customQuestion}
          onToggleOption={toggleOption}
          onCustomQuestionChange={setCustomQuestion}
          onSubmit={handleWhatsAppSubmit}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Booking Popup Modal */}
      {showBookingPopup && (
        <BookingPopup 
          formData={bookingForm}
          serviceTypes={serviceTypes}
          counties={kenyaCounties}
          onChange={handleBookingChange}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBookingPopup(false)}
        />
      )}
    </div>
  );
};

// Sub-components
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2.002c-5.509 0-9.99 4.482-9.99 9.991 0 1.761.463 3.482 1.344 4.993L2 22l5.15-1.337c1.475.793 3.142 1.212 4.89 1.212 5.51 0 9.991-4.482 9.991-9.991s-4.481-9.991-9.991-9.991zm0 18.324c-1.559 0-3.078-.416-4.4-1.204l-.315-.184-3.052.792.812-2.975-.204-.314c-.831-1.282-1.27-2.765-1.27-4.271 0-4.388 3.572-7.96 7.96-7.96 4.387 0 7.96 3.572 7.96 7.96s-3.573 7.96-7.961 7.96zm4.471-5.93c-.246-.124-1.457-.719-1.683-.801-.226-.083-.39-.124-.556.124-.164.248-.64.801-.784.965-.144.164-.29.186-.537.062-.246-.124-1.04-.383-1.98-1.222-.731-.651-1.224-1.456-1.368-1.702-.144-.248-.015-.382.109-.505.113-.112.248-.29.371-.435.124-.145.165-.248.248-.413.082-.165.041-.31-.02-.435-.062-.124-.556-1.34-.762-1.84-.2-.48-.403-.414-.556-.422l-.472-.008c-.165 0-.435.062-.662.31s-.87.848-.87 2.062c0 1.213.891 2.389 1.015 2.554.124.165 1.754 2.676 4.254 3.75.595.256 1.058.409 1.419.524.596.19 1.14.163 1.57.099.48-.072 1.457-.595 1.663-1.17.206-.575.206-1.066.144-1.17-.062-.104-.226-.165-.472-.289z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h2v2h2V6h6v2h2V6h2v2H5zm7 6H9v-2h3v2zm0-3H9V9h3v2zm4 3h-3v-2h3v2zm0-3h-3V9h3v2z"/>
  </svg>
);

const WaveEffect = () => (
  <div style={{
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    border: "2px solid rgba(37, 211, 102, 0.5)",
    borderRadius: "50%",
    animation: "wavePulse 2s ease-out infinite",
    pointerEvents: "none",
    zIndex: -1
  }} />
);

const StarsEffect = () => {
  const stars = Array(8).fill(0);
  
  return (
    <>
      {stars.map((_, i) => (
        <div 
          key={i}
          style={{
            position: "absolute",
            fontSize: "18px",
            color: "#FFD700",
            animation: `starFly ${1 + Math.random()}s ease-out forwards`,
            transform: `rotate(${(360 / stars.length) * i}deg) translateY(-40px)`,
            opacity: 0,
            zIndex: -1
          }}
        >
          ★
        </div>
      ))}
    </>
  );
};

const WhatsAppPopup = ({ 
  commonQuestions, 
  selectedOptions, 
  customQuestion, 
  onToggleOption, 
  onCustomQuestionChange, 
  onSubmit, 
  onClose 
}) => (
  <>
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 2000,
        backdropFilter: "blur(3px)"
      }}
      onClick={onClose}
    />
    <div 
      style={{
        position: "fixed",
        bottom: "50%",
        left: "50%",
        transform: "translate(-50%, 50%)",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        borderRadius: "16px",
        zIndex: 2001,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Popup header */}
      <div style={{
        padding: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          How can we help you today?
        </h3>
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "20px"
          }}
        >
          ×
        </button>
      </div>
      
      {/* Popup body */}
      <div style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto"
      }}>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "15px", color: "#333" }}>
              Common Questions (Select any that apply):
            </h4>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "10px"
            }}>
              {commonQuestions.map((question, index) => (
                <div 
                  key={index}
                  style={{
                    padding: "12px",
                    border: `2px solid ${selectedOptions.includes(question) ? "#25D366" : "#eee"}`,
                    borderRadius: "8px",
                    backgroundColor: selectedOptions.includes(question) ? "#f0fff4" : "#f9f9f9",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => onToggleOption(question)}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(question)}
                      onChange={() => onToggleOption(question)}
                      style={{
                        accentColor: "#25D366",
                        width: "18px",
                        height: "18px",
                        cursor: "pointer"
                      }}
                    />
                    <span style={{ fontSize: "14px" }}>{question}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="customQuestion" style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#333"
            }}>
              Or ask your own question:
            </label>
            <textarea
              id="customQuestion"
              value={customQuestion}
              onChange={(e) => onCustomQuestionChange(e.target.value)}
              placeholder="Type your question here..."
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                minHeight: "80px",
                resize: "vertical",
                fontSize: "14px"
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={selectedOptions.length === 0 && !customQuestion}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: selectedOptions.length === 0 && !customQuestion ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
              opacity: (selectedOptions.length === 0 && !customQuestion) ? 0.7 : 1
            }}
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  </>
);

const BookingPopup = ({ 
  formData, 
  serviceTypes,
  counties,
  onChange, 
  onSubmit, 
  onClose 
}) => (
  <>
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 2000,
        backdropFilter: "blur(3px)"
      }}
      onClick={onClose}
    />
    <div 
      style={{
        position: "fixed",
        bottom: "50%",
        left: "50%",
        transform: "translate(-50%, 50%)",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        borderRadius: "16px",
        zIndex: 2001,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Popup header */}
      <div style={{
        padding: "20px",
        backgroundColor: "#128C7E",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          Book Your Consultation
        </h3>
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "20px"
          }}
        >
          ×
        </button>
      </div>
      
      {/* Popup body */}
      <div style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto"
      }}>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#333"
            }}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="phone" style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#333"
            }}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="serviceType" style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#333"
            }}>
              Service Required *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={onChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#fff"
              }}
            >
              <option value="">Select a service</option>
              {serviceTypes.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="preferredDate" style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#333"
              }}>
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={onChange}
                required
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="preferredTime" style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#333"
              }}>
                Preferred Time *
              </label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={onChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="county" style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#333"
            }}>
              County *
            </label>
            <select
              id="county"
              name="county"
              value={formData.county}
              onChange={onChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#fff"
              }}
            >
              <option value="">Select your county</option>
              {counties.map((county, index) => (
                <option key={index} value={county}>{county}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="nearestTown" style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#333"
            }}>
              Nearest Town *
            </label>
            <input
              type="text"
              id="nearestTown"
              name="nearestTown"
              value={formData.nearestTown}
              onChange={onChange}
              required
              placeholder="Enter your nearest town or location"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="additionalNotes" style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#333"
            }}>
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={onChange}
              placeholder="Any specific issues or details we should know?"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                minHeight: "80px",
                resize: "vertical",
                fontSize: "14px"
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#128C7E",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s ease"
            }}
          >
            Book Now via WhatsApp
          </button>
        </form>
      </div>
    </div>
    
    {/* Add global styles for animations */}
    <style jsx global>{`
      @keyframes wavePulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }
      
      @keyframes starFly {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
      
      @media (max-width: 768px) {
        .whatsapp-button-wrapper button {
          padding: 12px 16px;
          font-size: 14px;
          bottom: 16px !important;
          left: 16px !important;
        }
        
        .whatsapp-button-wrapper button span {
          display: none;
        }
        
        .whatsapp-button-wrapper button svg {
          margin-right: 0;
        }
      }
    `}</style>
  </>
);

WhatsAppButton.propTypes = {
  className: PropTypes.string,
};

export default WhatsAppButton;
