import {FETCH_CATEGORIES} from '../Actions/Categories';

const initalState = {
  availableProducts: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        availableProducts: action.payload,
      };
  }
  return state;
};
