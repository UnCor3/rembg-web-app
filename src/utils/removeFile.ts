import { ImageType } from "../types";

//helper function to both remove and reorganize
export function removeFile(files: FileList, fileToRemove: string) {
  const validDataTransferFiles = new DataTransfer();
  const validFiles: ImageType[] = [];

  //checking by name
  for (let i = 0; i < files.length; i++) {
    if (files[i].name !== fileToRemove && files[i].type.includes("image")) {
      const source = URL.createObjectURL(files[i]);
      validFiles.push({ name: files[i].name, source });
      validDataTransferFiles.items.add(files[i]);
    }
  }
  return {
    validFiles,
    validDataTransferFiles: validDataTransferFiles.files,
  };
}
