import { useState, useEffect } from "react";
import "../App.css";

export default function GradientBackground() {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [haloColor, setHaloColor] = useState("rgba(255, 0, 0, 0.1)"); // Halo con menor opacidad
  const [backgroundColor, setBackgroundColor] = useState(
    "linear-gradient(to top left, #111111, #333333, #555555, #111111)"
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: `${e.clientX}px`, y: `${e.clientY}px` });

      // Calcular la distancia a las esquinas
      const topLeft = Math.sqrt(
        Math.pow(e.clientX, 2) + Math.pow(e.clientY, 2)
      );
      const topRight = Math.sqrt(
        Math.pow(window.innerWidth - e.clientX, 2) + Math.pow(e.clientY, 2)
      );
      const bottomLeft = Math.sqrt(
        Math.pow(e.clientX, 2) + Math.pow(window.innerHeight - e.clientY, 2)
      );
      const bottomRight = Math.sqrt(
        Math.pow(window.innerWidth - e.clientX, 2) +
          Math.pow(window.innerHeight - e.clientY, 2)
      );

      // Cambiar el color del halo según la esquina más cercana
      if (topLeft < topRight && topLeft < bottomLeft && topLeft < bottomRight) {
        setHaloColor("rgb(229,9,20)"); // Rojo suave
        setBackgroundColor(
          "linear-gradient(to top left, #111111, #333333, #555555, #111111)"
        ); // Fondo oscuro con toques de gris
      } else if (
        topRight < topLeft &&
        topRight < bottomLeft &&
        topRight < bottomRight
      ) {
        setHaloColor("rgb(46, 85, 255)"); // Azul suave
        setBackgroundColor(
          "linear-gradient(to top right, #111111, #333333, #555555, #111111)"
        );
      } else if (
        bottomLeft < topLeft &&
        bottomLeft < topRight &&
        bottomLeft < bottomRight
      ) {
        setHaloColor("rgb(19, 153, 255)"); // Verde suave
        setBackgroundColor(
          "linear-gradient(to bottom left, #111111, #333333, #555555, #111111)"
        );
      } else {
        setHaloColor("#02ffa1"); // Amarillo suave
        setBackgroundColor(
          "linear-gradient(to bottom right, #111111, #333333, #555555, #111111)"
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="halo"
      style={{ left: position.x, top: position.y, background: haloColor }}
    ></div>
  );
}

//   radial-gradient(circle at top left, rgb(229,9,20), transparent),
//               radial-gradient(circle at top right, rgb(46, 85, 255), transparent),
//               radial-gradient(circle at bottom left, #90dffe, transparent),
//               radial-gradient(circle at bottom right, #02ffa1, transparent);
