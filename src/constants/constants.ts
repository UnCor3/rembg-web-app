import { ImagesInitialType } from "../components/rembg-form/rembg-form.component";

export const maxAllowedSize = 100 * 1024 * 1024; //100MB
export const maxAllowedImgCount = 10; //10 images beaause

//Backend is served on a different port
const API_PORT = "3001";
const API_PROTOCOL = document.location.protocol;
const API_HOSTNAME = document.location.hostname;
const VITE_PORT = import.meta.env.VITE_PORT;

//*API URL
export const API_URL = document.location.href.replace("3005", API_PORT);
export const VITE_PUBLIC_URL = `${API_PROTOCOL}//${API_HOSTNAME}:${VITE_PORT}`;

export const GITHUB_PROFILE = "https://github.com/UnCor3";

export const IMAGES_INITIAL: ImagesInitialType = {
  imgs: [],
  error: null,
  loading: false,
  //not needed for input imgs
  downloadLink: null,
};
