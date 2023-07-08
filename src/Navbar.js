// Navbar includes logo, and links to Clients and Purchases and a Search box.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/pottersapplogo.png';


function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search query
    navigate(`/search?q=${searchQuery}`);
    setSearchQuery('');
  };

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">  {/* navbar-expand-lg ensures that the navbar collapses into a hamburger menu on smaller screens: */}
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/clients" className="nav-link">
                  Customers
                </Link>
              </li>
              <li className="nav-item ml-3">
                <Link to="/purchases" className="nav-link">
                  Orders
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 ml-auto mr-4" onSubmit={handleSearch}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Quick Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;









