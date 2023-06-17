import React from "react";
import "./Overlay.css";
import OfferForm from "../OfferForm/OfferForm";
import { ActionEnum } from "../../pages/AdminPanel/AdminPanel";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { deleteOfferById } from "../../services/offers-service";

interface OverlayProps {
  isOpen: boolean;
  toggleModal: () => void;
  currentOffer: Offer | null;
  action: ActionEnum;
  onCancel: () => void;
  clearCurrentOffer: () => void;
}

export default function Overlay({
  isOpen,
  toggleModal,
  currentOffer,
  action,
  onCancel,
  clearCurrentOffer,
}: OverlayProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isForm, setIsForm] = React.useState(false);

  const handleAction = () => {
    if (action == ActionEnum.ADD || action == ActionEnum.EDIT) {
      setIsForm(true);
      toggleModal();
    } else {
      if (currentOffer) {
        handleDeleteOffer(currentOffer.id);
      }
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
      deleteOfferById(offerId);

      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 3000);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        action={action}
        onOk={handleAction}
        onCancel={onCancel}
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
