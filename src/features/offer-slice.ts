import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOffers } from "../services/offers-service";

interface OfferState {
  offers: Offer[];
  isLoading: boolean;
  isError: boolean;
  isUpdated: boolean;
}

const initialState: OfferState = {
  offers: [],
  isLoading: false,
  isError: false,
  isUpdated: false,
};

export const getOffers = createAsyncThunk("getOffers", async () => {
  const data = await getAllOffers();
  return data;
});

export const offerSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    addOffer: (state, action: PayloadAction<Offer>) => {
      state.offers = [...state.offers, action.payload];
    },
    setNotUpdated: (state) => {
      state.isUpdated = false;
    },
    updateOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOffers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.offers = action.payload;
      state.isUpdated = true;
    });

    builder.addCase(getOffers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isUpdated = false;
    });
  },
});

export const { addOffer, setNotUpdated } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
