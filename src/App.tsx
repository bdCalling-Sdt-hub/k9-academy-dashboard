import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import store from "./redux/store";
import router from "./routes";
import { SocketProvider } from "./provider/socket";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </Provider>
  );
}

export default App;
