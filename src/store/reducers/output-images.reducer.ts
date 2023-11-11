import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageType, UploadImagesActionType } from "../../types";
import { IMAGES_INITIAL } from "../../constants/constants";

const outputImagesSlice = createSlice({
  name: "OUTPUT_IMAGES",
  initialState: IMAGES_INITIAL,
  reducers: {
    UPLOAD_IMAGES_ACTION: (
      state,
      action: PayloadAction<UploadImagesActionType>
    ) => {
      state.loading = true;
    },
    UPLOAD_IMAGES_SUCCESS: (
      state,
      action: PayloadAction<{
        individualFiles: ImageType[];
        zipDownloadLink: string;
      }>
    ) => {
      state.loading = false;
      state.imgs = action.payload.individualFiles;
      state.downloadLink = action.payload.zipDownloadLink;
    },
    UPLOAD_IMAGES_FAILURE: (
      state,
      { payload: error }: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = error || "Something went wrong";
    },
  },
});

export const UPLOAD_IMAGES_ACTION_TYPE =
  outputImagesSlice.actions.UPLOAD_IMAGES_ACTION.type;

export const {
  UPLOAD_IMAGES_ACTION,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
} = outputImagesSlice.actions;
export default outputImagesSlice.reducer;
