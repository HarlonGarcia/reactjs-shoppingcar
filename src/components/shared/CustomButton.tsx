import React from "react";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  style?: {};
}

export default function CustomButton({
  text,
  onClick,
  style,
}: CustomButtonProps) {
  return (
    <button onClick={onClick} style={style}>
      {text}
    </button>
  );
}
