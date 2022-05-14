import React, { useRef } from "react";
import { View, Animated } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import { wh, ww } from "./src/helpers";
import { AppColor, Secondary, White } from "./src/constants";
import FavIconUnfilled from "./src/assets/Icons/FavIconUnfilled";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "./src/assets/Icons/HomeIcon";
import FavIcon from "./src/assets/Icons/FavIcon";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Home"} component={HomeScreen} />
      </Stack.Navigator>
    );
  };
  const FavoriteStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Favorite"} component={FavoriteScreen} />
      </Stack.Navigator>
    );
  };
  const TabStack = () => {
    return (
      <>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown:false,
            tabBarStyle: {
              backgroundColor: White,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              height: wh(.07),
              shadowColor: "#000",
              shadowOpacity: .06,
              shadowOffset: {
                width: 10,
                height: 10,
              },
              paddingHorizontal: 20,
            },
          }} initialRouteName={"HomeStack"}>
          <Stack.Screen name={"HomeStack"} component={HomeStack} options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "absolute", top: "40%" }}>
                <HomeIcon color={!focused ? AppColor : Secondary} />
              </View>
            ),
          }} listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })} />
          <Stack.Screen name={"FavoriteStack"} component={FavoriteStack} options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "absolute", top: "40%" }}>
                {
                  focused ? <FavIcon color={Secondary} /> : <FavIconUnfilled color={AppColor} />
                }
              </View>
            ),
          }} listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })} />
        </Tab.Navigator>
        <Animated.View style={{
          width: getWidth() - ww(.06),
          height: 2,
          backgroundColor: Secondary,
          position: "absolute",
          bottom: wh(.07),
          left: ww(.05),
          borderRadius: 20,
          transform: [
            { translateX: tabOffsetValue },
          ],
        }}>

        </Animated.View>
      </>
    );

  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name={"TabStack"} component={TabStack} />
          <Stack.Screen name={"Details"} component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

  function getWidth() {
    let width = ww();
    width = width - ww(.02);
    return width / 2;
  }
};

export default Router;




