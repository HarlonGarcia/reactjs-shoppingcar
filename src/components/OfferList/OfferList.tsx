import "./OfferList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { List } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { AppDispatch } from "../../utils/store";
import CustomButton from "../shared/CustomButton/CustomButton";
import { api } from "../../utils/api";
import { setNotUpdated } from "../../features/offer-slice";
import { formatCurrency } from "../../utils/formatCurrency";
import not_found from "../../assets/not-found.jpg";

interface OfferListProps {
  data: Offer[];
}

interface ListItemProps {
  offer: Offer;
}

export default function OfferList({ data }: OfferListProps) {
  return (
    <List
      itemLayout="vertical"
      size="small"
      dataSource={data}
      pagination={{
        align: "center",
        position: "bottom",
        pageSize: 5,
      }}
      renderItem={(offer, index) => (
        <ListItem key={index.toString() + offer.model} offer={offer} />
      )}
    />
  );
}

function ListItem({ offer }: ListItemProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goToDetails = () => {
    api.patch(`/offers/${offer.id}`);
    dispatch(setNotUpdated());
    navigate(`/${offer.id}`);
  };

  return (
    <List.Item
      extra={
        <figure className="row-cover">
          <img src={offer.photos[0] || not_found} alt={offer.model} />
        </figure>
      }
    >
      <div className="row-main">
        <div className="row-title">
          <h2>
            {offer.model}, {offer.year}
          </h2>
          <h3>{offer.brand}</h3>
        </div>
        <div className="row-details">
          <strong>{formatCurrency(offer.price)}</strong>
          <CustomButton onClick={goToDetails} defaultStyles>
            Ver detalhes
          </CustomButton>
        </div>
        <div className="row-views">
          <small>{offer.views}</small>
          <span>
            <EyeOutlined />
          </span>
        </div>
      </div>
    </List.Item>
  );
}
