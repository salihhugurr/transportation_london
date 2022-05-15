import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView, TextInput, Keyboard,
} from "react-native";
import FavIcon from "../assets/Icons/FavIcon";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../redux/action";
import { titleCase, wh, ww } from "../helpers";
import { AppColor, FONTS, mediumSize, Secondary, STYLES, titleSize } from "../constants";
import { Divider, Icon } from "react-native-elements";
import axios from "axios";
import { CustomHeader, Loader, NoRecord } from "../components";
import SearchIcon from "../assets/Icons/SearchIcon";

const DetailsScreen = ({ route }) => {
  const { mode } = route.params;
  const navigation = useNavigation();
  const [lines, setLines] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState("Regular");
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
    if (favorites.filter(item => item.id === fav.id).length > 0) {
      return true;
    } else return false;
  };


  useEffect(() => {
    getLines();
    setLoading(true)
  }, [serviceType]);

  const getLines = async () => {
    try {
      let line = await axios.get(`https://api.tfl.gov.uk/Line/Mode/${mode}/Route?serviceTypes=${serviceType}`);
      setLines(line.data);
      setFilteredLines(line.data);
      console.log("line", line.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };



  const searchText = (text) => {
    if (text) {
      const newData = lines.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredLines(newData)
      setSearch(text)
    } else {
      setFilteredLines(lines)
      setSearch(text)
    }
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
      <Loader loading={loading} />
      <CustomHeader title={mode} onPressLeft={() => navigation.goBack()} regular={serviceType === "Regular"} onPressRight={()=>{
        serviceType === "Regular" ? setServiceType("Night") : setServiceType("Regular")
      }}/>

      <View style={STYLES.searchWrapper}>
        <SearchIcon color={Secondary}/>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          style={STYLES.search}
          returnKeyType={"search"}
          onSubmitEditing={() => {
            Keyboard.dismiss;
          }}
          onChangeText={searchText}
          value={search}
        />
      </View>


      {
        lines.length > 0 &&
        <FlatList
          data={filteredLines}
          renderItem={renderLines}
          keyExtractor={((item, index) => index.toString())}
        />
      }
      {
        !loading && lines.length === 0 &&
        <NoRecord />
      }

    </SafeAreaView>
  );
};


export default DetailsScreen;
