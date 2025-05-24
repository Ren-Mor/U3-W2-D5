import { useEffect, useState, useRef } from "react";
import roma from "../assets/Rome.jpg";
import tokyo from "../assets/Tokyo.jpg";
import newyork from "../assets/New York.jpg";
import paris from "../assets/Paris.jpg";
import saintpaulo from "../assets/Saint Paulo.jpg";
import barcelona from "../assets/Barcelona.jpg";
import sydney from "../assets/Sydney.jpg";
import london from "../assets/London.jpg";
import moscow from "../assets/Moscow.jpg";

// Array di immagini in assets
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

function Slideshow({ interval = 6000, fadeDuration = 300 }) {
  // Gestisco quale immagine mostrare e l'effetto di dissolvenza
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef();

  useEffect(() => {
    // Imposto l'immagine come visibile all'inizio
    setFade(true);

    // Intervallo per cambiare l'immagine
    const id = setInterval(() => {
      // Nascondo l'immagine corrente
      setFade(false);

      // Breve ritardo e cambio immagine
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, fadeDuration);
    }, interval);

    return () => {
      clearInterval(id);
      clearTimeout(timeoutRef.current);
    };
  }, [interval, fadeDuration]);

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
        transition: `opacity ${fadeDuration}ms`,
        opacity: fade ? 1 : 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
      draggable={false}
    />
  );
}

export default Slideshow;
