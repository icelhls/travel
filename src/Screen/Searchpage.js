import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
export default function Home({ navigation }) {
  async function getDataFromApi(data) {
    console.log(data);
    console.log("------------formed data");
    var title = "";

    var lat = "";
    var long = "";
    var pic1 = "";

    if (data.hasOwnProperty("name")) {
      title = data.name;

      lat = data.geometry.location.lat;
      long = data.geometry.location.lng;
      ///pic1 = "https://www.panpuri.com/asset/images/product/noimg.jpg";
    } else {
      title = data.description;

      lat = data.description + "lat";
      long = data.description + "long";
      /// pic1 = "https://www.panpuri.com/asset/images/product/noimg.jpg";
    }

    var placeobject = {
      _id: "60684ccf45f6d0451cf1rc88",
      title: title,
      latitude: lat,
      longitude: long,
      no: 2424,
      pic1: "https://www.panpuri.com/asset/images/product/noimg.jpg",
    };
    console.log(placeobject);
    navigation.navigate("Details", { placedata: placeobject, from: "search" });
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: "AIzaSyAhwDsbb1ky0UUyUXm-YlCDsD7diI83g9U",
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => getDataFromApi(data)}
        onFail={error => console.error(error)}
        // this in only required for use on the web. See https://git.io/JflFv more for details.
        currentLocation={true}
        currentLocationLabel="Current location"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
});
