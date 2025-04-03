import React, { useEffect, useRef } from "react";

const EnigmaVisualizer = ({ koordinatenMap }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!koordinatenMap) {
      return; // Wenn keine koordinatenMap vorhanden ist, nichts tun
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Canvas leeren und Transformation zurücksetzen
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);

    // Das gesamte Bild spiegeln
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1); // Spiegelung entlang der horizontalen Achse
    ctx.translate(-width / 2, -height / 2);

    let previousPoint = null;

    // Durch die Map iterieren und Punkte zeichnen
    koordinatenMap.forEach((value) => {
      const [y, x] = value; // Werte aus dem Array entnehmen
      
      // Punkt zeichnen
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();

      // Verbindungslinie zum vorherigen Punkt zeichnen
      if (previousPoint) {
        ctx.beginPath();
        ctx.moveTo(previousPoint[0], previousPoint[1]);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
      
      previousPoint = [x, y]; // Aktuellen Punkt speichern
    });
  }, [koordinatenMap]); // Nur neu rendern, wenn sich koordinatenMap ändert

  return <canvas ref={canvasRef} width={600} height={500} style={{ border: "1px solid black" }} />;
};

export default EnigmaVisualizer;