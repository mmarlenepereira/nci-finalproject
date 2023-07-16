import React from 'react';
import { AiOutlineMail, AiOutlinePhone, AiOutlineInstagram } from 'react-icons/ai';
import logo from './images/NCI_logo.png';

function Footer() {
  return (
    <footer className="footer bg-light mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-6"> {/* col-md-6 to ensure responsiveness on medium-sized screens */}
            <img src={logo} alt="Logo" style={{ width: '35%', height: 'auto' }} />
          </div>
          <div className="col-lg-6 col-md-6 text-center"> {/* col-md-6 to ensure responsiveness on medium-sized screens */}
            <p className="mb-0">The Potter's App</p>
            <p className="mb-0">Mayor Square, Dublin 1</p>
            <p className="mb-0">Ireland</p>
          </div>
          <div className="col-lg-3 col-md-6"> {/* col-md-6 to ensure responsiveness on medium-sized screens */}
            <div className="contact-info">
              <div className="contact-item">
                <AiOutlineMail />
                <p className="mb-0"></p> {/* potter@thepotterapp.com */}
                <a href="mailto:potter@thepotterapp.com">potter@thepotterapp.com</a>
              </div>
              <div className="contact-item">
                <AiOutlinePhone />
                <p className="mb-0">+353 876 123 456</p>
              </div>
              <div className="contact-item">
                <AiOutlineInstagram />
                <p className="mb-0">
                  <i>The Potter's App </i>on <a href="https://instagram.com/the_potters_app">Instagram</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white py-2">
        <div className="container text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} <i>The Potter's App.</i> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;











