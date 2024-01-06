import { useContext, useRef, useState, createContext, useEffect } from "react";

const CanvasContext = createContext();

// eslint-disable-next-line react/prop-types
export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [brushStrokeWidth,setBrushStrokeWidth] = useState(2)
  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight;


    const context = canvas.getContext("2d")
    context.scale(1.10, 1.065);
    context.lineCap = "round";
    context.strokeStyle = "blue";
    context.lineWidth = brushStrokeWidth;
    contextRef.current = context;
  };

useEffect(() => {
  contextRef.current.lineWidth = brushStrokeWidth;
}, [brushStrokeWidth])


  const changeBrushProperties = (color) =>{
    contextRef.current.strokeStyle = color
  }


  
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX,offsetY)
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        prepareCanvas,
        changeBrushProperties,setBrushStrokeWidth, brushStrokeWidth,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvas = () => useContext(CanvasContext);