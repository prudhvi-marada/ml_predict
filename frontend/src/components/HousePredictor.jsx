import React, { useState } from "react";
import axios from "axios";

const HousePredictor = () => {
  const [inputs, setInputs] = useState({
    MedInc: "", HouseAge: "", AveRooms: "", AveBedrms: "",
    Population: "", AveOccup: "", Latitude: "", Longitude: ""
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    const features = Object.values(inputs).map(Number);
    try {
      const res = await axios.post("http://127.0.0.1:5000/ml/predict-house", {
        features
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">House Price Prediction</h2>
      {Object.keys(inputs).map((key) => (
        <input
          key={key}
          type="number"
          step="any"
          name={key}
          value={inputs[key]}
          onChange={handleChange}
          placeholder={key}
          className="form-control mb-2"
        />
      ))}
      <button className="btn btn-primary mt-2 mb-3" onClick={handlePredict}>Predict Price</button>
      {prediction && <h4 className="text-success">Predicted Price: ${prediction.toFixed(2)}</h4>}
    </div>
  );
};

export default HousePredictor;
