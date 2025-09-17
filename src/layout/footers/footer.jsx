import React from 'react';
import Link from 'next/link';
// internal
import pay from '@assets/img/footer/footer-pay.png';
import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';

const Footer = ({ style_2 = false, style_3 = false, primary_style = false }) => {
  return (
    <footer>
      <div
        className={`tp-footer-area ${primary_style ? 'tp-footer-style-2 tp-footer-style-primary tp-footer-style-6' : ''} ${style_2 ? 'tp-footer-style-2' : style_3 ? 'tp-footer-style-2 tp-footer-style-3' : ''}`}
        data-bg-color={`${style_2 ? 'footer-bg-white' : 'footer-bg-grey'}`}
      >
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row">
              {/* LOGO SECTION WITH TEXT */}
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/" style={{ textDecoration: 'none' }}>
                        <span
                          style={{
                            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                            fontWeight: '700',
                            fontSize: '22px',
                            letterSpacing: '1.2px',
                            color: '#1A1A1A',
                            textTransform: 'uppercase',
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            background: 'linear-gradient(90deg, #007CF0, #00DFD8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          ARCHIM ELECTRONICS
                        </span>
                      </Link>
                    </div>
                    <p className="tp-footer-desc">
                      We are a passionate electronics and tech solutions provider based in Kenya, committed to innovation and quality.
                    </p>
                    <div className="tp-footer-social">
                      {social_data.map((s) => (
                        <a href={s.link} key={s.id} target="_blank" rel="noopener noreferrer">
                          <i className={s.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              

              {/* INFORMATION SECTION */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Information</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="#">Terms & Conditions</a></li>
                      <li><a href="#">Latest News</a></li>
                      <li><a href="#">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TALK TO US SECTION */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">Talk To Us</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <span>Have questions? Call us</span>
                      <h4><a href="tel:0713735187">0713 735 187</a></h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span><Email /></span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p><a href="mailto:archimnet@gmail.com">archimnet@gmail.com</a></p>
                        </div>
                      </div>
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span><Location /></span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://www.google.com/maps/place/Kiambu,+Kenya"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Kiambu, Kenya
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p>
                      © {new Date().getFullYear()} ARCHIM ELECTRONICS. All Rights Reserved
                      
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
