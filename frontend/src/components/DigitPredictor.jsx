import React, { useState } from "react";
import axios from "axios";

const DigitPredictor = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    if (!file) return alert("Please select an image");

    const reader = new FileReader();
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 28;
        canvas.height = 28;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 28, 28);
        const imgData = ctx.getImageData(0, 0, 28, 28).data;
        const grayscale = [];
        for (let i = 0; i < imgData.length; i += 4) {
          const avg = (imgData[i] + imgData[i+1] + imgData[i+2]) / 3;
          grayscale.push(avg);
        }
        try {
          const res = await axios.post("http://127.0.0.1:5000/ml/predict-digit/", {
            image: grayscale
          });
          setResult(res.data.prediction);
        } catch (err) {
          console.error(err);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Digit Recognition</h2>
      <input type="file" accept="image/*" className="form-control mb-3" onChange={handleFileChange} />
      <button className="btn btn-primary mb-3" onClick={handlePredict}>Predict Digit</button>
      {result !== "" && <h4 className="text-success">Predicted Digit: {result}</h4>}
    </div>
  );
};

export default DigitPredictor;
