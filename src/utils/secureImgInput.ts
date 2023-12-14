import { ImageType } from "../types";
import { informError } from "../lib/toastify";
import { maxAllowedImgCount, maxAllowedSize } from "../constants/constants";

export function secureImgInput(files: FileList) {
  const validFiles: ImageType[] = [];
  const validDataTransferFiles = new DataTransfer();
  const includesInvalidFiles = [];
  let isOverQtyLimit = false;
  let isOverSizeLimit = false;
  let totalSize = 0;

  Object.keys(files).forEach((_, i) => {
    if (files[i].type.includes("image")) {
      //checking for -1 because later on we add that img to the array
      //so if we don't check for -1 ,11 will also pass
      if (validFiles.length <= maxAllowedImgCount - 1) {
        totalSize += files[i].size;
        if (totalSize <= maxAllowedSize) {
          validFiles.push({
            name: files[i].name,
            source: URL.createObjectURL(files[i]),
          });
          validDataTransferFiles.items.add(files[i]);
        } else {
          isOverSizeLimit = true;
        }
      } else {
        isOverQtyLimit = true;
      }
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
  console.log({ isOverQtyLimit, isOverSizeLimit }, validFiles.length);
  const limitExceeded =
    isOverQtyLimit && isOverSizeLimit
      ? "both"
      : isOverQtyLimit
      ? "quantity"
      : "size";

  if (isOverQtyLimit || isOverSizeLimit) {
    informError(
      `The limit is 10 images,100MB in size,you have exceeded ${limitExceeded} limit,only ${validFiles.length} image(s) were uploaded}`
    );
  }

  return {
    validFiles,
    validDataTransferFiles: validDataTransferFiles.files,
  };
}
