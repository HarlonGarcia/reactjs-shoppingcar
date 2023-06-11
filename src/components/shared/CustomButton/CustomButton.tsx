import React from "react";
import "./CustomButton.css";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: {};
  defaultStyles?: boolean;
}

export default function CustomButton({
  children,
  onClick,
  style,
  defaultStyles,
}: CustomButtonProps) {
  return (
    <button
      className={`${defaultStyles ? "custom-button" : ""}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
