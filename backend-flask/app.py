from flask import Flask,jsonify 
from routes.predict_digit import digit
from routes.predict_house import house
from routes.predict_sentiment import sentiment 
from flask_cors import CORS  

app=Flask(__name__)
CORS(app)

app.register_blueprint(digit,url_prefix="/ml")
app.register_blueprint(house,url_prefix="/ml")
app.register_blueprint(sentiment,url_prefix="/ml")

@app.route("/",methods=["GET"])
def home():
    return jsonify({"message":"Flask server is running"}) 

if __name__=="__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
