import { ImageType, UploadImagesActionType } from "../types";
import axios from "../lib/axios-instance";
import { AxiosProgressEvent } from "axios";

type UploadImagesApiCall = (
  params: Pick<UploadImagesActionType, "form"> & {
    onUploadProgress: (e: AxiosProgressEvent) => void;
  }
) => Promise<{
  zipDownloadLink: string;
  individualFiles: ImageType[];
}>;

class api {
  uploadImages: UploadImagesApiCall = async (params) => {
    const { form, onUploadProgress } = params;
    const res = await axios.post("/rembg", form, {
      onUploadProgress,
      onDownloadProgress: () => {
        //! May add a ui for download progress
      },
      responseType: "blob",
    });
    return res.data;
  };
}

export default new api();
