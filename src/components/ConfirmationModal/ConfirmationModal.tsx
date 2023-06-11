import { Modal } from "antd";
import React from "react";
import { api } from "../../utils/api";
import { ActionEnum } from "../../pages/AdminPanel/AdminPanel";
import OfferForm from "../OfferForm/OfferForm";
import Overlay from "../Overlay/Overlay";
import { setNotUpdated } from "../../features/offer-slice";

interface ConfirmationModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  currentOffer: Offer | null;
  action: ActionEnum;
  onCancel: () => void;
  clearCurrentOffer: () => void;
}

export default function ConfirmationModal({
  isOpen,
  toggleModal,
  currentOffer,
  action,
  onCancel,
  clearCurrentOffer,
}: ConfirmationModalProps) {
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

  const handleDeleteOffer = async (offerId: number) => {
    if (offerId) {
      setIsLoading(true);
      api.delete(`/offers/${offerId}`);

      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    toggleModal();
    setIsForm(false);
    clearCurrentOffer();
  };

  return (
    <>
      {isOpen || isForm ? <Overlay onClose={handleClose} /> : null}
      <Modal
        title={action == ActionEnum.DELETE ? "Deletar oferta" : "Editar oferta"}
        open={isOpen}
        onOk={handleAction}
        confirmLoading={isLoading}
        onCancel={onCancel}
      >
        <p>
          Você tem certeza que deseja{" "}
          {action == ActionEnum.DELETE
            ? "deletar"
            : action == ActionEnum.ADD
            ? "adicionar"
            : "editar"}{" "}
          a oferta?
        </p>
      </Modal>
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
