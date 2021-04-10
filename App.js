import { StatusBar } from "expo-status-bar";
import React from "react";

import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigations/Navigator";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer1 from "./reducer/reducer1";
import { PersistGate } from "redux-persist/integration/react";
const master = combineReducers({
  age: reducer1,
});
const store = createStore(master, applyMiddleware(thunk));
export default class App extends React.Component {
  state = {
    isFontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      RobotoBold: require("./src/fonts/Roboto-Bold.ttf"),
      RobotoRegular: require("./src/fonts/Roboto-Regular.ttf"),
    });
    this.setState({ isFontLoaded: true });
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
