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
import { motion } from "framer-motion";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import PhotosCarousel from "../../components/PhotosCarousel/PhotosCarousel";
import { getOfferById } from "../../services/offers-service";
import Loader from "../../components/shared/Loader/Loader";

export default function Details() {
  const [offer, setOffer] = React.useState<Offer | null>(null);

  const { offerId } = useParams();

  const getCurrentOffer = async (offerId: string) => {
    const currentOffer = await getOfferById(Number(offerId));
    setOffer(currentOffer);
  };

  React.useEffect(() => {
    if (offerId) {
      getCurrentOffer(offerId);
    }
  }, [offerId]);

  if (!offer) return <Loader />;
  return (
    <motion.div
      className="details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
}
