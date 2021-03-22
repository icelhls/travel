import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from '../Screen/Profile';
import Chat, { Maps } from '../Screen/Maps';
import Icon from '@expo/vector-icons/Ionicons';
import Icon2 from '@expo/vector-icons/Entypo';
import { Home } from '../Screen/Home';
import Signin from '../Screen/Signin';
import Test from '../Screen/Test';



const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                activeTintColor:'royalblue',
                inactiveTintColor:'#000119',
                style:{
                    height:65,
                    justifyContent:'center',
                    paddingVertical:15,
                    backgroundColor:'#FFF',
                    elevation:2
                }
            }}
        >
               
                 <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Icon2 name='home' color={color} size={30}/>
                        )
                    }}
                />
                 <Tab.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Icon name='ios-person' color={color} size={30}/>
                        )
                    }}
                />
                    <Tab.Screen
                    name='Chat'
                    component={Maps}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Icon name='ios-map' color={color} size={30}/>
                        )
                    }}
                />
        </Tab.Navigator>
    );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown:false
};

const AppNavigator = () => {
    return(
      
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
        >
             {/* <Stack.Screen  name="Test" component={Test} /> */}
            
           {/* <Stack.Screen  name="Signin" component={Signin} /> */}
                    <Stack.Screen  name="Home" component={BottomTabNavigator} /> 
             
                   
        </Stack.Navigator>
     
    )
}

export default AppNavigator;