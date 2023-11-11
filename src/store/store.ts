import { AnyAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer";
import logger from "redux-logger";
import { RootReducer } from "../types";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/root-saga";

//*DEV TOOLS
const devToolsEnabled = import.meta.env.VITE_REDUX_DEV_TOOLS_ENABLED === "true";
const sagaMiddleware = createSagaMiddleware();

//*MIDDLEWARES
const middlewares = devToolsEnabled
  ? [logger, sagaMiddleware]
  : [sagaMiddleware];

//STORE CONFIG
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  reducer: (state: RootReducer | undefined, action: AnyAction) => {
    if (action.type === "RESET_STORE") {
      state = {} as RootReducer;
    }

    return rootReducer(state, action);
  },
  devTools: devToolsEnabled,
});

//*SAGA
sagaMiddleware.run(rootSaga);

export default store;
