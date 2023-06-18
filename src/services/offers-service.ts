import { api } from "../utils/api";

const getAllOffers = async (): Promise<Offer[]> => {
  const { data } = await api.get("/offers");
  return data;
};

const getOfferById = async (id: number): Promise<Offer> => {
  const { data } = await api.get(`/offers/${id}`);
  return data;
};

const getOffersByModel = async (model: string): Promise<Offer[]> => {
  const { data } = await api.get(`/offers/filter?startsWith=${model}`);
  return data;
};

const createNewOffer = async (payload: Offer | OfferDto) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await api.post(`/offers`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const updateOfferById = async (id: number, payload: Offer | OfferDto) => {
  const response = await api.put(`/offers/${id}`, payload);
  return response;
};

const updateOfferViewsById = async (id: number): Promise<Offer> => {
  const { data } = await api.patch(`/offers/${id}`);
  return data;
};

const deleteOfferById = async (id: number) => {
  const response = await api.delete(`/offers/${id}`);
  return response;
};

export {
  getAllOffers,
  getOfferById,
  getOffersByModel,
  createNewOffer,
  updateOfferById,
  updateOfferViewsById,
  deleteOfferById,
};
