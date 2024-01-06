import { useEffect } from "react";
import { useCanvas } from "../CanvasContext";
import style from "./Canvas.module.css"


export function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas className={style.CanvasStyle}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}

      onPointerDown={startDrawing}
      onPointerMove={draw}
      onPointerUp={finishDrawing}

      
      ref={canvasRef}
    />
  );
}
