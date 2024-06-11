import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import store from "./redux/store";
import router from "./routes";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
