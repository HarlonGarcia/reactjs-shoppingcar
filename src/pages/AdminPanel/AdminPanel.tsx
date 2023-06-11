import React, { useEffect } from "react";
import "./AdminPanel.css";
import { Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useOfferSelector } from "../../hooks/useOfferSelector";
import DataNotFound from "../../components/shared/DataNotFound/DataNotFound";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { useDispatch } from "react-redux";
import { getOffers } from "../../features/offer-slice";
import { AppDispatch } from "../../utils/store";
import { api } from "../../utils/api";

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
  const fetchData = async (startsWith?: string) => {
    startsWith ? "" : dispatch(getOffers());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = async (value: string) => {
    const { data } = await api.get(`/offers/filter?startsWith=${value}`);
    setSearchOffers(data);
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

  return (
    <div className="admin-container">
      <ConfirmationModal
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        currentOffer={currentOffer}
        clearCurrentOffer={clearCurrentOffer}
        action={action}
        onCancel={() => setIsOpen(false)}
      />
      <div className="admin-header">
        <Input.Search
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
                <EditOutlined />
              </button>
              <button onClick={() => handleAction(ActionEnum.DELETE, offer)}>
                <DeleteOutlined />
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
    </div>
  );
}
