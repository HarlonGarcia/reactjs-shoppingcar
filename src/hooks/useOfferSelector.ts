import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../utils/store";

export const useOfferSelector: TypedUseSelectorHook<RootState> = useSelector;
