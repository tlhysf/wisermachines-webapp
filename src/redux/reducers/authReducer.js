import { auth } from "../actions/actionTypes";

const initialState = {
  signinLoading: false,
  signinError: null,
  signinResponse: null,
  signoutResponse: null,
  user: localStorage.getItem("user"),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.signinLoading: {
      return {
        ...state,
        signinLoading: true,
        signinError: null,
        signinResponse: null,
      };
    }
    case auth.signin: {
      return {
        ...state,
        signinLoading: false,
        signinError: null,
        signinResponse: action.payload,
      };
    }
    case auth.signinError: {
      return {
        ...state,
        signinLoading: false,
        signinResponse: null,
        signinError: action.payload,
      };
    }

    default:
      return state;
  }
};
