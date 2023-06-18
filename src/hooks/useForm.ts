import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/options";

const useForm = (initialState: OfferDto) => {
  const [formData, setFormData] = useState<OfferDto>(initialState);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [target.id]: target.value });
  };

  const handleInputNumberChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const newValue = target.value.replace(/\D/g, "");
    setFormData({ ...formData, [target.id]: newValue });
  };

  const handleUploadFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (file) {
      setFormData({ ...formData, [target.id]: file });
      toast("Imagem enviada com sucesso!", toastOptions);
    }
  };

  return {
    formData,
    handleInputChange,
    handleInputNumberChange,
    handleUploadFile,
  };
};

export default useForm;
