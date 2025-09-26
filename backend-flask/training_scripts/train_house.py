import numpy as np 
from sklearn.datasets import fetch_california_housing 
from keras.layers import Dense 
from keras.models import Sequential 
from sklearn.model_selection import train_test_split 
from sklearn.preprocessing import StandardScaler 
scaler=StandardScaler()
data=fetch_california_housing()
x,y=data.data,data.target 

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=42)

x_train=scaler.fit_transform(x_train)
x_test=scaler.fit_transform(x_test)

model=Sequential([
    Dense(64,activation='relu',input_shape=(x_train.shape[1],)),
    Dense(32,activation='relu'),
    Dense(1)
])

model.compile(optimizer='adam',loss='mse',metrics=['mae'])

model.fit(x_train,y_train,batch_size=32,epochs=5,validation_split=0.1)
print("Model Trained.....")

model.save("../models/house.h5")
print("Model Saved.....")
