import {ADD_TO_CART, REMOVE_FROM_CART} from '../Actions/Cart';

import CartItem from '../../Models/CartItem';

const initalState = {
  items: {},
  totalAmount: 0,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      let updateOrNewProduct;
      if (state.items[addedProduct.id]) {
        updateOrNewProduct = new CartItem(
          addedProduct.name,
          state.items[addedProduct.id].quantity + addedProduct.quantity,
          parseInt(addedProduct.price),
          state.items[addedProduct.id].sum +
            parseInt(addedProduct.price) * addedProduct.quantity,
        );
      } else {
        updateOrNewProduct = new CartItem(
          addedProduct.name,
          addedProduct.quantity,
          parseInt(addedProduct.price),
          parseInt(addedProduct.price) * addedProduct.quantity,
        );
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: updateOrNewProduct},
        totalAmount:
          state.totalAmount +
          parseInt(addedProduct.price) * addedProduct.quantity,
      };
    case REMOVE_FROM_CART:
      const itemId = action.payload;
      const updatedCartItems = {...state.items};
      delete updatedCartItems[itemId];
      return {
        ...state,
        items: updatedCartItems,
        totalAmount:
          state.totalAmount -
          parseInt(state.items[itemId].price * state.items[itemId].quantity),
      };
  }
  return state;
};
