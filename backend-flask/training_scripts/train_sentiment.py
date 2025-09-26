import numpy as np 
from keras.layers import Embedding,LSTM,Dense
from keras.models import Sequential 
from keras.datasets import imdb 
from keras.preprocessing.sequence import pad_sequences

(x_train,y_train),(x_test,y_test)=imdb.load_data(num_words=5000)

x_train=pad_sequences(x_train,maxlen=100)
x_test=pad_sequences(x_test,maxlen=100)

model=Sequential([
    Embedding(5000,128,input_length=100),
    LSTM(64),
    Dense(1,activation='sigmoid')  
])

model.compile(optimizer='adam', loss='binary_crossentropy',metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=128,epochs=2,validation_split=0.2)
print("Model Trained.....")

model.save('../models/sentiment.h5') 
print("Model Saved.....")
