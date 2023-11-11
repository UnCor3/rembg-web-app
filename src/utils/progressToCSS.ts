export function progressToCSS(elmID: string, progress: number) {
  const elm = document.querySelector(elmID);
  //@ts-ignore
  if (elm) elm.style.width = progress * 100 + "%";
}
