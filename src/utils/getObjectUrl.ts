export function getObjectUrl(file: Blob | Blob[] | FileList) {
  if (!Array.isArray(file) && !(file instanceof FileList)) {
    return URL.createObjectURL(file);
  }
  const inputUrls: string[] = [];
  for (let i = 0; i < file.length; i++) {
    inputUrls.push(URL.createObjectURL(file[i]));
  }
  return inputUrls;
}
