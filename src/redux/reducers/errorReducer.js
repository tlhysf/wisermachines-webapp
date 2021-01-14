import { errors } from "../actions/actionTypes";

const initialState = {
  errorCode: null,
  errorMessage: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errors.notOkResponseFromServer: {
      return {
        ...state,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    }

    case errors.noResponseFromServer: {
      return {
        ...state,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    }

    case errors.errorInSettingUpTheRequest: {
      return {
        ...state,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    }

    default:
      return state;
  }
};
