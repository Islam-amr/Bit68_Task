// Package import
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';

// Components Import
import IntroSlider from '../Components/IntroSlider';

// Theme import
import Colors from '../Constants/Colors';

const IntroScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  return (
    <View style={styles.introScreen}>
      <IntroSlider />
    </View>
  );
};

const styles = StyleSheet.create({
  introScreen: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IntroScreen;
