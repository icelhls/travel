import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
export default function Searchpage() {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: "AIzaSyAhwDsbb1ky0UUyUXm-YlCDsD7diI83g9U",
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
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
