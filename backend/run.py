import matplotlib.pyplot as plt
import matplotlib.image as mpimg
 
plt.style.use('dark_background')
import keras
from keras.models import load_model
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import BatchNormalization
from keras.layers import Conv2D, MaxPooling2D, Dense, Flatten,Activation,Dropout
from keras.preprocessing import image
from keras.utils import normalize, to_categorical
from keras import backend as K 
import numpy as np

import sys

activation='sigmoid'
img_width,img_height=150,150
 
if K.image_data_format()=='channels_first':
    input_shape=(3,img_width,img_height)
else:
    input_shape=(img_width,img_height,3)
 





model = Sequential()

 
model.add(Conv2D(32, 3, activation = activation, padding = 'same', kernel_initializer = 'he_uniform'))
model.add(BatchNormalization())
model.add(MaxPooling2D())
 
model.add(Conv2D(64, 3, activation = activation, padding = 'same', kernel_initializer = 'he_uniform'))
model.add(BatchNormalization())
 
model.add(Conv2D(64, 3, activation = activation, padding = 'same', kernel_initializer = 'he_uniform'))
model.add(BatchNormalization()) 
model.add(MaxPooling2D())
 
model.add(Flatten())
model.add(Dense(128, activation = activation, kernel_initializer = 'he_uniform'))
model.add(Dense(11, activation = 'softmax'))
 
model.compile(optimizer = 'rmsprop',loss = 'categorical_crossentropy', metrics = ['accuracy'])
model.built = True

model.load_weights('second_try.h5')

img_predict=image.load_img(str(sys.argv[1]),target_size=(150,150))
img_predict=image.img_to_array(img_predict)
img_predict=np.expand_dims(img_predict,axis=0)

rslt=model.predict_classes(img_predict)


if rslt[0]==0:
	print('Gas Stations')
elif rslt[0]==1:
	print('Guest Houses')
elif rslt[0]==2:
	print('Historcal Places')  
elif rslt[0]==3:
	print('Hotels')
elif rslt[0]==4:
	print('Meuseums')
elif rslt[0]==5:
	print('Parks')
elif rslt[0]==6:
	print('Religious Places')
elif rslt[0]==7:
	print('Restaurants')
elif rslt[0]==8:
	print('Shooping Malls')
elif rslt[0]==9:
	print('Swimming Pools')
elif rslt[0]==10:
	print('Tourist Attraction')
    