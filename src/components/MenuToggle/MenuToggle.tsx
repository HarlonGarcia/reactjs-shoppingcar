import "./MenuToggle.css";

interface MenuToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MenuToggle({ isOpen, setIsOpen }: MenuToggleProps) {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={`toggle-container ${isOpen ? "active" : ""}`}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
