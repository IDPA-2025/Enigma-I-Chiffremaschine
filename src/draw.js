  import React, { useEffect, useRef } from "react";

  const alphabetMap = {
    A: 10, B: 30, C: 50, D: 70, E: 90, F: 110, G: 130, H: 150, I: 170, J: 190,
    K: 210, L: 230, M: 250, N: 270, O: 290, P: 310, Q: 330, R: 350, S: 370, 
    T: 390, U: 410, V: 430, W: 450, X: 470, Y: 490, Z: 510
  };

  const EnigmaVisualizer = ({ connections }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      if (!connections || connections.length === 0) return;
    
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
    
      connections.forEach(({ from, to }) => {
        const startX = alphabetMap[from];
        const startY = 50; // Y-Koordinate für Input-Zeile
        const endX = alphabetMap[to];
        const endY = 350; // Y-Koordinate für Output-Zeile
    
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });
    }, [connections]); // useEffect wird aktualisiert, wenn connections sich ändert.
    
    


    return <canvas ref={canvasRef} width={600} height={400} style={{ border: "1px solid black" }} />;
  };

  export default EnigmaVisualizer;
