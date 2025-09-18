import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// internal
import { CloseTwo } from '@/svg';
import contact_img from '@assets/img/icon/contact.png';
import MobileMenus from './mobile-menus';

// Logo component with enhanced styling - matching the header and footer
const LogoComponent = () => (
  <div>
    <Link href="/">
      <div style={{ 
        display: 'inline-block',
        padding: '8px 12px',
        backgroundColor: '#f0fdf4', // Light green background
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '2px solid #22c55e'
      }}>
        <span style={{ 
          color: '#15803d', // Darker green for text (green-700)
          fontWeight: '800', 
          fontSize: 'clamp(20px, 3vw, 32px)',
          letterSpacing: '0.5px',
          fontFamily: "'Montserrat', sans-serif",
          textTransform: 'uppercase'
        }}>
          Archim<span style={{ color: '#22c55e' }}>Electronics</span>
        </span>
      </div>
    </Link>
  </div>
);

const OffCanvas = ({ isOffCanvasOpen, setIsCanvasOpen }) => {
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);

  // handle language active
  const handleLanguageActive = () => {
    setIsLanguageActive(!isLanguageActive)
    setIsCurrencyActive(false)
  }
  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive)
    setIsLanguageActive(false)
  }
  return (
    <>
      <div className={`offcanvas__area offcanvas__radius ${isOffCanvasOpen ? "offcanvas-opened" : ""}`}>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__close">
            <button onClick={() => setIsCanvasOpen(false)} className="offcanvas__close-btn offcanvas-close-btn">
              <CloseTwo />
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <LogoComponent />
              </div>
            </div>

            <div className="tp-main-menu-mobile fix d-lg-none mb-40">
              <MobileMenus />
            </div>

            <div className="offcanvas__contact align-items-center d-none">
              <div className="offcanvas__contact-icon mr-20">
                <span>
                  <Image src={contact_img} alt="contact_img" />
                </span>
              </div>
              <div className="offcanvas__contact-content">
                <h3 className="offcanvas__contact-title">
                  <a href="tel:0713735187">0713735187</a>
                </h3>
              </div>
            </div>
           <div className="offcanvas__btn">
  <Link 
    href="https://www.archimnet.com/" 
    className="tp-btn-2 tp-btn-border-2 premium-btn"
    style={{
      background: 'linear-gradient(135deg, #f5d480 0%, #e8b339 50%, #f5d480 100%)',
      border: '1px solid #d4a017',
      color: '#2a2118',
      fontWeight: '600',
      textShadow: '0 1px 1px rgba(255,255,255,0.3)',
      boxShadow: '0 4px 15px rgba(232, 179, 57, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      padding: '12px 30px',
      borderRadius: '6px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(232, 179, 57, 0.5)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(232, 179, 57, 0.3)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <span style={{
      position: 'relative',
      zIndex: 2
    }}>
      Access Archim Net
    </span>
   
  </Link>
</div>
          </div>
          <div className="offcanvas__bottom">
            <div className="offcanvas__footer d-flex align-items-center justify-content-between">
              <div className="offcanvas__currency-wrapper currency">
                <span onClick={handleCurrencyActive} className="offcanvas__currency-selected-currency tp-currency-toggle" id="tp-offcanvas-currency-toggle">Currency : KSH</span>
                <ul className={`offcanvas__currency-list tp-currency-list ${isCurrencyActive ? 'tp-currency-list-open' : ''}`}>
                  <li>KSH</li>
                </ul>
              </div>
              <div className="offcanvas__select language">
                <div className="offcanvas__lang d-flex align-items-center justify-content-md-end">
                 <div className="offcanvas__lang-img mr-15">
                  <Image
                    src="https://flagcdn.com/w40/ke.png"
                    alt="Kenyan flag"
                    width={30}
                    height={20}
                  />
                </div>

                  <div className="offcanvas__lang-wrapper">
                    <span onClick={handleLanguageActive} className="offcanvas__lang-selected-lang tp-lang-toggle" id="tp-offcanvas-lang-toggle">English</span>
                    <ul className={`offcanvas__lang-list tp-lang-list ${isLanguageActive ? 'tp-lang-list-open' : ''}`}>
                      <li>English</li>
                      <li>Kiswahili</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body overlay start */}
      <div onClick={() => setIsCanvasOpen(false)} className={`body-overlay ${isOffCanvasOpen ? 'opened' : ''}`}></div>
      {/* body overlay end */}
    </>
  );
};

export default OffCanvas;
