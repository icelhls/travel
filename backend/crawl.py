# -*- coding: utf-8 -*-
"""
Created on Mon Oct 12 16:27:45 2020

@author: Muhammad Saeeed
"""

import pandas
import time
import numpy as np
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

outputarray1=[]
outputarray2=[]
outputarray3=[]
outputarray4=[]
outputarray5=[]
outputarray6=[]
array=[]

df = pandas.read_csv("Rest Houses.csv")

array=df["title"]
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)
browser = webdriver.Chrome(chrome_options=options, executable_path=r'chromedriver.exe')
browser.get('https://www.google.com/imghp?hl=EN')
for x in array:
    try:
        
        browser.execute_script("window.open('https://www.google.com/imghp?hl=EN', '_blank')")
        browser.switch_to.window(browser.window_handles[1])
        search = browser.find_element_by_name('q')
        search.send_keys(x)
        search.send_keys(Keys.RETURN) # hit return after you enter search text
        time.sleep(5) # sleep for 5 seconds so you can see the results

        outputarray1.append(browser.execute_script(" return document.getElementsByClassName('rg_i Q4LuWd')[0].getAttribute('src')"))
       # df["pic1"] = outputarray1
        
       
        
        outputarray2.append(browser.execute_script(" return document.getElementsByClassName('rg_i Q4LuWd')[1].getAttribute('src')"))
        
       
        
        outputarray3.append(browser.execute_script(" return document.getElementsByClassName('rg_i Q4LuWd')[2].getAttribute('src')"))
        outputarray4.append(browser.execute_script(" return document.getElementsByClassName('rg_i Q4LuWd')[3].getAttribute('src')"))
       
        outputarray5.append(browser.execute_script(" return document.getElementsByClassName('rg_i Q4LuWd')[4].getAttribute('src')"))
        outputarray6.append("1")
        raw_data = {'pic1': outputarray1, 
        'pic2':outputarray2,'pic3':outputarray3,'pic4':outputarray4,'pic5':outputarray5,'random':outputarray6 }
        df1 = pandas.DataFrame(raw_data, columns = ['pic1','pic2','pic3','pic4','pic5','random'])
        
        df1.to_csv('saeed1.csv') 
        browser.close()
        browser.switch_to.window(browser.window_handles[0])
    except:
        browser.close()
        browser.switch_to.window(browser.window_handles[0])
        outputarray1.append("")
       # df["pic1"] = outputarray1
        
       
        
        outputarray2.append("")
        outputarray3.append("")
        outputarray4.append("")
        outputarray5.append("")
        outputarray6.append("1")
        
        raw_data = {'pic1': outputarray1, 
        'pic2':outputarray2,'pic3':outputarray3,'pic4':outputarray4,'pic5':outputarray5,'random':outputarray6 }
        #df1 = pandas.DataFrame(raw_data, columns = ['pic1','pic2','pic3','pic4','pic5','random'])
        
        #df1.to_csv('saeed.csv') 
       
        
   
        
       
        print("smeexcemtoon at")
        print(x)
       
         


df["pic1"] = outputarray1
df["pic2"] = outputarray2
df["pic3"] = outputarray3
df["pic4"] = outputarray4
df["pic5"] = outputarray5
df["random"] = outputarray6

df.to_csv('Rest Houses.csv')
    
      
##dict = {'pic1': outputarray1, 'pic2': outputarray2, 'pic3': outputarray3,'pic4': outputarray4,'pic5': outputarray5}  

##df = pandas.DataFrame(dict)\











    
