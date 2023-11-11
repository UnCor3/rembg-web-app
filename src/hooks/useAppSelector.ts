import { TypedUseSelectorHook } from "react-redux";
import { Store } from "../types";
import { useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<Store> = useSelector;
