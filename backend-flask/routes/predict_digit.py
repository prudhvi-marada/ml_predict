from flask import Blueprint,request,jsonify
from keras.models import load_model
import numpy as np  
import os
current_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(current_dir, "..", "models", "mnist_model.h5")


digit=Blueprint("digit",__name__)
model=load_model(model_path)

@digit.route("/predict-digit/",methods=["POST"])
def predict_digit():
    data=request.json.get("image")
    if not data:
        return jsonify({"error":"No image data is provided"}) ,400 
    image=np.array(data).reshape(1,28,28,1)/255.0
    p=model.predict(image)
    d = int(np.argmax(p))
    return jsonify({"prediction":d})