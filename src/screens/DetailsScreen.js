import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, StatusBar, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import FavIcon from "../assets/Icons/FavIcon";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import {useDispatch, useSelector} from "react-redux";
import {addFav, removeFav} from "../redux/action";
import {ww} from "../helpers";

const DetailsScreen = ({route}) => {
    const {list, distance} = route.params;
    const navigation = useNavigation();
    const {favorites} = useSelector(state => state.favReducer);
    const dispatch = useDispatch();
    const addToFav = fav => dispatch(addFav(fav));
    const removeFromFav = fav => dispatch(removeFav(fav));

    const handleAddFav = fav => {
        addToFav(fav);
    };

    const handleRemoveFav = fav => {
        removeFromFav(fav);
    };

    const ifExists = fav => {
        console.log(favorites);
        if (favorites.filter(item => item.id === fav.id).length > 0) {
            return true;
        } else return false;
    };
    return(
      <View>
        <Text>Detail</Text>
      </View>
    )
}



export default DetailsScreen;
