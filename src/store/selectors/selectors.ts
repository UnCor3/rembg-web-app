import { Store } from "../../types";

export const selectInputImages = (state: Store) => state.inputImages;
export const selectOutputImages = (state: Store) => state.outputImages;
export const selectAppState = (state: Store) => state.appState;
