import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

const Icon = ({onPress, iconStyle, img}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Image source={img} style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {resizeMode: 'contain'},
});
export default Icon;
