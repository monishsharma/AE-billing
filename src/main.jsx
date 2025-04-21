import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes/index";
import { Provider } from 'react-redux'
import {store, persistor}  from './store';
import "react-datepicker/dist/react-datepicker.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { PersistGate } from "redux-persist/integration/react";

import "react-datepicker/dist/react-datepicker.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
     </Provider>
  </StrictMode>
);
