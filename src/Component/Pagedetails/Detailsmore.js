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
export default function Detailsmore(props) {
  var mylat = 0;
  var mylong = 0;
  var category = "";
  var GoogleRating = "";
  var Address = "";
  var TotalUSerRating = "";
  var placeType = "";
  let checklat = props.placeid.latitude.toString();

  let lastWord = checklat.substring(checklat.length - 3, checklat.length);

  if (lastWord == "lat") {
    ///  alert("no location");
  } else {
    mylat = props.placeid.latitude;
    mylong = props.placeid.longitude;
  }

  if (props.placeid.hasOwnProperty("category")) {
    category = category = "Category:" + props.placeid.category;
  }
  if (props.placeid.hasOwnProperty("rating")) {
    if (props.placeid.rating != null) {
      GoogleRating = "Google Rating:" + props.placeid.rating;
    }
  }

  if (props.placeid.hasOwnProperty("alldata")) {
    console.log("-------hahahha---");

    console.log(props.placeid.alldata);

    //  alert(props.placeid.alldata.types);

    if (props.placeid.alldata.hasOwnProperty("vicinity")) {
      Address = "Address :" + props.placeid.alldata.vicinity;
    }
    if (props.placeid.alldata.hasOwnProperty("rating")) {
      GoogleRating = "Google Rating:" + props.placeid.alldata.rating;
    }
    if (props.placeid.alldata.hasOwnProperty("rating")) {
      TotalUSerRating =
        "Total USer Rating:" + props.placeid.alldata.user_ratings_total;
    }
    if (props.placeid.alldata.hasOwnProperty("types")) {
      placeType = "Place Type:" + props.placeid.alldata.types;
    }
  }

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

  const getMapRegion = () => ({
    latitude: mylat,
    longitude: mylong,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.mainview}>
      <View style={styles.detailview}>
        {/* <Icon name="phone" size={28} color={COLORS.primary} /> */}
        {/* <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}> */}
        {category != "" ? (
          <Text style={styles.detailtext}>{category}</Text>
        ) : null}

        {/* </TouchableOpacity> */}
      </View>
      <View style={styles.detailview}>
        {/* <MaterialCommunityIcons name="web" size={28} color={COLORS.primary} /> */}
        <TouchableOpacity onPress={handlePressurl}>
          {/* <Text style={styles.detailtext}>www.encodersoft.co</Text> */}

          {GoogleRating != "" ? (
            <Text style={styles.detailtext}>{GoogleRating}</Text>
          ) : null}

          {Address != "" ? (
            <Text style={styles.detailtext}>{Address}</Text>
          ) : null}

          {TotalUSerRating != "" ? (
            <Text style={styles.detailtext}>{TotalUSerRating}</Text>
          ) : null}

          {placeType != "" ? (
            <Text style={styles.detailtext}>{placeType}</Text>
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.mapview}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={getMapRegion()}
        >
          {/* <Marker
            coordinate={getMapRegion()}
            title="Test Title"
            description="This is the test description"
          >
            <Callout tooltip></Callout>
          </Marker> */}
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
    height: "70%",
  },
});
