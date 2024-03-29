import React from "react";
import "./OfferForm.css";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Spin } from "antd";

import useForm from "../../hooks/useForm";
import { createNewOffer, updateOfferById } from "../../services/offers-service";
import { toastOptions } from "../../utils/options";

interface OfferFormProps {
  currentState: Offer | null;
  onClose: () => void;
  clearCurrentOffer: () => void;
}

const initialState: OfferDto = {
  model: "",
  brand: "",
  year: "",
  color: "",
  licensePlate: "",
  city: "",
  price: 0.0,
  photos: [],
  mileage: "",
};

export default function OfferForm({
  currentState,
  onClose,
  clearCurrentOffer,
}: OfferFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    formData,
    handleInputChange,
    handleInputNumberChange,
    handleUploadFile,
  } = useForm(currentState || initialState);

  const handleEditOffer = async (offerId: number, payload: OfferDto) => {
    const response = await updateOfferById(offerId, payload);

    if (response.status == 200) {
      toast.success("Oferta editar com sucesso!", toastOptions);
    } else {
      toast.error("Erro ao editar oferta!", toastOptions);
    }

    clearCurrentOffer();
    onClose();
    setIsLoading(false);
  };

  const handleAddOffer = async (payload: OfferDto) => {
    try {
      await createNewOffer(payload);
      toast.success("Oferta criada com sucesso!", toastOptions);
    } catch (error) {
      toast.error("Arquivo muito grande!", toastOptions);
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setIsLoading(true);

    if (currentState) {
      handleEditOffer(currentState.id, formData);
    } else {
      handleAddOffer(formData);
    }
  };

  const { model, brand, city, color, licensePlate, mileage, price, year } =
    formData;

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header">
        <button onClick={onClose}>
          <CloseOutlined />
        </button>
      </div>
      <form className="form-content">
        <div className="form-group">
          <ul>
            <li className="form-input">
              <label htmlFor="model">Modelo</label>
              <input
                id="model"
                type="text"
                value={model}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-input">
              <label htmlFor="brand">Marca</label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-input">
              <label htmlFor="price">Preço</label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={handleInputNumberChange}
              />
            </li>
            <li className="form-input">
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={handleInputChange}
              />
            </li>
          </ul>
          <ul>
            <li className="form-input">
              <label htmlFor="year">Ano</label>
              <input
                id="year"
                type="text"
                value={year}
                onChange={handleInputNumberChange}
              />
            </li>
            <li className="form-input">
              <label htmlFor="mileage">Quilometragem</label>
              <input
                id="mileage"
                type="text"
                value={mileage}
                onChange={handleInputNumberChange}
              />
            </li>
            <li className="form-input">
              <label htmlFor="color">Cor</label>
              <input
                id="color"
                type="text"
                value={color}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-input">
              <label htmlFor="licensePlate">Placa</label>
              <input
                id="licensePlate"
                type="text"
                value={licensePlate}
                onChange={handleInputChange}
              />
            </li>
          </ul>
        </div>
      </form>
      <div className="form-bottom">
        {!currentState ? (
          <div className="form-file">
            <label htmlFor="photos">
              <span>
                <FileAddOutlined />
              </span>
              <span>Enviar imagem</span>
            </label>
            <input
              id="photos"
              type="file"
              name="photos"
              onChange={handleUploadFile}
            />
          </div>
        ) : null}
        <button className="form-button" onClick={handleFormSubmit}>
          {isLoading ? (
            <Spin className="form-loading" size="small" />
          ) : currentState ? (
            "Editar oferta"
          ) : (
            "Adicionar oferta"
          )}
        </button>
      </div>
    </motion.div>
  );
}
