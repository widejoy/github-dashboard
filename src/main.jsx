import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/stores/store";
import { Provider as RedexProvider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RedexProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RedexProvider>
    </Provider>
  </StrictMode>
);
