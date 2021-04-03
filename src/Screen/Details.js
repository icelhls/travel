import React, { useRef } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Animated,
  ScrollView,
  View,
  Text,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import COLORS from "../assets/colors/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "./Profile";
import Signin from "./Signin";
import Detailsmore from "../Component/Pagedetails/Detailsmore";
import Reviews from "../Component/Pagedetails/Reviews";
import Placepics from "../Component/Pagedetails/Placepics";

var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
const BANNER_H = 270;
const TOPNAVI_H = 50;
const Tab = createMaterialTopTabNavigator();

export default function Details({ navigation, route }) {
  const place = route.params;
  const scrollA = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="black" />
      <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={style.bannerContainer}>
          <AnimatedImage
            style={style.banner(scrollA)}
            source={{
              uri:
                "https://image.freepik.com/free-photo/beautiful-wooden-pathway-going-breathtaking-colorful-trees-forest_181624-5840.jpg",
            }}
          >
            <View style={style.header}>
              <Icon
                name="arrow-back"
                size={28}
                color={COLORS.white}
                onPress={() => navigation.navigate("Home")}
              />
              <Icon name="more-vert" size={28} color={COLORS.white} />
            </View>
            <View style={style.imageDetails}>
              <Text
                style={{
                  width: "70%",
                  fontSize: 30,
                  fontWeight: "bold",
                  color: COLORS.white,
                  marginBottom: 20,
                }}
              >
                asda
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Icon name="star" size={30} color={COLORS.orange} />
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  5.0
                </Text>
              </View>
            </View>
          </AnimatedImage>
        </View>
        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <Icon name="favorite" color={COLORS.red} size={30} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Icon name="place" size={28} color={COLORS.primary} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              gdfg
            </Text>
          </View>

          {/* <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
            About the trip
          </Text> */}
        </View>
        <Tab.Navigator>
          <Tab.Screen name="Details" component={Detailsmore} />
          <Tab.Screen name="Reviews" component={Reviews} />
          <Tab.Screen name="Pictures" component={Placepics} />
        </Tab.Navigator>
        {/* <View style={style.footer}>
  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
    <Text
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
      }}>
      $100
    </Text>
    <Text
      style={{
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.grey,
        marginLeft: 2,
      }}>
      /PER DAY
    </Text>
  </View>
  <View style={style.bookNowBtn}>
    <Text
      style={{color: COLORS.primary, fontSize: 16, fontWeight: 'bold'}}>
      Book Now
    </Text>
  </View>
</View> */}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: scrollA => ({
    height: BANNER_H,
    // flex: 0.5,
    width: "100%",
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});
