import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import store from "./redux/stores/store";
import { Provider as RedexProvider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RedexProvider store={store}>
        <App />
      </RedexProvider>
    </Provider>
  </StrictMode>
);
