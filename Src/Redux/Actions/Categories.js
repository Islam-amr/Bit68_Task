export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://5bcce576cf2e850013874767.mockapi.io/task/categories',
      );

      if (!response.ok) {
        throw new Error('Network error');
      }

      const resData = await response.json();
      dispatch({type: FETCH_CATEGORIES, payload: resData});
    } catch (err) {
      throw err;
    }
  };
};
