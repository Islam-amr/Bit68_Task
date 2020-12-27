import React, {useState, useCallback, useLayoutEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as cartActions from '../Redux/Actions/Cart';

// Componenets import
import Icon from '../Components/UI/Icon';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

const CategoryDetailsScreen = ({navigation, route}) => {
  const disptach = useDispatch();
  const item = route.params?.item ? route.params.item : undefined;
  const cartItems = useSelector((state) => state.Cart.items);
  const [qty, setQty] = useState(1);

  const onRemove = useCallback(() => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }, [qty]);

  const onAdd = useCallback(() => {
    setQty(qty + 1);
  }, [qty]);

  useLayoutEffect(() => {
    navigation.setOptions({
      tintColor: Colors.primary,
      headerTintColor: Colors.primary,
      headerTitle: () => <Text style={styles.headerTitleTxt}>{item.name}</Text>,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.btnGroup}>
          <View style={styles.btnCon}>
            <Icon
              iconStyle={styles.iconStyle}
              img={require('../Assets/Icons/search.png')}
              onPress={() => navigation.navigate('Search')}
            />
          </View>
          <View style={styles.btnCon}>
            <Icon
              iconStyle={styles.iconStyle}
              img={require('../Assets/Icons/cart.png')}
              onPress={() => navigation.navigate('Cart')}
            />
            {Object.values(cartItems).length !== 0 && (
              <Animatable.View
                animation="zoomIn"
                easing="ease-out"
                duration={800}
                delay={10}
                style={styles.cartCounterCon}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigation.navigate('Cart')}>
                  <Text style={styles.cartCounterTxt}>
                    {Object.values(cartItems).length}
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
        </View>
      ),
    });
  }, [cartItems]);

  return (
    <>
      <ScrollView
        style={{flex: 1, backgroundColor: Colors.white}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imgCon}>
          <Image style={styles.img} source={{uri: item.product_img}} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.txt}>{item.name}</Text>
          <Text style={styles.txt2}>{item.weight}</Text>
          <Text style={[styles.txt2, {fontSize: ResponsiveFont(24)}]}>
            {item.price}
          </Text>
          <View style={styles.rowCon}>
            <View style={{flex: 0.2}}>
              <Text style={[styles.txt2, {textAlign: 'left'}]}>Qty</Text>
            </View>
            <View style={styles.counterCon}>
              <TouchableOpacity
                style={{flex: 1}}
                activeOpacity={0.8}
                onPress={onRemove}>
                <Text style={styles.actionTxt}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.actionTxt, {fontSize: ResponsiveFont(20)}]}>
                {qty}
              </Text>
              <TouchableOpacity
                style={{flex: 1}}
                activeOpacity={0.8}
                onPress={onAdd}>
                <Text style={styles.actionTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowCon}>
            <View style={{flex: 0.2}}>
              <Text style={[styles.txt2, {textAlign: 'left'}]}>Total</Text>
            </View>
            <View style={styles.totalCon}>
              <Text
                style={[styles.txt2, {color: Colors.primary, lineHeight: 36}]}>
                {parseInt(item.price) * qty} LE
              </Text>
            </View>
          </View>
          <View style={styles.rowCon}>
            <Text style={styles.decTxt}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addBtnCon}
        onPress={() =>
          disptach(cartActions.addToCart(item.id, item.name, qty, item.price))
        }>
        <Text style={styles.addTxt}>Add to Cart</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitleTxt: {
    color: Colors.primary,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(20),
  },
  iconStyle: {
    width: Dimensions.width * 0.07,
    height: Dimensions.height * 0.03,
    marginHorizontal: Dimensions.width * 0.05,
    tintColor: Colors.primary,
  },
  btnGroup: {
    width: Dimensions.width * 0.2,
    marginRight: Dimensions.width * 0.05,
    height: '100%',
    flexDirection: 'row',
  },
  btnCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCon: {
    width: Dimensions.width,
    height: Dimensions.height * 0.38,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  txt: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.text,
    fontSize: ResponsiveFont(20),
    textAlign: 'center',
  },
  txt2: {
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.text,
    fontSize: ResponsiveFont(20),
    textAlign: 'center',
  },
  actionTxt: {
    color: Colors.text,
    fontSize: ResponsiveFont(26),
    textAlign: 'center',
    lineHeight: 36,
  },
  rowCon: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
  },
  counterCon: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalCon: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  decTxt: {
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.text,
    marginBottom: Dimensions.height * 0.1,
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
  cartCounterCon: {
    position: 'absolute',
    width: '45%',
    height: '35%',
    backgroundColor: Colors.primary,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
    right: '5%',
  },
  cartCounterTxt: {
    fontSize: ResponsiveFont(12),
    color: Colors.white,
    lineHeight: 15,
  },
});

export default CategoryDetailsScreen;
