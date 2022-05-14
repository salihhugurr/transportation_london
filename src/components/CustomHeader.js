import React from "react";
import {Header} from "react-native-elements";
import {AppColor} from "../constants";


export const CustomHeader = ({title}) => {
    return(
        <Header
            backgroundColor={AppColor}
            centerComponent={{ text: title,style:{color:"#fefefe",fontSize:16}}}
        />
    )
}