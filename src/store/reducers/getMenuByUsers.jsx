const InitialState = {
  data: {},
  isLoading: false,
  isError: false,
  messageError: '',
  isSuccess: true,
};

const getMenuByUsers = (state = InitialState, {type, payload}) => {
  switch (type) {
    case 'GET_MENU_USERS_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'GET_MENU_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: payload,
      };
    case 'GET_MENU_USERS_ERROR':
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

export default getMenuByUsers;
