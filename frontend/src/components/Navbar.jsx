import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AI/ML Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/digit">Digit Predictor</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/house">House Predictor</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sentiment">Sentiment Analyzer</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
