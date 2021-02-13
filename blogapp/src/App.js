import { Provider } from "react-redux";
import { store } from "./redux/store";
import Boot from "./redux/boot";
import Routes from "./router";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
