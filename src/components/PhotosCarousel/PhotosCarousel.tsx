import "./PhotosCarousel.css";
import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";

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
        {photos.length > 0 ? (
          <small>{photos.length} fotos disponíveis</small>
        ) : (
          <small>
            <FileExcelOutlined /> Nenhuma foto disponível
          </small>
        )}
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
