import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Profile from '../Screen/Profile';
import Chat, { Maps } from '../Screen/Maps';
import Ionicons  from '@expo/vector-icons/Ionicons';
import Icon2 from '@expo/vector-icons/Entypo';
import { Home } from '../Screen/Home';
import Signin from '../Screen/Signin';
import Test from '../Screen/Test';
import Details from '../Screen/Details';



const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
       
      <Tab.Navigator
      barStyle={{ backgroundColor: '#694fad' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Maps') {
              iconName = focused ? 'ios-map' : 'ios-map';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4CCDFB',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
  
    );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown:false
};

const AppNavigator = () => {
    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
        >
              {/* <Stack.Screen  name="Test" component={Test} />              */}
           <Stack.Screen  name="Signin" component={Signin} />
                    <Stack.Screen  name="Home" component={BottomTabNavigator} />
                   <Stack.Screen  name="Details" component={Details} />   
                    
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;