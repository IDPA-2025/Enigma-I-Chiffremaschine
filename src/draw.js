import React, { useEffect, useRef } from "react";

// Hilfsfunktion: Buchstabe aus X-Koordinate berechnen
function getLetter(number) {
  return String.fromCharCode(((number - 40) / 20) + 65);
}

const drawRectWithLabel = (
  ctx,
  x,
  y,
  width,
  height,
  label = '',
  rectColor = 'lightgray',
  textColor = 'white',
  font = '16px Arial',
  walzePosition = null // Parameter für die Walzenposition
) => {
  // Rechteck
  ctx.fillStyle = rectColor;
  ctx.fillRect(x, y, width, height);

  // Text oberhalb (aber diesmal gespiegelt zurückdrehen!)
  if (label) {
    ctx.save(); // Aktuelle Transformation sichern
    ctx.scale(1, -1); // Y-Achse spiegeln, damit Text normal angezeigt wird

    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    // Wichtig: Y-Koordinate ebenfalls spiegeln!
    ctx.fillText(label, x + width / 2, -y + 15); // +15 statt -10 wegen umgedrehter Y-Achse

    ctx.restore(); // Zurück zur ursprünglichen Transformation
  }

  // Wenn Walzenposition vorhanden ist, zeichne die Position neben dem Rechteck
  if (walzePosition !== null) {
    ctx.save();
    ctx.scale(1, -1); // Wiederherstellen der Transformation
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`Pos: ${walzePosition}`, x + width + 20, -y); // Position der Walze an der Seite
    ctx.restore();
  }
};



const EnigmaVisualizer = ({ koordinatenMap, enigma }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!koordinatenMap || !enigma) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Canvas zurücksetzen und leeren
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);

    // Spiegelung anwenden (y-Achse invertieren)
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1);
    ctx.translate(-width / 2, -height / 2);

    // Zeichne Rechtecke für das Steckerbrett und die Walzen
    drawRectWithLabel(ctx, 10, 40, 580, 50, 'Input/Output', 'lightgray', 'white', '16px Arial');
    drawRectWithLabel(ctx, 10, 130, 580, 50, 'Steckerbrett');
    drawRectWithLabel(ctx, 10, 220, 580, 50, 'Walze 1', 'lightgray', 'white', '16px Arial', enigma.Walze1.position+1);
    drawRectWithLabel(ctx, 10, 310, 580, 50, 'Walze 2', 'lightgray', 'white', '16px Arial', enigma.Walze2.position);
    drawRectWithLabel(ctx, 10, 400, 580, 50, 'Walze 3', 'lightgray', 'white', '16px Arial', enigma.Walze3.position  );
    drawRectWithLabel(ctx, 10, 490, 580, 50, 'Reflektor');
    
    // Punkte und Linien zeichnen
    let previousPoint = null;

    koordinatenMap.forEach((value, index) => {
      const [y, x] = value; // Hinweis: value = [y, x]

      // Punkt zeichnen
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();

      // Text (Buchstabe) über dem Punkt zeichnen
      ctx.save(); // Transformation sichern
      ctx.scale(1, -1); // Y-Achse wieder normalisieren für Text
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.fillText(`${getLetter(x)}`, x + 10, -y - 10);
      ctx.restore(); // Ursprüngliche Transformation wiederherstellen

      // Verbindung zum vorherigen Punkt
      if (previousPoint) {
        ctx.beginPath();
        ctx.moveTo(previousPoint[0], previousPoint[1]);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "red";
        ctx.stroke();
      }

      previousPoint = [x, y];
    });

  }, [koordinatenMap, enigma]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
};


export default EnigmaVisualizer;
