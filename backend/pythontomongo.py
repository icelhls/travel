#!/usr/bin/env python
# coding: utf-8

# In[5]:

from pymongo import MongoClient
import pandas
import re
import math
import sys
import json
df = pandas.read_csv("F:/react projects/travel/backend/all places list.csv",error_bad_lines=False, engine="python")
client = MongoClient("mongodb://localhost:27017")  # Remember your uri string
col = client['travelapp']['model']

# In[2]:


df.shape
df.head() 


# In[3]:


df.head()
df2=df[["no","placeUrl","title","rating","category","latitude","longitude","pic1","pic2","pic3","pic4","pic5"]]
data = df2.to_dict(orient='records')  # Here's our added param..

col.insert_many(data)

# In[40]:



# In[ ]:




