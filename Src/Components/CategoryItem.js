// Package import
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../Redux/Actions/Cart';
import {useNavigation} from '@react-navigation/native';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

// Components import
import DarkImage from '../Components/UI/DarkImage';

const CategoryItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.itemCon}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Category', {item: item})}>
      <DarkImage style={{flex: 1}} img={item.category_img} darkness={'70h'} />
      <View style={styles.titleCon}>
        <Text style={styles.titleTxt}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemCon: {
    width: '47.5%',
    height: Dimensions.height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.25%',
    borderRadius: 5,
    overflow: 'hidden',
    shadowOffset: {width: 0, height: 8},
    shadowColor: 'grey',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryImg: {
    width: '100%',
    height: '100%',
  },
  titleCon: {
    width: '100%',
    height: '25%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '75%',
  },
  titleTxt: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(18),
    color: Colors.white,
  },
});

export default CategoryItem;
