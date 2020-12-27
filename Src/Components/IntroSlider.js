// Package Import
import React, {useRef, useCallback, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

// Intro Data import
import IntroData from '../Data/IntroData';

const IntroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // to handle index of swiper
  const navigation = useNavigation(); // to navigate without props
  let swiperRef = useRef(null); // to get swiper functions

  // to handle index state update
  const updateIndex = useCallback(
    (res) => {
      setTimeout(() => {
        setCurrentIndex(res);
      }, 50);
    },
    [currentIndex],
  );

  // Navigate to Home and rest Drawer Navigator
  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
            screen: 'Categories',
          },
        ],
      }),
    );
  };

  // to decrease index state by 1
  const onPrev = useCallback(() => {
    if (currentIndex === 0) {
      return;
    }
    swiperRef.current.scrollBy(-1);
  }, [currentIndex]);

  // to increase index state by 1
  const onNext = useCallback(() => {
    if (currentIndex === IntroData.length - 1) {
      return;
    }
    swiperRef.current.scrollBy(1);
  }, [currentIndex]);

  // Swiper Item Render Function
  const IntroItem = IntroData.map((item, index) => {
    return (
      <Animatable.View
        animation="zoomIn"
        easing="ease-out"
        duration={800}
        delay={10}
        key={index}
        style={styles.sliderCon}>
        <Animatable.View
          style={styles.imgCon}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          useNativeDriver={false}>
          <Image style={styles.img} source={item.img} />
        </Animatable.View>
        <View style={styles.txtCon}>
          <Text style={styles.headerTxt}>{item.title}</Text>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <Text style={styles.subTxt}>{item.body}</Text>
          </View>
        </View>
      </Animatable.View>
    );
  });

  // Main Return
  return (
    <>
      <View style={styles.sliderCon}>
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={<View style={styles.dotStyle} />}
          activeDot={<View style={styles.activeDotStyle} />}
          paginationStyle={styles.pagStyle}
          onIndexChanged={updateIndex}
          removeClippedSubviews={false}>
          {IntroItem}
        </Swiper>
      </View>
      {currentIndex !== 0 && (
        <View style={[styles.btnCon, {left: Dimensions.width * 0.05}]}>
          <TouchableOpacity style={styles.btnStyle} onPress={onPrev}>
            <Image
              style={styles.icon}
              source={require('../Assets/Icons/prev.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.btnCon, {right: Dimensions.width * 0.05}]}>
        {currentIndex === IntroData.length - 1 ? (
          <TouchableOpacity
            style={[styles.btnStyle, {width: '100%'}]}
            onPress={navigateToHome}>
            <Animatable.Text
              animation="slideInDown"
              iterationCount={1}
              direction="alternate"
              duration={500}
              style={styles.getStartTxt}>
              Get started
            </Animatable.Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnStyle} onPress={onNext}>
            <Image
              style={styles.icon}
              source={require('../Assets/Icons/next.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderCon: {
    width: Dimensions.width,
    height: Dimensions.height * 0.6,
  },
  imgCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  txtCon: {
    flex: 1,
  },
  headerTxt: {
    color: Colors.text,
    fontSize: ResponsiveFont(26),
    fontFamily: Fonts.Poppins_Medium,
    marginVertical: Dimensions.height * 0.01,
    textAlign: 'center',
  },
  subTxt: {
    color: Colors.text,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: ResponsiveFont(14),
    marginVertical: Dimensions.height * 0.01,
    textAlign: 'center',
    lineHeight: ResponsiveFont(20),
  },
  pagStyle: {
    position: 'absolute',
    zIndex: 0,
    bottom: -(Dimensions.height * 0.15),
    height: Dimensions.height * 0.15,
  },
  dotStyle: {
    width: Dimensions.width * 0.04,
    height: Dimensions.width * 0.04,
    marginHorizontal: Dimensions.width * 0.01,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  activeDotStyle: {
    width: Dimensions.width * 0.05,
    height: Dimensions.width * 0.05,
    marginHorizontal: Dimensions.width * 0.01,
    borderRadius: 100,
    backgroundColor: Colors.primary,
  },
  btnCon: {
    position: 'absolute',
    height: Dimensions.height * 0.15,
    width: Dimensions.width * 0.25,
    top: Dimensions.height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    width: '50%',
    height: '45%',
    backgroundColor: Colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '65%',
    height: '65%',
    tintColor: Colors.white,
  },
  getStartTxt: {
    color: Colors.white,
    fontSize: ResponsiveFont(12.5),
    fontFamily: Fonts.Poppins_Regular,
  },
});

export default IntroSlider;
