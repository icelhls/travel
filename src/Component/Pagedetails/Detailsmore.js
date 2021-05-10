import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import COLORS from "../../assets/colors/colors";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const url = "https://google.com";
const phoneNumber = "+923092320065";
export default function Detailsmore() {
  const handlePressurl = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.mainview}>
      <View style={styles.detailview}>
        <Icon name="phone" size={28} color={COLORS.primary} />
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
          <Text style={styles.detailtext}>+923092320065</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailview}>
        <MaterialCommunityIcons name="web" size={28} color={COLORS.primary} />
        <TouchableOpacity onPress={handlePressurl}>
          <Text style={styles.detailtext}>www.encodersoft.co</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapview}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title="Test Title"
            description="This is the test description"
          ></Marker>
        </MapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  detailview: {
    flexDirection: "row",
    marginTop: 15,
  },
  detailtext: {
    marginLeft: 15,
    fontSize: 18,
    // fontWeight: "bold",
  },
  mapview: {
    marginTop: 20,
    padding: 5,
  },
  map: {
    height: "50%",
  },
});
