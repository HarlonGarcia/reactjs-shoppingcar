import "./ConfirmationModal.css";
import { Modal } from "antd";

import { ActionEnum } from "../../pages/AdminPanel/AdminPanel";

interface ConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  action: ActionEnum;
  onOk: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  isLoading,
  action,
  onOk,
  onCancel,
}: ConfirmationModalProps) {
  const selectActionText = (action: ActionEnum) => {
    if (action == ActionEnum.EDIT) {
      return "Editar";
    }
    if (action == ActionEnum.ADD) {
      return "Adicionar";
    }
    if (action == ActionEnum.DELETE) {
      return "Deletar";
    }
  };

  return (
    <>
      <Modal
        title={`${selectActionText(action)} oferta`}
        open={isOpen}
        onOk={onOk}
        confirmLoading={isLoading}
        onCancel={onCancel}
      >
        <p className="modal-description">
          Você tem certeza que deseja
          <span
            className={`${action == ActionEnum.DELETE ? "modal-delete" : ""}`}
          >
            {selectActionText(action)?.toLowerCase()}
          </span>
          a oferta?
        </p>
      </Modal>
    </>
  );
}
