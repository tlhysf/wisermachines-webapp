import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Layout from "./components/layout/Layout";
import colors from "./utils/colors";

const App = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = colors.BLUEGREY[100];
  }, []);

  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  );
};

export default App;
