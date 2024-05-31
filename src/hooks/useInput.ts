"use client";

import { useState } from "react";

type UseInputProps = { initialValue?: string };

export const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, handleChange] as const;
};
