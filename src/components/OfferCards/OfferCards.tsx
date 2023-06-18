import "./OfferCards.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { AppDispatch } from "../../utils/store";
import CustomButton from "../shared/CustomButton/CustomButton";
import { setNotUpdated } from "../../features/offer-slice";
import { formatCurrency } from "../../utils/formatCurrency";
import not_found from "../../assets/not-found.jpg";
import { updateOfferViewsById } from "../../services/offers-service";
import { container, item } from "../../utils/options";

interface OfferCardsProps {
  data: Offer[];
}

interface OfferCardItemProps {
  offer: Offer;
}

export default function OfferCards({ data }: OfferCardsProps) {
  return (
    <motion.ul
      className="card-container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {data.map((offer, index) => (
        <motion.li key={index.toString() + offer.model} variants={item}>
          <OfferCardItem offer={offer} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

function OfferCardItem({ offer }: OfferCardItemProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goToDetails = () => {
    updateOfferViewsById(offer.id);
    dispatch(setNotUpdated());
    navigate(`/${offer.id}`);
  };

  return (
    <Card
      className="card-item"
      cover={
        <figure className="card-cover">
          <img src={offer.photos[0] || not_found} alt={offer.model} />
        </figure>
      }
      actions={[
        <CustomButton onClick={goToDetails}>Ver detalhes</CustomButton>,
      ]}
      type="inner"
      hoverable
    >
      <Card.Meta title={`${offer.model}, ${offer.year}`} />
      <h3>{offer.brand || "Marca não informada"}</h3>
      <div className="card-details">
        <strong>{formatCurrency(offer.price)}</strong>
        <div className="card-views">
          <small>{offer.views}</small>
          <span>
            <EyeOutlined />
          </span>
        </div>
      </div>
    </Card>
  );
}
