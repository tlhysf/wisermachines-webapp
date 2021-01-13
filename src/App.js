import React, { useEffect } from "react";
import General from "./components/layouts/General";
import colors from "./utils/colors";
import ErrorModal from "./components/errorScreens/ErrorModal";

const App = (props) => {
  const signedin = localStorage.getItem("signedin");

  useEffect(() => {
    document.body.style.backgroundColor = colors.BLUEGREY[100];
  }, []);

  return (
    <React.Fragment>
      <General {...props} signedin={signedin} />
      <ErrorModal {...props} />
    </React.Fragment>
  );
};

export default App;
