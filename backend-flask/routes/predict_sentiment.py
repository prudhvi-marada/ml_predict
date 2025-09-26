from flask import Blueprint,request,jsonify
from keras.models import load_model
import numpy as np 
from keras.preprocessing.sequence import pad_sequences 
from keras.datasets import imdb

import os
current_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(current_dir, "..", "models", "sentiment.h5")


sentiment=Blueprint("sentiment",__name__)
model=load_model(model_path, compile=False) 

word_index=imdb.get_word_index() 
m_words=5000

def text_to_sequence(text):
    text=text.lower().split()
    seq=[]
    for w in text:
        if w in word_index and word_index[w]<m_words:
            seq.append(word_index[w]+3)
        else:
            seq.append(2)
    return pad_sequences([seq],maxlen=100)

@sentiment.route("/predict-sentiment",methods=["POST"])
def predict_sentiment():
    data=request.json.get("text")

    if not data:
        return jsonify({"error":"No text received"}),400 
    seq=text_to_sequence(data)
    p=float(model.predict(seq)[0][0])
    sentiment="Positive" if p>0.5 else "Negative"

    return jsonify({
        "text":data,
        "prediction":p,
        "sentiment":sentiment
    })