const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  messageError: '',
};

export const postMenu = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_RECIPE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'POST_RECIPE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'POST_RECIPE_FAILED':
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
