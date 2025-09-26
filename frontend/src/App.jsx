import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DigitPredictor from "./components/DigitPredictor";
import HousePredictor from "./components/HousePredictor";
import SentimentAnalyzer from "./components/SentimentAnalyzer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digit" element={<DigitPredictor />} />
          <Route path="/house" element={<HousePredictor />} />
          <Route path="/sentiment" element={<SentimentAnalyzer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
