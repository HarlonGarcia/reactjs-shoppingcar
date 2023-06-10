import React from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import {
  BorderlessTableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { useOfferSelector } from "../../hooks/useOfferSelector";
import { getOffers } from "../../features/offer-slice";
import { AppDispatch } from "../../utils/store";
import CustomButton from "../../components/shared/CustomButton/CustomButton";
import OfferList from "../../components/OfferList/OfferList";
import OfferCards from "../../components/OfferCard/OfferCard";

const selectedButton = {
  backgroundColor: "#2c2c2c",
  color: "#FFFAFA",
};

export default function Home() {
  const [isGrade, setIsGrade] = React.useState(true);
  const offers = useOfferSelector((state) => [...state.offers].flat());
  const isUpdated = useOfferSelector((state) => state.isUpdated);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async (startsWith?: string) => {
    startsWith ? "" : dispatch(getOffers());
  };

  React.useEffect(() => {
    fetchData();
  }, [isUpdated]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Melhores ofertas</h1>
        <div className="home-buttons">
          <CustomButton
            onClick={() => setIsGrade(true)}
            style={isGrade ? selectedButton : {}}
          >
            <BorderlessTableOutlined />
          </CustomButton>
          <button
            onClick={() => setIsGrade(false)}
            style={isGrade ? {} : selectedButton}
          >
            <UnorderedListOutlined />
          </button>
        </div>
      </header>
      <div className="home-offers-container">
        {isGrade ? <OfferCards data={offers} /> : <OfferList data={offers} />}
      </div>
    </div>
  );
}
