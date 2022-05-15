import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomHeader, Loader, NoRecord, RenderTable } from "../components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AppColor,STYLES } from "../constants";
import { Divider } from "react-native-elements";
import { wh, ww } from "../helpers";

const TimeTable = ({ route }) => {
  const { id, stationId, title,qr } = route.params;
  const navigation = useNavigation();
  let scrollRef = useRef();
  const [timeTable, setTimeTable] = useState([]);
  const [timeObj, setTimeObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [schoolDays, setSchoolDays] = useState(true);
  const [page, setPage] = useState(1);
  const scrollAnimation = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    getTimeTable();
  }, []);

  const getTimeTable = async () => {
    let timetable = "";
    try {
      if (!qr) {
         timetable = await axios.get(`https://api.tfl.gov.uk/Line/${id}/Timetable/${stationId}`);
      } else {
        timetable = await axios.get(qr);
      }
      setTimeTable(timetable.data.timetable.routes[0].schedules);
      console.log(timetable)
      fillTimeObj(timetable.data.timetable.routes[0].schedules, page, schoolDays);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const renderTimeTable = ({ item, index }) => {

    return (
      <>
        <View style={STYLES.lineWrapper}
              onPress={() => {

              }}>
          <View style={STYLES.centeredRow}>
            <Text style={STYLES.lineNameText}>x</Text>
          </View>
          <Divider />
        </View>
      </>

    );
  };

  useEffect(()=>{
    const a = async () => {
      fillTimeObj(timeTable, page, schoolDays)
    }
    a();
  },[page, schoolDays])

  const fillTimeObj = (table, page, school) => {
    let idx = 0;
    if(page === 4) idx = 5;
    else if(page === 3) idx = 4;
    else if(page === 2 && !school) idx = 3;
    else if(page === 2 && school) idx = 2;
    else if(page === 1 && !school) idx = 1;
    else if(page === 1 && school) idx = 0;

    const data = table[idx]?.knownJourneys;
    let a = {};
    if (data) {
      data.map((item) => {
        if (a.hasOwnProperty(item.hour)) {
          a[item.hour]= [...a[item.hour],item.minute];
        } else {
          a[item.hour] = [item.minute];
        }
      });
      setTimeObj(a);
    }

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader loading={loading} />
      <CustomHeader title={title} onPressLeft={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", height: wh(.05) }}>
          <TouchableOpacity
            onPress={() => {
              scrollRef.current.scrollTo({ x: 0 });
            }}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={[STYLES.modeText, { color: page === 1 ? AppColor : "#666" }]}>Mon-Th</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                              scrollRef.current.scrollTo({ x: ww() });
                            }}
          >
            <Text style={[STYLES.modeText, { color: page === 2 ? AppColor : "#666" }]}>Friday</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                              scrollRef.current.scrollTo({ x: ww() * 2 });
                            }}>
            <Text style={[STYLES.modeText, { color: page === 3 ? AppColor : "#666" }]}>Saturday</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                              scrollRef.current.scrollTo({ x: ww() * 3 });
                            }}>
            <Text style={[STYLES.modeText, { color: page === 4 ? AppColor : "#666" }]}>Sunday</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={{
          height: 2,
          width: ww(.25),
          transform: [{ translateX: scrollAnimation }],
          backgroundColor: AppColor,
        }} />

        {
          page === 1 || page === 2 ?
            <View style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              alignSelf: "center",
              width: ww(),
            }}>
              <TouchableOpacity style={{ flex: 1, alignItems: "center", marginVertical: wh(.01) }}
                                onPress={() => setSchoolDays(true)}>
                <Text style={{ ...STYLES.modeText, color: schoolDays ? AppColor : "#666" }}>School Days</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => setSchoolDays(false)}>
                <Text style={{ ...STYLES.modeText, color: schoolDays ? "#666" : AppColor }}>Non School Days</Text>
              </TouchableOpacity>
            </View> : <></>
        }
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={scrollRef}
          scrollEnabled={Platform.OS === "ios"}
          scrollEventThrottle={16}
          scrollToOverflowEnabled={true}
          onScroll={
            event => {
              let x = event.nativeEvent.contentOffset.x / 4;
              scrollAnimation.setValue(x);
            }
          }
          onMomentumScrollEnd={(event) => {
            let x = event.nativeEvent.contentOffset.x;
            if (x === 0) {
              setPage(1);
            } else if (x === ww()) {
              setPage(2);
            } else if (x === ww() * 2) {
              setPage(3);
            } else {
              setPage(4);
            }
          }}
          showsHorizontalScrollIndicator={false}
        >
          <View key="1" style={{ width: ww() }}>
            <RenderTable timeObj={timeObj}/>
          </View>
          <View key="2" style={{ width: ww() }}>
            <RenderTable timeObj={timeObj}/>
          </View>
          <ScrollView key="3" style={{ width: ww() }}>
           <RenderTable timeObj={timeObj}/>
          </ScrollView>
          <View key="4" style={{ width: ww() }}>
            <RenderTable timeObj={timeObj}/>
          </View>
        </ScrollView>
      </View>
      {
        !loading && timeTable.length === 0 &&
        <NoRecord />
      }
    </SafeAreaView>
  );
};

export default TimeTable;

