import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  status: "idle" | "fetching" | "fetched";
  imgUploadDone: boolean;
  imgDownloadDone: boolean;
  isHamMenuOpen: boolean;
  imgsDisplayedOnRow: boolean;
  safeToAppendSwipers: boolean;
};

const APP_INITIAL_STATE: InitialState = {
  safeToAppendSwipers: false,
  imgUploadDone: false,
  imgDownloadDone: false,
  isHamMenuOpen: false,
  imgsDisplayedOnRow: true,
  status: "idle",
};

const appStateSlice = createSlice({
  name: "APP_STATE",
  initialState: APP_INITIAL_STATE,
  reducers: {
    SET_SAFE_TO_APPEND_SWIPERS: (state, action: { payload: boolean }) => {
      state.safeToAppendSwipers = action.payload;
    },
    IMG_UPLOAD_DONE: (state) => {
      state.imgUploadDone = true;
    },
    IMG_DOWNLOAD_DONE: (state) => {
      state.imgDownloadDone = true;
    },
    SET_IS_HAM_MENU_OPEN: (state, action) => {
      state.isHamMenuOpen = action.payload;
    },
    SET_IMGS_DISPLAYED_ON_ROW: (state, action) => {
      state.imgsDisplayedOnRow = action.payload;
    },
    SET_STATUS: (state, action: { payload: InitialState["status"] }) => {
      state.status = action.payload;
    },
  },
});
export const {
  SET_IMGS_DISPLAYED_ON_ROW,
  SET_IS_HAM_MENU_OPEN,
  SET_SAFE_TO_APPEND_SWIPERS,
  SET_STATUS,
  IMG_DOWNLOAD_DONE,
  IMG_UPLOAD_DONE,
} = appStateSlice.actions;
export default appStateSlice.reducer;
