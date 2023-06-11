import React from "react";
import "./PhotosCarousel.css";
import { EyeOutlined } from "@ant-design/icons";

interface PhotosCarouselProps {
  views: number;
  photos: string[];
  model: string;
}

export default function PhotosCarousel({
  views,
  photos,
  model,
}: PhotosCarouselProps) {
  return (
    <section className="carousel-container">
      <div className="carousel-title">
        <small>{photos.length} fotos disponíveis</small>
      </div>
      <div className="carousel-slider">
        {photos.map((photoUrl, index) => (
          <div className="carousel-item" key={index}>
            <img src={photoUrl} alt={model}></img>
          </div>
        ))}
      </div>
      <div className="carousel-views">
        <EyeOutlined />
        <small>{views} visualizações</small>
      </div>
    </section>
  );
}
