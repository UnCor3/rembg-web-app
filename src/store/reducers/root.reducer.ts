import { combineReducers } from "@reduxjs/toolkit";
import inputImagesReducer from "./input-images.reducer";
import outputImagesReducer from "./output-images.reducer";
import appStateReducer from "./app-state.reducer";

export default combineReducers({
  inputImages: inputImagesReducer,
  outputImages: outputImagesReducer,
  appState: appStateReducer,
});
