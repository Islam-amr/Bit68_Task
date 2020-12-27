// Package import
import React, {useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../Redux/Actions/Cart';

// UI Components import
import Icon from '../Components/UI/Icon';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

const CartScreen = ({navigation}) => {
  const disptach = useDispatch();
  const cartItems = useSelector((state) => {
    const transformItems = [];
    for (const key in state.Cart.items) {
      transformItems.push({
        id: key,
        name: state.Cart.items[key].name,
        quantity: state.Cart.items[key].quantity,
        price: state.Cart.items[key].price,
      });
    }
    return transformItems;
  });
  const cartTotal = useSelector((state) => state.Cart.totalAmount);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          iconStyle={styles.iconStyle}
          img={require('../Assets/Icons/menu.png')}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitle: () => <Text style={styles.headerTitleTxt}>Your cart</Text>,
    });
  }, []);

  

  const onDelete = useCallback((id) => {
    disptach(cartActions.removeFromCart(id));
  }, [cartItems]);


  if (cartItems.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.emptyCartimg}
          source={require('../Assets/Images/emptyCart.png')}
        />
        <Text style={styles.emptyCartTxt}>Your cart is empty!</Text>
      </View>
    );
  }
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={styles.cartItemCon}>
          <View style={styles.descCon}>
            <View style={styles.rowCon}>
              <Text style={styles.txt}>Quantity</Text>
            </View>
            <View style={styles.rowCon}>
              <Text style={styles.txt}>Name</Text>
            </View>
            <View style={styles.rowCon}>
              <Text style={styles.txt}>Price</Text>
            </View>
            <View style={[styles.rowCon, {flex: 0.2}]} />
          </View>
          {cartItems.map((item) => {
            return (
              <View key={item.id} style={styles.descCon}>
                <View style={styles.rowCon}>
                  <Text style={styles.txt2}>{item.quantity}</Text>
                </View>
                <View style={styles.rowCon}>
                  <Text style={styles.txt2}>{item.name}</Text>
                </View>
                <View style={styles.rowCon}>
                  <Text style={styles.txt2}>{item.price} LE</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => onDelete(item.id)}
                  style={[
                    styles.rowCon,
                    {flex: 0.2, alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <Image
                    style={styles.deleteIcon}
                    source={require('../Assets/Icons/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.descCon}>
            <Text style={[styles.totalTxt, {color: Colors.text}]}>
              Total : <Text style={styles.totalTxt}>{cartTotal} LE</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addBtnCon}
        onPress={() => {}}>
        <Text style={styles.addTxt}>Order Now</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitleTxt: {
    color: Colors.primary,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(20),
    lineHeight:35
  },
  iconStyle: {
    width: Dimensions.width * 0.07,
    height: Dimensions.height * 0.03,
    marginHorizontal: Dimensions.width * 0.05,
    tintColor: Colors.primary,
  },
  cartItemCon: {
    width: '95%',
    borderRadius: 5,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowColor: Colors.lightGray,
    shadowOpacity: 0.8,
    elevation: 2,
    alignSelf: 'center',
    padding: 15,
  },
  descCon: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: Dimensions.height * 0.005,
  },
  rowCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(16),
    color: Colors.text,
  },
  txt2: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: ResponsiveFont(14),
    color: Colors.text,
  },
  totalTxt: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(16),
    color: Colors.primary,
  },
  addBtnCon: {
    position: 'absolute',
    width: '95%',
    height: Dimensions.height * 0.08,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    bottom: Dimensions.height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTxt: {
    fontSize: ResponsiveFont(20),
    color: Colors.white,
    fontFamily: Fonts.Poppins_Medium,
    textTransform: 'uppercase',
  },
  emptyCartimg: {
    width: Dimensions.width * 0.5,
    resizeMode: 'contain',
  },
  emptyCartTxt: {
    fontSize: ResponsiveFont(18),
    color: Colors.text,
    fontFamily: Fonts.Poppins_SemiBold,
  },
  deleteIcon: {
    width: Dimensions.width * 0.07,
    height: Dimensions.width * 0.07,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
});

export default CartScreen;
