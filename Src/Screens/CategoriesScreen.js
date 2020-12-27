// Package import
import React, {useEffect, useCallback, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';

// Categories Actions
import * as categoriesActions from '../Redux/Actions/Categories';

// UI Components import
import Icon from '../Components/UI/Icon';

// Componenets import
import HomeNews from '../Components/HomeNews';
import CategoryItem from '../Components/CategoryItem';

// Data import
import News from '../Data/News';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

const CategoriesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories);
  const cartItems = useSelector((state) => state.Cart.items);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          iconStyle={styles.iconStyle}
          img={require('../Assets/Icons/menu.png')}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitle: () => null,
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

  const fetchCtgrs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(categoriesActions.fetchCategories());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCtgrs();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingCon}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingCon}>
        <Text style={styles.errmsg}>{error}</Text>
        <Button title="Retry" color={Colors.primary} onPress={fetchCtgrs} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          width: Dimensions.width,
          height: Dimensions.height * 0.35,
          marginBottom: Dimensions.height * 0.01,
        }}>
        <Carousel
          data={News}
          loop={true}
          layout="default"
          autoplay={true}
          useScrollView={true}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          removeClippedSubviews={false}
          sliderWidth={Dimensions.width}
          itemWidth={Dimensions.width}
          onSnapToItem={(i) => setActiveTab(i)}
          renderItem={({item, index}) => <HomeNews item={item} index={index} />}
        />
        <View style={styles.tabBar}>
          <Pagination
            containerStyle={styles.pagCon}
            dotStyle={styles.ww}
            dotColor={Colors.primary}
            inactiveDotColor={'white'}
            inactiveDotOpacity={1}
            inactiveDotScale={0.8}
            activeDotIndex={activeTab}
            dotsLength={News.length}
          />
        </View>
      </View>
      <View style={styles.categoriesCon}>
        <FlatList
          data={categories.availableProducts}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => <CategoryItem item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  ww: {
    width: Dimensions.width * 0.04,
    height: Dimensions.width * 0.04,
    borderRadius: 100,
    marginHorizontal: Dimensions.width * 0.001,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  pagCon: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  loadingCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  errmsg: {
    fontSize: ResponsiveFont(18),
    fontFamily: Fonts.Poppins_ExtraLight,
  },
  categoriesCon: {
    flex: 1,
    paddingHorizontal: Dimensions.width * 0.025,
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
export default CategoriesScreen;
