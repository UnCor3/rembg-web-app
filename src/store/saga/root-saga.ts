import { all, fork } from "redux-saga/effects";
import watchUploadImageAction from "./upload-img-saga";

const rootSaga = function* () {
  yield all([fork(watchUploadImageAction)]);
};

export default rootSaga;
