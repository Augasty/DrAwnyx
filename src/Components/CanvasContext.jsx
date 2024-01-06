import { useContext, useRef, useState, createContext, useEffect } from "react";

const CanvasContext = createContext();

// eslint-disable-next-line react/prop-types
export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [brushStrokeWidth, setBrushStrokeWidth] = useState(2);
  const [drawHistory, setDrawHistory] = useState([]);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.scale(1.1, 1.065);
    context.lineCap = "none";
    context.strokeStyle = "blue";
    context.lineWidth = brushStrokeWidth;
    contextRef.current = context;
  };

  useEffect(() => {
    contextRef.current.lineWidth = brushStrokeWidth;
  }, [brushStrokeWidth]);

  const changeBrushProperties = (color) => {
    contextRef.current.strokeStyle = color;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    // Store the starting point in drawHistory
    setDrawHistory([...drawHistory, { type: 'start', offsetX, offsetY }]);
    
  };
  
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    // Store the end of drawing in drawHistory
    setDrawHistory([...drawHistory, { type: 'finish' }]);
  };
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    console.log('drawing')
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // Store the drawing actions in drawHistory
    setDrawHistory([...drawHistory, { type: 'draw', offsetX, offsetY }]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setDrawHistory([]);
  };

  const undo = () => {
    let lastIndex = drawHistory.length - 1;
    let foundFinish = false;
    
    while (lastIndex >= 0) {
      if (drawHistory[lastIndex].type === 'finish') {
        foundFinish = true;
        break;
      }
      lastIndex--;
    }
    
    if (foundFinish) {
      const undoActions = drawHistory.slice(0, lastIndex);

      setDrawHistory(undoActions);
      redrawCanvas(undoActions);
    } else {
      clearCanvas();
    }
  };


  const redrawCanvas = (actions) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    actions.forEach((action) => {
      switch (action.type) {
        case 'start':
          context.beginPath();
          context.moveTo(action.offsetX, action.offsetY);
          break;
        case 'draw':
          context.lineTo(action.offsetX, action.offsetY);
          context.stroke();
          break;
        default:
          break;
      }
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        prepareCanvas,
        changeBrushProperties,
        setBrushStrokeWidth,
        brushStrokeWidth,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        undo
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
