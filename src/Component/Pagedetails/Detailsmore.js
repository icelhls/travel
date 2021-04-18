import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../assets/colors/colors";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Detailsmore() {
  return (
    <View style={styles.mainview}>
      <View style={styles.detailview}>
        <Icon name="phone" size={28} color={COLORS.primary} />
        <Text style={styles.detailtext}>+923092320065</Text>
      </View>
      <View style={styles.detailview}>
        <MaterialCommunityIcons name="web" size={28} color={COLORS.primary} />
        <Text style={styles.detailtext}>www.encodersoft.co</Text>
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
});
