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
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef();

  useEffect(() => {
    setFade(true);
    const id = setInterval(() => {
      setFade(false);
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
