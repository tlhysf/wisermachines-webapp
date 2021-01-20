import { auth } from "./actionTypes";
import keys from "../../utils/keys";

const loadingTime = 1000;

export const signinAction = (dispatch, user) => {
  dispatch({
    type: auth.signinLoading,
  });

  setTimeout(() => {
    const thisUser = keys.users.map((x) => {
      const nameMatch = user.name === x.name;
      const passwordMatch = user.password === x.password;
      if (nameMatch && passwordMatch) {
        localStorage.setItem("user", x.name);
        localStorage.setItem("signedin", true);
        dispatch({
          type: auth.signin,
          payload: "Successfully signed in.",
        });
        return x;
      }
      return null;
    });

    const userMatch = thisUser.filter((x) => x);
    if (userMatch.length === 0) {
      dispatch({
        type: auth.signinError,
        payload:
          "The user name or password you entered isn't correct. Try entering it again.",
      });
    }
  }, loadingTime);
};

export const signoutAction = () => {
  localStorage.clear();
};
