import { useEffect, useState } from "react";
import roma from "../assets/Rome.jpg";
import tokyo from "../assets/Tokyo.jpg";
import newyork from "../assets/New York.jpg";
import paris from "../assets/Paris.jpg";
import saintpaulo from "../assets/Saint Paulo.jpg";
import barcelona from "../assets/Barcelona.jpg";
import sydney from "../assets/Sydney.jpg";
import london from "../assets/London.jpg";
import moscow from "../assets/Moscow.jpg";

const images = [
  roma,
  tokyo,
  newyork,
  paris,
  saintpaulo,
  barcelona,
  sydney,
  london,
  moscow,
];

function Slideshow({ interval = 5000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <img
      src={images[index]}
      alt=""
      style={{
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        transition: "opacity 0.7s",
        pointerEvents: "none",
        userSelect: "none",
      }}
      draggable={false}
    />
  );
}

export default Slideshow;
