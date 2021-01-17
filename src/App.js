import React, { useEffect } from "react";
import General from "./components/layouts/General";
import colors from "./utils/colors";
import ErrorModal from "./components/errorScreens/ErrorModal";
import keys from "./utils/keys";
import { isNotEmpty } from "./utils/validation";

const App = (props) => {
  const signedin = localStorage.getItem("signedin");

  const user = localStorage.getItem("user");

  let thisUser = keys.users.filter((x) => x.name === user).pop();
  if (!isNotEmpty(thisUser)) {
    thisUser = keys.users[0];
    localStorage.clear();
  }

  useEffect(() => {
    document.body.style.backgroundColor = colors.BLUEGREY[100];
  }, []);

  return (
    <React.Fragment>
      <General {...props} signedin={signedin} thisUser={thisUser} />
      <ErrorModal {...props} />
    </React.Fragment>
  );
};

export default App;
