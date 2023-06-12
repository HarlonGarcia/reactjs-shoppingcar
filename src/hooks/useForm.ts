import { useState, ChangeEvent } from "react";

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

  return { formData, handleInputChange, handleInputNumberChange };
};

export default useForm;
