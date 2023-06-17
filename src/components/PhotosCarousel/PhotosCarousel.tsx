import "./PhotosCarousel.css";
import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { container, item } from "../../utils/options";
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
      <motion.div
        className="carousel-slider"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {photos.map((photoUrl, index) => (
          <motion.div className="carousel-item" key={index} variants={item}>
            <img src={photoUrl} alt={model}></img>
          </motion.div>
        ))}
      </motion.div>
      <div className="carousel-views">
        <EyeOutlined />
        <small>{views} visualizações</small>
      </div>
    </section>
  );
}
