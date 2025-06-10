import React, { useState, useEffect, useRef } from "react";

export const CanvasImages = () => {
  // Estado inicial para las dimensiones del canvas
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // Referencia al canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight; 
    setDimension({ width: canvasWidth, height: canvasHeight });

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    alert(canvas.width );
    alert(canvas.height );
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "red";
    ctx.fillRect(0,0, canvas.width, canvas.height); 
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full pt-2 h-112 border border-gray-300"
    ></canvas>
  );
};