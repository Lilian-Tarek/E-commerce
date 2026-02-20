import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter'
import './main.css'
import { Provider } from 'react-redux'
import { store,persistor } from "@store/index";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <div className="container mx-auto px-4 md:px-20 flex flex-col pt-4 img-bg mb-0">
      <AppRouter />
      </div>
      </PersistGate>
  </Provider>
);
