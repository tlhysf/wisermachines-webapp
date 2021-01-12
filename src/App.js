import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import General from "./components/layouts/General";
import colors from "./utils/colors";

const App = (props) => {
  const signedin = localStorage.getItem("signedin");

  useEffect(() => {
    document.body.style.backgroundColor = colors.BLUEGREY[100];
  }, []);

  return (
    <Provider store={store}>
      <General {...props} signedin={signedin} />
    </Provider>
  );
};

export default App;
