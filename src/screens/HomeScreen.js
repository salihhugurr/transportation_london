import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList, Modal,
  SafeAreaView, Text, TouchableOpacity, View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFav, removeFav } from "../redux/action";
import { CustomHeader, Loader } from "../components";
import { randomColor, titleCase, wh, ww } from "../helpers";
import { STYLES, White } from "../constants";
import { Icon } from "react-native-elements";
import QRCodeScanner from "react-native-qrcode-scanner";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [modes, setModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cameraVisible, setCameraVisible] = useState(false);
  const { favorites } = useSelector(state => state.favReducer);
  const dispatch = useDispatch();
  const addToFav = fav => dispatch(addFav(fav));
  const removeFromFav = fav => dispatch(removeFav(fav));

  const onSuccess = async (e) => {
    console.log("e=>",e)
    let qr = e.data.split("-");
    console.log("qr",qr)
    let id = qr[0];
    let from = qr[1];
    let to = qr[2];
    let title = qr[3];
    navigation.navigate("TimeTable",{qr:`https://api.tfl.gov.uk/Line/${id}/Timetable/${from}/to/${to}`,title})
  }


  useEffect(() => {
    getLines();
  }, []);

  const getLines = async () => {
    let mode = await axios.get("https://api.tfl.gov.uk/Line/Meta/Modes");
    setModes(mode.data);
    setLoading(false);
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
      <CustomHeader title={"Transportation For London"} onPressRight={()=>{
        //navigation.navigate("TimeTable",{qr:`https://api.tfl.gov.uk/Line/1/Timetable/490000235Z/to/490011632BA`,title:"xx"})
        setCameraVisible(true);
      }} qr/>
      <FlatList
        contentContainerStyle={{alignSelf:"center"}}
        data={modes}
        renderItem={renderModes}
        keyExtractor={(item,index) => index.toString()}
        numColumns={2}
      />


        <Modal visible={cameraVisible}>
          <View style={{flex: 1}}>
            <QRCodeScanner
              onRead={onSuccess}
              reactivate={true}
              vibrate={false}
              cameraStyle={{height: "100%", zIndex: -1}}
              cameraContainerStyle={{height: wh()}}
            />
          </View>
        </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
