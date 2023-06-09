import React from "react";
import "./Menu.css";
import { AppstoreAddOutlined, CarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu-container ${isOpen ? "" : "closed"}`}>
      <button onClick={toggleMenu}>
        <Link to="/">
          <CarOutlined />
          <span>Ofertas</span>
        </Link>
      </button>
      <button onClick={toggleMenu}>
        <Link to="/admin">
          <AppstoreAddOutlined />
          <span>Administrar</span>
        </Link>
      </button>
    </div>
  );
}
