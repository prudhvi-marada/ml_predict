import React, { useState } from "react";
import axios from "axios";

const SentimentAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    if (!text) return alert("Please enter some text");
    try {
      const res = await axios.post("http://127.0.0.1:5000/ml/predict-sentiment", { text });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Sentiment Analysis</h2>
      <textarea
        className="form-control mb-3"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />
      <button className="btn btn-primary mb-3" onClick={handlePredict}>Predict Sentiment</button>
      {result && (
        <div className={`alert ${result.sentiment === "Positive" ? "alert-success" : "alert-danger"}`}>
          Sentiment: {result.sentiment} (Score: {result.prediction.toFixed(2)})
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
