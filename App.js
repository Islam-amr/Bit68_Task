// Package import
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

// Main Navigator
import MainNavigator from './Src/Navigator/MainNavigator';

// Reducers import
import Categories from './Src/Redux/Reducers/Categories';
import Cart from './Src/Redux/Reducers/Cart';

const rootReducer = combineReducers({
  Categories: Categories,
  Cart: Cart,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  // To hide Splash Screen After launching
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </>
  );
};

export default App;
