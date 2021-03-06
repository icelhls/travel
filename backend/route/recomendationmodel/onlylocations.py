#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pandas
import re
import math
import sys
import json
df = pandas.read_csv("F:/react projects/travel/backend/route/recomendationmodel/all places list.csv",error_bad_lines=False, engine="python")


# In[2]:


df.shape
df.head() 


# In[3]:


df.head()
df2=df[["no","placeUrl","title","rating","category","latitude","longitude","pic1","pic2","pic3","pic4","pic5"]]


# In[40]:


df3 = df2.dropna(subset=['latitude'])

inputLong=float(sys.argv[1])
inputLat=float(sys.argv[2])

#print(type(sys.argv[1]))

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
jsonConveredList=[]
for x in newlist[:10]:
    #x1=x.to_json()
    x1=x.to_dict()
    jsonConveredList.append(x1)
    
jsonStr = json.dumps(jsonConveredList)
print(jsonStr)
sys.stdout.flush()


# In[ ]:




