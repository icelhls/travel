#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas
import re
import math
df = pandas.read_csv("T:/weblocaldeal-back-end/all places list.csv",error_bad_lines=False, engine="python")


# In[2]:


df.shape
df.head() 


# In[3]:


df.head()
df2=df[["no","placeUrl","title","rating","category","latitude","longitude","pic1","pic2","pic3","pic4","pic5"]]


# In[17]:


df3 = df2.dropna(subset=['latitude'])
inputLong=74.2227181
inputLat=31.4137617

def degreesToRadians(degrees):
  return degrees * math.pi / 180;

def distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2):
  earthRadiusKm = 6371;
  dLat = degreesToRadians(lat2-lat1);
  dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  a = math.sin(dLat/2) * math.sin(dLat/2) +math.sin(dLon/2) * math.sin(dLon/2) * math.cos(lat1) * math.cos(lat2); 
  c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a)); 
  return earthRadiusKm * c;

mydf2=[]
for index,row in df3.iterrows():
  if isinstance(row['category'],float):
    pass
  else:
    if(re.match(row['category'],'Restaurants') or re.match(row['category'],'Historical Place',flags=re.IGNORECASE)):
      calCoor=distanceInKmBetweenEarthCoordinates(inputLat,inputLong,int(row['latitude']),int(row['longitude']))
      s1 = pandas.Series([calCoor],index=['coordinates'])
      row1=row.append(s1)
      mydf2.append(row1)

newlist = sorted(mydf2, key=lambda x: x.coordinates,)
print(newlist)


# In[ ]:




