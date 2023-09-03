const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  messageError: '',
};

const deleteMenu = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_RECIPE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'DELETE_RECIPE_FAILED':
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

export default deleteMenu;
