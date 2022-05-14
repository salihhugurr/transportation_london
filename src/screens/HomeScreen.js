import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView, Text, TouchableOpacity, View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFav, removeFav } from "../redux/action";
import { CustomHeader, Loader } from "../components";
import { randomColor, titleCase } from "../helpers";
import { STYLES } from "../constants";
import { Icon } from "react-native-elements";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [modes, setModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useSelector(state => state.favReducer);
  const dispatch = useDispatch();
  const addToFav = fav => dispatch(addFav(fav));
  const removeFromFav = fav => dispatch(removeFav(fav));

  useEffect(() => {
    getLines();
  }, []);

  const getLines = async () => {
    let mode = await axios.get("https://api.tfl.gov.uk/Line/Meta/Modes");
    setModes(mode.data);
    setLoading(false);
  };

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

  const renderModes = ({item,index}) => {
    const random = randomColor();
    const background = random[0];
    const color = random[1];
    return(
      <TouchableOpacity style={STYLES.modes} onPress={()=>navigation.navigate("Details",{mode:item.modeName})}>
        <View style={{ ...STYLES.modeIconWrapper,backgroundColor:background }}>
          <Icon name={"bus"} type={"font-awesome"} color={color}/>
        </View>
        <Text style={STYLES.modeText}>{titleCase(item.modeName)}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"#FEFEFE"}}>
      <Loader loading={loading}/>
      <CustomHeader title={"Transportation For London"}/>
      <FlatList
        contentContainerStyle={{alignSelf:"center"}}
        data={modes}
        renderItem={renderModes}
        keyExtractor={(item,index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
