import React from "react";
import { View, Text } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getToken } from "./../../globalFunction/getToken";
import axios from "axios";
const serverpoint = require("./../../config");

export default function Reviews(props) {
  async function ratingCompleted(rating) {
    var userdata = await getToken("travelapp");
    // (JSON.parse(userdata)._id);

    axios.post(serverpoint.servername + "/postReview", {
      uploderid: JSON.parse(userdata)._id,
      latitude: props.placeid.latitude,
      longitude: props.placeid.longitude,
      rating: rating,
    });

    axios
      .post(serverpoint.servername + "/fetchReviews", {
        uploderid: JSON.parse(userdata)._id,
        latitude: props.placeid.latitude,
        longitude: props.placeid.longitude,
        rating: rating,
      })
      .then(res => {
        // alert(res.data)
        alert(res.data[0].averagerating);
      });
  }
  return (
    <View>
      <Rating
        ratingCount={5}
        imageSize={60}
        showRating
        onFinishRating={ratingCompleted}
      />
    </View>
  );
}
