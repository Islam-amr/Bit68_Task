import React, {useLayoutEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';

// Componenets import
import CategoryItem from '../Components/CategoryItem';

// Theme import
import Colors from '../Constants/Colors';
import Dimensions from '../Constants/Dimensions';
import Fonts from '../Constants/Fonts';
import ResponsiveFont from '../Constants/ResponsiveFont';

const SearchScreen = ({navigation}) => {
  const [touched, setTouched] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [result, setResult] = useState('');
  const categories = useSelector((state) => state.Categories.availableProducts);
  let filter =
    searchWord.length === 0
      ? []
      : categories.filter(
          (item) =>
            item.name.toLowerCase().match(searchWord) ||
            item.products.find((i) => i.name.toLowerCase().match(searchWord)),
        );

  useLayoutEffect(() => {
    navigation.setOptions({
      tintColor: Colors.primary,
      headerTintColor: Colors.primary,
      headerTitle: () => <Text style={styles.headerTitleTxt}>Search</Text>,
    });
  }, []);

  const handleSubmit = useCallback(
    (text) => {
      const newData = categories.filter(
        (item) =>
          item.name.toLowerCase().match(text) ||
          item.products.find((i) => i.name.toLowerCase().match(text)),
      );

      setSearchWord(text);
      setResult(newData);
      if (text.length === 0) {
        setResult([]);
      }
    },
    [searchWord],
  );

  const touchHandle = () => {
    setTouched(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={styles.inputCon}>
          <TextInput
            placeholder="Type your category"
            style={styles.input}
            autoCapitalize={'none'}
            value={searchWord}
            onBlur={touchHandle}
            onChangeText={handleSubmit}
          />
        </View>
        {result.length !== 0 && (
          <View style={styles.categoriesCon}>
            <FlatList
              data={result}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => <CategoryItem item={item} />}
            />
          </View>
        )}
        {touched && result.length === 0 && (
          <View style={styles.noResultCon}>
            <Text style={styles.noResultTxt}>No result found !</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  headerTitleTxt: {
    color: Colors.primary,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: ResponsiveFont(20),
    lineHeight: 35,
  },
  inputCon: {
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  input: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: ResponsiveFont(14),
  },
  categoriesCon: {
    flex: 1,
    paddingHorizontal: Dimensions.width * 0.025,
  },
  noResultCon: {
    flex: 1,
    paddingHorizontal: Dimensions.width * 0.05,
    marginVertical: Dimensions.height * 0.02,
  },
  noResultTxt: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: ResponsiveFont(16),
  },
});

export default SearchScreen;
