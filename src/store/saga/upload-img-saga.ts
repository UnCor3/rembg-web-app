import { put, takeLatest } from "redux-saga/effects";
import api from "../../api/api";
import { ImageType, UploadImagesActionType } from "../../types";
import {
  UPLOAD_IMAGES_ACTION_TYPE,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
} from "../reducers/output-images.reducer";
import { progressToCSS } from "../../utils/progressToCSS";
import { AxiosProgressEvent } from "axios";
import { unzipBlob } from "../../utils/unzipUrl";
import { SET_STATUS } from "../reducers/app-state.reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import EventEmitter from "eventemitter3";

export const networkEvents = new EventEmitter();

function* uploadImageSaga(action: PayloadAction<UploadImagesActionType>) {
  const { payload } = action;

  function onUploadProgress(e: AxiosProgressEvent) {
    progressToCSS(payload.progress.showUploadProgressElm!, e.progress || 1);
    if (e.progress === 1) {
      networkEvents.emit("upload", {
        uploadDone: true,
      });
    }
  }
  //TODO
  //*onDownloadProgress can be implemented in a newer version
  yield put(SET_STATUS("fetching"));
  try {
    const blob: Blob = yield api.uploadImages({ ...payload, onUploadProgress });

    const data = {} as {
      zipDownloadLink: string;
      individualFiles: ImageType[];
    };

    const link = URL.createObjectURL(blob);
    data.zipDownloadLink = link;
    yield unzipBlob(blob, payload.fileOrder, (files) => {
      data.individualFiles = files;
    });
    yield put(UPLOAD_IMAGES_SUCCESS(data));
    yield put(SET_STATUS("fetched"));
  } catch (error) {
    console.log(error);
    yield put(UPLOAD_IMAGES_FAILURE("Something went wrong"));
  }
}

// Generator function
export default function* watchUploadImageAction() {
  //@ts-ignore
  yield takeLatest(UPLOAD_IMAGES_ACTION_TYPE, uploadImageSaga);
}
