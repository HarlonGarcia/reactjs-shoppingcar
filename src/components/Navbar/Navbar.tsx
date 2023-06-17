import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import MenuToggle from "../MenuToggle/MenuToggle";
import Menu from "../Menu/Menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-content">
          <h1>ShoppingCar</h1>
          <div className="navbar-items">
            <button>
              <Link to="/">Ofertas</Link>
            </button>
            <button>
              <Link to="/admin">Administrar</Link>
            </button>
          </div>
          <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </header>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
