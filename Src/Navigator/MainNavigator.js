// Package import
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

// Screens import
import Intro from '../Screens/IntroScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import CategoryDetailsScreen from '../Screens/CategoryDetailsScreen';
import SearchScreen from '../Screens/SearchScreen';
import CartScreen from '../Screens/CartScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const hdrStyle = {
  height: Dimensions.height * 0.08,
  backgroundColor: Colors.white,
  shadowColor: 'transparent',
  elevation: 0,
};

const drwrStyle = {
  activeTintColor: Colors.primary,
  activeBackgroundColor: 'transparent',
  inactiveTintColor: Colors.black,
  inactiveBackgroundColor: 'transparent',
  labelStyle: {
    fontSize: ResponsiveFont(16),
    fontFamily: Fonts.Poppins_SemiBold,
    marginLeft: 5,
  },
};

const IntroScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: hdrStyle,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
    </Stack.Navigator>
  );
};

const HomeScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: hdrStyle,
      }}>
      {/* <Stack.Screen name="Intro" component={Intro} /> */}
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const CartScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: hdrStyle,
      }}>
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType="slide" drawerContentOptions={drwrStyle}>
        <Drawer.Screen
          name="Intro"
          component={IntroScreen}
          options={{
            gestureEnabled: false,
            drawerIcon: () => <View></View>,
            drawerLabel: () => <View></View>,
          }}
        />
        <Drawer.Screen name="Home" component={HomeScreens} />
        <Drawer.Screen name="Cart" component={CartScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
