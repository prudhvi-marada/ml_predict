import numpy as np  
from flask import Blueprint,request,jsonify 
from keras.models import load_model 

import os
current_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(current_dir, "..", "models", "house.h5")


house=Blueprint("house",__name__)
model=load_model(model_path, compile=False) 

@house.route("/predict-house",methods=["POST"])
def predict_house():
    data=request.json.get("features")
    if not data:
        return jsonify({"error":"No input data"}), 400 
    f=np.array(data).reshape(1,-1)
    p=model.predict(f)[0][0]
    return jsonify({"prediction":float(p)})