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

const createNewOffer = async (payload: Offer | OfferDto): Promise<Offer> => {
  const { data } = await api.post(`/offers`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

const updateOfferById = async (
  id: number,
  payload: Offer | OfferDto
): Promise<Offer> => {
  const { data } = await api.put(`/offers/${id}`, payload);
  return data;
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
