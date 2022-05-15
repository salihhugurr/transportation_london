import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomHeader, Loader, NoRecord } from "../components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AppColor, Secondary, STYLES } from "../constants";
import { Divider, Icon } from "react-native-elements";
import FavIcon from "../assets/Icons/FavIcon";
import { openMap, ww } from "../helpers";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import SearchIcon from "../assets/Icons/SearchIcon";

const LineDetail = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const [stations,setStations] = useState([]);
  const [filteredStations,setFilteredStations] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");


  useEffect(()=>{
    getStations();
  },[])

  const getStations = async () => {
    try {
      let stations = await axios.get(`https://api.tfl.gov.uk/Line/${id}/StopPoints`)
      setStations(stations.data);
      setFilteredStations(stations.data);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
    }
  }

  const searchText = (text) => {
    if (text) {
      const newData = stations.filter(
        function (item) {
          const itemData = item.commonName
            ? item.commonName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredStations(newData)
      setSearch(text)
    } else {
      setFilteredStations(stations)
      setSearch(text)
    }
  };

  const renderStations = ({ item, index }) => {

    return (
      <>
        <TouchableOpacity style={STYLES.lineWrapper}
                          onPress={()=>{
                            navigation.navigate("TimeTable",{id,stationId:item.id,title:item.commonName})
                          }}>
          <View style={STYLES.centeredRow}>
            <Text style={{...STYLES.lineNameText,color:Secondary}}>{item.stopLetter}</Text>
          </View>
          <View style={STYLES.centered}>
            <View style={STYLES.centeredRow}>
              <Text style={STYLES.lineNameText}>{item.commonName}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={STYLES.centeredRow}
            onPress={() => {
              openMap(item.lat,item.lon,item.commonName)
            }}>
            <Icon name={"google-maps"} type={"material-community"} color={Secondary}/>
          </TouchableOpacity>
        </TouchableOpacity>
        <Divider />
      </>

    );
  };

  return(
    <SafeAreaView style={{flex:1}}>
      <Loader loading={loading}/>
      <CustomHeader title={"Stations"} onPressLeft={()=>navigation.goBack()}/>
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
        stations.length > 0 &&
        <FlatList
          data={filteredStations}
          renderItem={renderStations}
          keyExtractor={((item, index) => index.toString())}
        />
      }
      {
        !loading && stations.length === 0 &&
        <NoRecord />
      }
    </SafeAreaView>
  )
}

export default LineDetail;
