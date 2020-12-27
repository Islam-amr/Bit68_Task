// Package import
import React, {useCallback} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../Redux/Actions/Cart';
import {useNavigation} from '@react-navigation/native';

// Theme import
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import Dimensions from '../Constants/Dimensions';
import ResponsiveFont from '../Constants/ResponsiveFont';

const ProductItem = ({item, index}) => {
  const navigation = useNavigation();
  const disptach = useDispatch();
  const cartItems = useSelector((state) => state.Cart.items);

  const cartAddition = useCallback(() => {
    disptach(cartActions.addToCart(item.id, item.name, 1, item.price));
  }, [cartItems]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryDetails', {item: item})}
      activeOpacity={0.7}
      style={[styles.itemCon, {borderRightWidth: index % 2 === 0 ? 1 : 0}]}>
      <View style={styles.imgCon}>
        <Image style={styles.img} source={{uri: item.product_img}} />
      </View>
      <View style={styles.actionCon}>
        <View style={styles.txtCon}>
          <Text style={styles.txt}>{item.name}</Text>
          <Text style={styles.txt2}>{item.weight}</Text>
          <Text style={styles.txt2}>{item.price}</Text>
        </View>
        <View style={styles.addCon}>
          <TouchableOpacity
            style={[
              styles.addBtn,
              {
                backgroundColor: cartItems[item.id]
                  ? Colors.primary
                  : Colors.lightGray2,
              },
            ]}
            activeOpacity={0.6}
            onPress={cartAddition}
            disabled={cartItems[item.id]}>
            <Image
              style={styles.icon}
              source={
                cartItems[item.id]
                  ? require('../Assets/Icons/true.png')
                  : require('../Assets/Icons/add.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemCon: {
    height: Dimensions.height * 0.25,
    flex: 1,
    borderBottomColor: Colors.lightGray,
    borderRightColor: Colors.lightGray,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: Dimensions.height * 0.001,
  },
  imgCon: {
    flex: 0.65,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  actionCon: {
    flex: 0.35,
    flexDirection: 'row',
  },
  txtCon: {
    flex: 1,
  },
  addCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addBtn: {
    width: '40%',
    height: '60%',
    marginRight: '15%',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '50%',
    height: '50%',
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  txt: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.text,
    fontSize: ResponsiveFont(14),
    lineHeight: 22,
    marginLeft: 4,
  },
  txt2: {
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.text,
    fontSize: ResponsiveFont(12),
    lineHeight: 22,
    marginLeft: 4,
  },
});
export default ProductItem;
