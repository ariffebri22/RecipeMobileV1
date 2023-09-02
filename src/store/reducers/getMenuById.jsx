const InitialState = {
  data: [],
  isLoading: false,
  isError: false,
  messageError: '',
  isSuccess: true,
};

const getMenuById = (state = InitialState, {type, payload}) => {
  switch (type) {
    case 'GET_MENU_DETAILS_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'GET_MENU_DETAILS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: payload,
      };
    case 'GET_MENU_DETAILS_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        messageError: payload,
      };
    default:
      return state;
  }
};

export default getMenuById;
