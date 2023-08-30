const InitialState = {
  data: null,
  isLoading: false,
  isError: false,
  messageError: '',
  isSuccess: true,
};

const regis = (state = InitialState, {type, payload}) => {
  switch (type) {
    case 'REGIS_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'REGIS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: payload.users,
      };
    case 'REGIS_ERROR':
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

export default regis;
