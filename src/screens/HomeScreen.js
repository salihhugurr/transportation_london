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
import { randomColor, scanQr, titleCase } from "../helpers";
import { STYLES } from "../constants";
import { Icon } from "react-native-elements";
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { DBRConfig, decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [modes, setModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cameraVisible, setCameraVisible] = useState(false);
  const { favorites } = useSelector(state => state.favReducer);
  const dispatch = useDispatch();
  const addToFav = fav => dispatch(addFav(fav));
  const removeFromFav = fav => dispatch(removeFav(fav));
  const [hasPermission, setHasPermission] = useState(false);
  const [barcodeResults, setBarcodeResults] = useState([]);
  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor((frame) => {
    let id = "1";
    let from = "490000235Z";
    let to = "490011632BA";
    'worklet'
    const config:DBRConfig = {};
    config.template="{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
    const results  = decode(frame,config)
    console.log("result ne",results);
    navigation.navigate("TimeTable",{qr:`https://api.tfl.gov.uk/Line/${id}/Timetable/${from}/to/${to}`})
    //REA.runOnJS(setBarcodeResults)(results);
  }, [])

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

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
      <CustomHeader title={"Transportation For London"} onPressRight={()=>{
        navigation.navigate("TimeTable",{qr:`https://api.tfl.gov.uk/Line/1/Timetable/490000235Z/to/490011632BA`,title:"xx"})
      }} qr/>
      <FlatList
        contentContainerStyle={{alignSelf:"center"}}
        data={modes}
        renderItem={renderModes}
        keyExtractor={(item,index) => index.toString()}
        numColumns={2}
      />

      <Modal visible={cameraVisible}>
        {device != null &&
          hasPermission && (
            <>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
              />
            </>
          )}
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
