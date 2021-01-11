import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import General from "./components/layouts/General";
import colors from "./utils/colors";

const App = (props) => {
  const [signedin, setSignedin] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = colors.BLUEGREY[100];
    if (localStorage.getItem("signedin")) {
      setSignedin(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <General {...props} signedin={signedin} />
    </Provider>
  );
};

export default App;
