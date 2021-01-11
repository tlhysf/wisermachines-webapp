import { auth } from "./actionTypes";
import keys from "../../utils/keys";

export const signinAction = (dispatch, user) => {
  // TODO: dispatch loading

  const thisUser = keys.users.map((x) => {
    if (user.name === x.name && user.password === x.password) {
      // TODO: set user in local storage
      localStorage.setItem("user", { ...user });
      localStorage.setItem("signedin", true);
    } else {
      //TODO: dispatch error
    }
  });
};
