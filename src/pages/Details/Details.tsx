import React from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import {
  BgColorsOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { api } from "../../utils/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import PhotosCarousel from "../../components/PhotosCarousel/PhotosCarousel";

export default function Details() {
  const [offer, setOffer] = React.useState<Offer | null>(null);
  const { offerId } = useParams();

  const getCurrentOffer = async (offerId: string) => {
    const { data } = await api.get(`/offers/${offerId}`);
    setOffer(data);
  };

  React.useEffect(() => {
    if (offerId) {
      getCurrentOffer(offerId);
    }
  }, []);

  if (!offer)
    return (
      <div className="details-nodata">
        <h1>Não há nada aqui</h1>
        <span>{`:(`}</span>
      </div>
    );
  return (
    <div className="details-container">
      <h1>{offer.model}</h1>
      <PhotosCarousel
        views={offer.views}
        photos={offer.photos}
        model={offer.model}
      />
      <div>
        <small>Preço</small>
        <strong>{formatCurrency(offer.price)}</strong>
      </div>
      <section className="details-characteristics">
        <h2>Detalhes sobre o carro</h2>
        <div>
          <ul className="details-info">
            <li className="info">
              <FlagOutlined />
              <div>
                <small>Marca</small>
                <strong>{offer.brand}</strong>
              </div>
            </li>
            <li className="info">
              <BgColorsOutlined />
              <div>
                <small>Cor</small>
                <strong>{offer.color}</strong>
              </div>
            </li>
            <li className="info">
              <CalendarOutlined />
              <div>
                <small>Ano</small>
                <strong>{offer.year}</strong>
              </div>
            </li>
          </ul>
          <ul className="details-info">
            <li className="info">
              <EnvironmentOutlined />
              <div>
                <small>Cidade</small>
                <strong>{offer.city}</strong>
              </div>
            </li>
            <li className="info">
              <TagOutlined />
              <div>
                <small>Placa</small>
                <strong>{offer.licensePlate}</strong>
              </div>
            </li>
            <li className="info">
              <DashboardOutlined />
              <div>
                <small>Quilometragem</small>
                <strong>{offer.mileage}km</strong>
              </div>
            </li>
            <li className="info">
              <CarryOutOutlined />
              <div>
                <small>Data de cadastro</small>
                <strong>{formatDate(offer.registrationDate)}</strong>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
