import React from "react";
import { Divider, Header, Icon } from "react-native-elements";
import { AppColor, FONTS, titleSize } from "../constants";
import { titleCase, wh, ww } from "../helpers";
import { Text, TouchableOpacity, View } from "react-native";


export const CustomHeader = ({ title,onPressLeft,onPressRight }) => {
  return (
    <View style={{ justifyContent: "center", position: "relative", alignItems: "center", paddingVertical: wh(.02),borderBottomWidth:.2,borderColor:"#afafaf" }}>
      {
        onPressLeft &&
        <TouchableOpacity style={{ position: "absolute", left: ww(.08) }} onPress={onPressLeft}>
          <Icon name={"arrow-back-outline"} type={"ionicon"} size={ww(.07)} color={AppColor} />
        </TouchableOpacity>
      }
      <Text style={{ fontSize: titleSize, color: AppColor, fontFamily: FONTS.semi }}>{titleCase(title)}</Text>
      {
        onPressRight &&
        <TouchableOpacity style={{ position: "absolute", left: ww(.08) }} onPress={onPressRight}>
          <Icon name={"heart"} type={"feather"} size={ww(.07)} color={AppColor} />
        </TouchableOpacity>
      }
    </View>
  );
};
