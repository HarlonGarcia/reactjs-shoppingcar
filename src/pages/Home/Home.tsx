import "./Home.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Card, Space } from "antd";
import Meta from "antd/es/card/Meta";

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
    <div>
      <h1>Melhores ofertas</h1>
      <Space>
        {offers.map((offer, index) => (
          <Card
            key={index.toString() + offer.model}
            title={offer.model}
            content=""
            hoverable
          >
            <Meta title={offer.brand} description={offer.color} />
          </Card>
        ))}
      </Space>
    </div>
  );
}
