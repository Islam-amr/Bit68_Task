import React, {useLayoutEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import ProductItem from '../Components/ProductItem';
import DarkImage from '../Components/UI/DarkImage';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';

// Componenets import
import Icon from '../Components/UI/Icon';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

const CategoryScreen = ({navigation, route}) => {
  const item = route.params?.item ? route.params.item : undefined;
  const cartItems = useSelector((state) => state.Cart.items);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      tintColor: Colors.primary,
      headerTintColor: Colors.white,
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
      <View>
        <View style={styles.imgCon}>
          <DarkImage img={item.category_img} darkness={'140h'} />
        </View>
        <View style={styles.productsCon}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={item.products}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
              <ProductItem item={item} index={index} />
            )}
          />
        </View>
        <View style={styles.actionCon}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionTxt}>Sort By</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionTxt}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitleTxt: {
    color: Colors.white,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(20),
  },
  iconStyle: {
    width: Dimensions.width * 0.07,
    height: Dimensions.height * 0.03,
    marginHorizontal: Dimensions.width * 0.05,
    tintColor: Colors.white,
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
    height: Dimensions.height * 0.35,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  productsCon: {
    width: Dimensions.width,
    height: Dimensions.height * 0.57,
  },
  actionCon: {
    width: '100%',
    height: Dimensions.height * 0.08,
    backgroundColor: Colors.primary,
    bottom: 0,
    flexDirection: 'row',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTxt: {
    fontSize: ResponsiveFont(18),
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.white,
  },
  cartCounterCon: {
    position: 'absolute',
    width: '45%',
    height: '35%',
    backgroundColor: Colors.white,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
    right: '5%',
  },
  cartCounterTxt: {
    fontSize: ResponsiveFont(12),
    color: Colors.primary,
    lineHeight: 15,
  },
});

export default CategoryScreen;
