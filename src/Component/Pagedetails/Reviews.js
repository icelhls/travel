import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getToken } from "./../../globalFunction/getToken";
import axios from "axios";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
const serverpoint = require("./../../config");

export default function Reviews(props) {
  const [avvgRating, setavvgRating] = React.useState("");
  const [postComment, setpostComment] = React.useState("");
  const [allComments, setallComments] = React.useState([]);
  async function passComment() {
    var userdata = await getToken("travelapp");
    axios.post(serverpoint.servername + "/postComments", {
      uploderid: JSON.parse(userdata)._id,
      latitude: props.placeid.latitude,
      longitude: props.placeid.longitude,
      comment: postComment,
    });
  }

  async function checkReviews() {
    var userdata = await getToken("travelapp");
    axios
      .post(serverpoint.servername + "/fetchReviews", {
        uploderid: JSON.parse(userdata)._id,
        latitude: props.placeid.latitude,
        longitude: props.placeid.longitude,
      })
      .then(res => {
        // alert(res.data)
        setavvgRating(res.data[0].averagerating);
      });
  }

  async function fetchComments() {
    axios
      .post(serverpoint.servername + "/fetchComments", {
        latitude: props.placeid.latitude,
        longitude: props.placeid.longitude,
      })
      .then(res => {
        console.log(res.data);

        setallComments(res.data);
      });
  }
  async function ratingCompleted(rating) {
    var userdata = await getToken("travelapp");
    // (JSON.parse(userdata)._id);

    axios.post(serverpoint.servername + "/postReview", {
      uploderid: JSON.parse(userdata)._id,
      latitude: props.placeid.latitude,
      longitude: props.placeid.longitude,
      rating: rating,
    });
  }
  useEffect(() => {
    checkReviews();
    fetchComments();
  }, []);

  return (
    <View>
      <Rating
        ratingCount={5}
        imageSize={60}
        showRating
        onFinishRating={ratingCompleted}
      />
      <Text>Rating:{avvgRating}</Text>

      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="comment"
        onChangeText={setpostComment}
      />

      <TouchableOpacity
        onPress={() => passComment()}
        style={{
          width: 200,
          backgroundColor: "#0d47a1",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          marginTop: 30,
        }}
      >
        <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
          Post Comment
        </Text>
      </TouchableOpacity>
    </View>
  );
}
