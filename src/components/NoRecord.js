import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { wh, ww } from "../helpers";
import { AppColor, FONTS, Secondary } from "../constants";
import { Icon } from "react-native-elements";

const NoRecord = ({ color, size, textSize }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon type={"font-awesome"} name={"bus"} size={size || ww(.07)} color={color || Secondary} />
        <Text style={[styles.text, { color: color || "#666", fontSize: textSize || ww(.035) }]}>Can not find
          anything</Text>
      </View>
    </View>
  );
};

export default NoRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", alignContent: "center", alignSelf: "center",

  },
  text: {
    color: "#666",
    fontSize: ww(.035),
    fontFamily: FONTS.medium,
    marginLeft: ww(.02),
  },
  editIcon: {
    right: ww(0.07),
  },
});
