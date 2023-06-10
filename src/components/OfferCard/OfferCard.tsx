import React from "react";
import { useNavigate } from "react-router-dom";

import "./OfferCard.css";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { api } from "../../utils/api";
import CustomButton from "../shared/CustomButton";

interface OfferCardProps {
  data: Offer;
}

export default function OfferCard({ data }: OfferCardProps) {
  const navigate = useNavigate();

  const goToDetails = () => {
    api.patch(`/offers/${data.id}`);
    navigate(`/details/${data.id}`);
  };

  return (
    <Card
      className="card-container"
      cover={
        <figure className="card-cover">
          <img
            src="https://api.slingacademy.com/public/sample-photos/1.jpeg"
            alt={data.model}
          />
        </figure>
      }
      actions={[<CustomButton onClick={goToDetails} text="Ver detalhes" />]}
      type="inner"
      hoverable
    >
      <Card.Meta title={`${data.brand}, ${data.year}`} />
      <div className="card-details">
        <strong>{`R$${data.price}`}</strong>
        <div className="card-views">
          <small>{data.views}</small>
          <span>
            <EyeOutlined />
          </span>
        </div>
      </div>
    </Card>
  );
}
