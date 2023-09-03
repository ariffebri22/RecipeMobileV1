const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  messageError: '',
};

const putMenu = (state = initialState, action) => {
  switch (action.type) {
    case 'PUT_RECIPE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'PUT_RECIPE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'PUT_RECIPE_FAILED':
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        messageError: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default putMenu;
