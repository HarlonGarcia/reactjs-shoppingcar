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
import Loader from "../../components/shared/Loader/Loader";
import DataNotFound from "../../components/shared/DataNotFound/DataNotFound";

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

  const { offers, isLoading } = useOfferSelector((state) => state);

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    dispatch(getOffers());
  };

  React.useEffect(() => {
    fetchData();
  }, [isOpen, currentOffer]);

  const handleSearch = async (value: string) => {
    const response = await getOffersByModel(value);
    setSearchOffers(response);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(event.currentTarget.value);
    }
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
          placeholder="Digite o modelo do carro"
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
          size="middle"
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
        pagination={{ pageSize: 5 }}
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
