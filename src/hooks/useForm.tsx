import { useState } from "react";
import { initialState } from "../App";

export const useForm = (initState = initialState) => {
  const [formData, setFormData] = useState(initState);

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      touched: {
        ...formData.touched,
        [e.target.name]: true,
      },
    });
  };

  const reset = () => setFormData(initialState);

  return { formData, handleInputChange, reset };
};
