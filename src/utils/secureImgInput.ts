import { ImageType } from "../types";
import { informError } from "../lib/toastify";

export function secureImgInput(files: FileList) {
  const validFiles: ImageType[] = [];
  const validDataTransferFiles = new DataTransfer();
  const includesInvalidFiles = [];
  Object.keys(files).forEach((_, i) => {
    if (files[i].type.includes("image")) {
      validFiles.push({
        name: files[i].name,
        source: URL.createObjectURL(files[i]),
      });
      validDataTransferFiles.items.add(files[i]);
    } else {
      includesInvalidFiles.push(files[i].name);
    }
  });
  const errorCount = includesInvalidFiles.length;

  //Custom error message if none of the files are valid
  if (errorCount) {
    if (errorCount && !validFiles.length) {
      informError("Unsupported image format");
    } else {
      informError("Excluded unsupported image formats from uploads");
    }
  }

  return {
    validFiles,
    validDataTransferFiles: validDataTransferFiles.files,
  };
}
