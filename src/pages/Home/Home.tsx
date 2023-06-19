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
import OfferCards from "../../components/OfferCards/OfferCards";
import DataNotFound from "../../components/shared/DataNotFound/DataNotFound";
import Loader from "../../components/shared/Loader/Loader";

const selectedButton = {
  backgroundColor: "#2c2c2c",
  color: "#FFFAFA",
};

export default function Home() {
  const [isGrade, setIsGrade] = React.useState(true);
  const { offers, isLoading } = useOfferSelector((state) => state);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    dispatch(getOffers());
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader />;
  if (offers.length <= 0) return <DataNotFound path="home" />;
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
      {isGrade ? <OfferCards data={offers} /> : <OfferList data={offers} />}
    </div>
  );
}
