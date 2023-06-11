import React from "react";
import "./Overlay.css";

interface OverlayProps {
  onClose: () => void;
}

export default function Overlay({ onClose }: OverlayProps) {
  return (
    <div className="overlay" onClick={onClose}>
      Overlay
    </div>
  );
}
