// Packae import
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// Theme import
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

const HomeNews = ({item, index}) => {
  return (
    <View style={{flex: 1}}>
      <Image style={styles.img} source={item.img} />
      <View style={styles.txtCon}>
        <Text style={styles.titleTxt}>{item.title} %</Text>
        <Text style={styles.disTxt}>Discount</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  txtCon: {
    top: '37.5%',
    left: '10%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: ResponsiveFont(38),
    color: Colors.white,
    fontFamily: Fonts.Poppins_Bold,
    lineHeight: 55,
  },
  disTxt: {
    fontSize: ResponsiveFont(18),
    color: Colors.white,
    fontFamily: Fonts.Poppins_Light,
  },
});

export default HomeNews;
