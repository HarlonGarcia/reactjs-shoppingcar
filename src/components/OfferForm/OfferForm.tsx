import "./OfferForm.css";
import useForm from "../../hooks/useForm";
import { api } from "../../utils/api";

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
  const { formData, handleInputChange, handleInputNumberChange } = useForm(
    currentState || initialState
  );

  const handleEditOffer = async (offerId: number, payload: OfferDto) => {
    await api.put(`/offers/${offerId}`, payload);
    clearCurrentOffer();
    onClose();
  };

  const handleAddOffer = async (payload: OfferDto) => {
    await api.post(`/offers`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onClose();
  };

  const handleFormSubmit = () => {
    if (currentState) {
      handleEditOffer(currentState.id, formData);
    } else {
      handleAddOffer(formData);
    }
  };

  const { model, brand, city, color, licensePlate, mileage, price, year } =
    formData;

  return (
    <div className="form-container">
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
      <button className="form-button" onClick={handleFormSubmit}>
        {currentState ? "Editar oferta" : "Adicionar oferta"}
      </button>
    </div>
  );
}
