import React from "react";
import "./Overlay.css";

import OfferForm from "../OfferForm/OfferForm";
import { ActionEnum } from "../../pages/AdminPanel/AdminPanel";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { deleteOfferById } from "../../services/offers-service";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/options";

interface OverlayProps {
  isOpen: boolean;
  toggleModal: () => void;
  currentOffer: Offer | null;
  action: ActionEnum;
  clearCurrentOffer: () => void;
}

export default function Overlay({
  isOpen,
  toggleModal,
  currentOffer,
  action,
  clearCurrentOffer,
}: OverlayProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isForm, setIsForm] = React.useState(false);

  const handleAction = () => {
    if (action == ActionEnum.ADD || action == ActionEnum.EDIT) {
      setIsForm(true);
      toggleModal();
    } else if (currentOffer) {
      handleDeleteOffer(currentOffer.id);
    }
  };

  const handleClose = () => {
    toggleModal();
    setIsForm(false);
    clearCurrentOffer();
  };

  const handleDeleteOffer = async (offerId: number) => {
    if (offerId) {
      setIsLoading(true);

      const response = await deleteOfferById(offerId);
      console.log(response);

      if (response.status == 201) {
        toast.success("Oferta deletada com sucesso!", toastOptions);
      } else {
        toast.error("Erro ao deletar oferta!"), toastOptions;
      }

      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        action={action}
        onOk={handleAction}
        onCancel={toggleModal}
      />
      {isOpen || isForm ? (
        <div className="overlay" onClick={handleClose}></div>
      ) : null}
      {isForm ? (
        <OfferForm
          currentState={currentOffer}
          onClose={handleClose}
          clearCurrentOffer={clearCurrentOffer}
        />
      ) : null}
    </>
  );
}
