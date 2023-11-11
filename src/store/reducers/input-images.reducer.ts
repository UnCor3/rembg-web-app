import { createSlice } from "@reduxjs/toolkit";
import { IMAGES_INITIAL } from "../../constants/constants";
import { ImageType } from "../../types";
import { informError } from "../../lib/toastify";
import { removeFile } from "../../utils/removeFile";

const inputImagesSlice = createSlice({
  name: "INPUT_IMAGES",
  initialState: IMAGES_INITIAL,
  reducers: {
    ADD_VALID_INPUT_IMGS: (state, action: { payload: ImageType[] }) => {
      state.imgs = action.payload;
    },
    REMOVE_INPUT_IMG: (
      state,
      action: { payload: { name: string; inputRef: HTMLInputElement } }
    ) => {
      const {
        payload: { name, inputRef },
      } = action;
      const { files } = inputRef;
      if (!files) {
        //*Checking due to typescript
        informError("Something went wrong");
        return;
      }

      const { validDataTransferFiles, validFiles } = removeFile(files, name);
      inputRef.files = validDataTransferFiles;
      state.imgs = validFiles;
    },
  },
});

export const { ADD_VALID_INPUT_IMGS, REMOVE_INPUT_IMG } =
  inputImagesSlice.actions;
export default inputImagesSlice.reducer;
