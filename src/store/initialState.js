const initialState = {
  ingredientsData: {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
  },

  orderData: {
    error: false,
    orders: [],
    loading: false,
    purchased: false,
  },

  auth: {
    token: null,
    userId: null,
    loading: false,
    error: false,
    authRedirectPath: '/'
  },
};

export default initialState;
