import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    StatusBar, TextInput, Keyboard
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { addFav, removeFav } from "../redux/action";


const HomeScreen = () => {
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

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default HomeScreen
