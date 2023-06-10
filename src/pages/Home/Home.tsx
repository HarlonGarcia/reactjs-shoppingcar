import React from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import { Space } from "antd";

import OfferCard from "../../components/OfferCard/OfferCard";
import { useOfferSelector } from "../../hooks/useOfferSelector";
import { getOffers } from "../../features/offer-slice";
import { AppDispatch } from "../../utils/store";

export default function Home() {
  const offers = useOfferSelector((state) => [...state.offers].flat());
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async (startsWith?: string) => {
    startsWith ? "" : dispatch(getOffers());
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Melhores ofertas</h1>
      <div className="home-offers-container">
        {offers.map((offer, index) => (
          <OfferCard key={index.toString() + offer.model} data={offer} />
        ))}
      </div>
    </div>
  );
}
