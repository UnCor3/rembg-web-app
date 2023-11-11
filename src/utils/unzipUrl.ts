import JSZip from "jszip";
import { ImageType } from "../types";

export async function unzipBlob(
  blob: Blob,
  fileOrder: string[],
  cb?: (files: ImageType[]) => void
) {
  const zipIns = new JSZip();
  const files: ImageType[] = [];
  await zipIns
    .loadAsync(blob)
    .then(async (ctt) => {
      const promises: Promise<void>[] = [];

      ctt.forEach((name, file) => {
        const promise = file.async("blob").then((data) => {
          files.push({ source: URL.createObjectURL(data), name });
        });
        promises.push(promise);
      });

      await Promise.all(promises);
      const orderedFiles = fileOrder.map((name) =>
        files.find((file) => file.name === name)
      ) as ImageType[];
      return orderedFiles;
    })
    .then(cb);
}
