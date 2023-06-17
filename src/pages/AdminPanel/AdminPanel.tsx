import React from "react";
import "./AdminPanel.css";
import { Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Overlay from "../../components/Overlay/Overlay";
import { useOfferSelector } from "../../hooks/useOfferSelector";
import { getOffers } from "../../features/offer-slice";
import { AppDispatch } from "../../utils/store";
import { getOffersByModel } from "../../services/offers-service";

export enum ActionEnum {
  EDIT,
  DELETE,
  ADD,
  NONE,
}

export default function AdminPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [action, setAction] = React.useState<ActionEnum>(ActionEnum.NONE);
  const [currentOffer, setCurrentOffer] = React.useState<Offer | null>(null);
  const [searchOffers, setSearchOffers] = React.useState<Offer[]>();

  const offers: Offer[] = useOfferSelector((state) => [...state.offers].flat());
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    dispatch(getOffers());
  };

  React.useEffect(() => {
    fetchData();
  }, [isOpen, currentOffer]);

  const onSearch = async (value: string) => {
    const response = await getOffersByModel(value);
    setSearchOffers(response);
  };

  const handleAction = async (action: ActionEnum, offer?: Offer) => {
    if (offer) {
      setCurrentOffer(offer);
    }
    setAction(action);
    setIsOpen(true);
  };

  const clearCurrentOffer = () => {
    setCurrentOffer(null);
  };

  const handleRowStyle = (record: Offer, index: number) => {
    return index % 2 === 0 ? "admin-table-row-even" : "admin-table-row-odd";
  };

  return (
    <motion.div
      className="admin-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Overlay
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        currentOffer={currentOffer}
        clearCurrentOffer={clearCurrentOffer}
        action={action}
      />
      <div className="admin-header">
        <Input.Search
          className="admin-search"
          placeholder="Digite o modelo"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <Table
        className="admin-table"
        dataSource={searchOffers || offers}
        size="middle"
        rowKey={({ id }) => id}
        rowClassName={handleRowStyle}
      >
        <Table.Column title="ID" key={"id"} render={({ id }) => id} />
        <Table.Column
          title="Modelo"
          key={"model"}
          render={({ model }) => model}
        />
        <Table.Column
          title="Marca"
          key={"brand"}
          render={({ brand }) => brand}
        />
        <Table.Column
          title="Ações"
          key={"action"}
          render={(offer) => (
            <Space size="middle">
              <button onClick={() => handleAction(ActionEnum.EDIT, offer)}>
                <EditOutlined className="edit-icon" />
              </button>
              <button onClick={() => handleAction(ActionEnum.DELETE, offer)}>
                <DeleteOutlined className="delete-icon" />
              </button>
            </Space>
          )}
        />
      </Table>
      <button
        className="admin-add-button"
        onClick={() => handleAction(ActionEnum.ADD)}
      >
        Adicionar oferta
      </button>
    </motion.div>
  );
}
