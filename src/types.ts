import { css } from "styled-components";
import api from "./api/api";
import rootReducer from "./store/reducers/root.reducer";
import store from "./store/store";

export type ImageType = {
  name: string;
  source: string;
};
export type UploadImagesActionType = {
  form: FormData;
  progress: {
    showUploadProgressElm?: string;
    showDownloadProgressElm?: string;
  };
  fileOrder: string[];
};
export type ExtraThunkArgs = { extra: { api: typeof api } };
export type UploadImagesReturnType = {
  zipDownloadLink: string;
  individualFiles: ImageType[];
};

export type Store = ReturnType<typeof store.getState>;

export type ProgressType = React.MutableRefObject<{
  progress: {
    upload: HTMLElement | null;
    download: HTMLElement | null;
  };
}>;

export type RootReducer = ReturnType<typeof rootReducer>;

export type ResponsiveCss = React.CSSProperties | ReturnType<typeof css>;
export type AppDispatch = typeof store.dispatch;
