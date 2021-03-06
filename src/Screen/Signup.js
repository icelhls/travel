import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { useScreens } from "react-native-screens";

//  import * as Animatable from 'react-native-animatable';

export default function Signup({ navigation }) {
  const serverpoint = require("../config");

  const [username, setusername] = useState("");

  const [name, setname] = useState("");
  const [nameerror, setnameerror] = useState("");

  const [usernameerror, setusernameerror] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");

  const [passerror, setpasserror] = useState("");
  const [cpasserror, setcpasserror] = useState("");

  const validname = () => {
    if (!name != "" || name.length < 3) {
      return false;
    }

    return true;
  };

  const validusername = () => {
    if (!username != "") {
      return false;
    }

    return true;
  };
  const validpass = () => {
    if (!pass != "" || pass.length < 5) {
      return false;
    }

    return true;
  };
  const validcpass = () => {
    if (pass != cpass) {
      return false;
    }

    return true;
  };

  async function facebooklogIn() {
    try {
      await Facebook.initializeAsync("1667224953462264");
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        /// Alert.alert('Logged in!', `Hi ${(await response.json())}!`);
        const finalresponse = await response.json();
        console.log(finalresponse);
        axios
          .post(serverpoint.servername + "/signupfacebook", {
            fid: finalresponse.id,
            name: finalresponse.name,
          })
          .then(res => {
            // alert(res.data)
            // console.log(res.data)
            storetoken("travelapp", res.data);
          });
        ////  alert(final.id)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const storetoken = async (key, item) => {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      console.log("Added in local host");
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettoken = async key => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);

      if (item != null) {
        return retrievedItem;
      } else {
        return "";
      }
    } catch (error) {
      console.log(error.message);
    }
    return;
  };

  async function googlelogin() {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId:
        "1058542661103-stjukh4vl9m06be8m6m7l0g8ihsv9gch.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */

      axios
        .post(serverpoint.servername + "/signupgoogle", {
          email: user.email,
          gid: user.id,
          img: user.photoUrl,
        })
        .then(res => {
          alert("Sign In for Login");
          console.log(res.data);
        });
    }
  }

  async function logininnow() {
    if (validname()) {
      setnameerror("");
    } else {
      setnameerror("Please enter Name");
    }

    if (validusername()) {
      setusernameerror("");
    } else {
      setusernameerror("Please enter valid Email ");
    }

    if (validpass()) {
      setpasserror("");
    } else {
      setpasserror("Please enter valid Pass(at least have 5 digit)");
    }

    if (validcpass()) {
      setcpasserror("");
    } else {
      setcpasserror("Password And Confirm  Password not Same");
    }

    if (validcpass() && validname() && validpass() && validusername()) {
      axios
        .post(serverpoint.servername + "/signupemail", {
          name: name,
          email: username,
          pass: pass,
        })
        .then(res => {
          alert("Sign In for Login");
        });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <Image
        style={{ width: "100%", height: 200 }}
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 25, color: "black", marginTop: 10 }}>
        Welcome Back!{" "}
      </Text>
      <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
        Sign up in to continue
      </Text>

      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="Name"
        onChangeText={setname}
      />
      <Text style={{ color: "red" }}>{nameerror}</Text>

      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="Username"
        onChangeText={setusername}
      />
      <Text style={{ color: "red" }}>{usernameerror}</Text>
      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setpass}
      />

      <Text style={{ color: "red" }}>{passerror}</Text>

      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={setcpass}
      />
      <Text style={{ color: "red" }}>{cpasserror}</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => logininnow()}
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
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={{ marginTop: 20 }}>skip</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#3f51b5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}
              onPress={facebooklogIn}
            >
              f
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#f44336",
              marginHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}
              onPress={googlelogin}
            >
              G
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#1565c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}>
              in
            </Text>
          </View>
        </View>

        <View
          style={{ flexDirection: "row", marginVertical: 50, marginTop: 10 }}
        >
          <Text style={{ color: "black" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={{ fontWeight: "bold" }}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
