// Package import
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  SrcOverComposition,
  LinearGradient,
  Emboss,
} from 'react-native-image-filter-kit';

// Theme import
import Colors from '../../Constants/Colors';
import Dimensions from '../../Constants/Dimensions';
import Fonts from '../../Constants/Fonts';
import ResponsiveFont from '../../Constants/ResponsiveFont';

const DarkImage = ({img, darkness}) => {
  return (
    <SrcOverComposition
      resizeCanvasTo={'dstImage'}
      dstImage={<Image style={styles.img} source={{uri: img}} />}
      srcResizeMode={{width: 1, height: 0.5}}
      srcAnchor={{y: 0}}
      srcImage={
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: darkness}}
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.0)']}
        />
      }
      style={{width: '100%', height: '100%'}}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});

export default DarkImage;
