const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  messageError: '',
};

const putProfile = (state = initialState, action) => {
  switch (action.type) {
    case 'PUT_PROFILE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'PUT_PROFILE_SUCCESS':
      return {
        ...state,
        data: action.payload.users,
        isLoading: false,
        isError: false,
      };
    case 'PUT_PROFILE_FAILED':
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

export default putProfile;
