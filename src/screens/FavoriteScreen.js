import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView, TextInput, Keyboard,
} from "react-native";
import FavIcon from "../assets/Icons/FavIcon";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../redux/action";
import {  wh, ww } from "../helpers";
import { Secondary, STYLES } from "../constants";
import { Divider, Icon } from "react-native-elements";
import { CustomHeader, Loader, NoRecord } from "../components";

const FavoriteScreen = ({ route }) => {
  const navigation = useNavigation();
  const { favorites } = useSelector(state => state.favReducer);
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


  const renderLines = ({ item, index }) => {
    const start = item.routeSections[0].originationName;
    const end = item.routeSections[0].destinationName;
    return (
      <>
        <TouchableOpacity style={STYLES.lineWrapper}
                          onPress={()=>navigation.navigate("LineDetail",{id:item.id})}>
          <View style={STYLES.centeredRow}>
            <Icon name={"bus"} type={"font-awesome"} color={Secondary} />
            <Text style={STYLES.lineNameText}>{item.name}</Text>
          </View>
          <View style={STYLES.centered}>
            <View style={STYLES.centeredRow}>
              <Icon name={"arrow-right"} type={"foundation"} color={"green"}/>
              <Text style={STYLES.lineNameText}>{start}</Text>
            </View>
            <View style={STYLES.centeredRow}>
              <Icon name={"arrow-left"} type={"foundation"} color={"red"}/>
              <Text style={STYLES.lineNameText}>{end}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={STYLES.centeredRow}
            onPress={() => {
              ifExists(item) ? handleRemoveFav(item) : handleAddFav(item);
            }}>
            {
              ifExists(item) ? <FavIcon color={Secondary} size={ww(.06)}/> : <FavIconUnfilled color={Secondary} size={ww(.06)}/>
            }
          </TouchableOpacity>
        </TouchableOpacity>
        <Divider />
      </>

    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <CustomHeader title={"Favorites"}/>
      {
        favorites.length > 0 &&
        <FlatList
          data={favorites}
          renderItem={renderLines}
          keyExtractor={((item, index) => index.toString())}
        />
      }
      {
        favorites.length === 0 &&
        <NoRecord />
      }

    </SafeAreaView>
  );
};


export default FavoriteScreen;
