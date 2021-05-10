import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getToken } from "./../../globalFunction/getToken";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
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
    <View style={styles.mainview}>
      <View style={styles.comment}>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    "https://img.freepik.com/free-vector/man-shows-gesture-great-idea_10045-637.jpg?size=338&ext=jpg",
                }}
              />
            </Left>
            <Body>
              <Text style={styles.commentname}>Ibad</Text>
              <Text note>Doing what you like will always keep</Text>
            </Body>
            <Right>
              <Rating
                showRating
                imageSize={12}
                ratingCount={5}
                startingValue={4}
                showRating={false}
                readonly={true}
              />
            </Right>
          </ListItem>
        </List>
      </View>

      <View style={styles.rating}>
        <AirbnbRating
          count={5}
          size={30}
          selectedColor="#f1c40f"
          showRating
          onFinishRating={ratingCompleted}
        />
        {/* <Text>{avvgRating}</Text> */}
      </View>
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

      <TouchableOpacity style={styles.textinput} onPress={() => passComment()}>
        <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  rating: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 10,
  },
  comment: {
    marginTop: 15,
  },
  commentname: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textinput: {
    width: 100,
    backgroundColor: "#0d47a1",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 30,
  },
});
