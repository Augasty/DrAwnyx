import { useEffect } from "react";
import { useCanvas } from "../CanvasContext";
import style from "./style.module.css";
export const CanvasButtons = () => {
  const {canvasRef,
    clearCanvas,changeBrushProperties,setBrushStrokeWidth,brushStrokeWidth,undo } = useCanvas();



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") {
        event.preventDefault(); // Prevent the default browser behavior (like scrolling)
        undo(); // Trigger the undo function when Ctrl + Z is pressed
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo]);







  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const originalBackgroundColor = canvas.style.backgroundColor; // Store original background color
    canvas.style.backgroundColor = "white"; // Set temporary background color to white
    
    const link = document.createElement('a');
    const currentDate = new Date().toISOString().slice(0, 10); // Get today's date
    const currentTime = new Date().toLocaleTimeString(); // Get current time

    link.download = `canvas_image_${currentDate}_${currentTime}.png`; // Default filename
    link.href = canvas.toDataURL(); // Create a data URL of the canvas content
    link.click();

    canvas.style.backgroundColor = originalBackgroundColor; // Restore original background color
  };

  return (
    <div className={style.ButtonContainer}>
      <button
        className={`${style.ButtonStyle} ${style.RedButton}`}
        onClick={() => changeBrushProperties("red")}
      >
        Red
      </button>
      <button
        className={`${style.ButtonStyle} ${style.BlueButton}`}
        onClick={() => changeBrushProperties("blue")}
      >
        Blue
      </button>
      <button
        className={`${style.ButtonStyle} ${style.BlackButton}`}
        onClick={() => changeBrushProperties("black")}
      >
        Black
      </button>
      <button
        className={`${style.ButtonStyle} ${style.ClearButton}`}
        onClick={() => {
          changeBrushProperties("white");
          setBrushStrokeWidth(10);
        }}
      >
        Erase
      </button>

      <div className={style.ButtonRow}>
        <button
          className={`${style.ButtonStyle} ${style.SmallButton}`}
          onClick={() => setBrushStrokeWidth((prev) => prev + 1)}
        >
          +
        </button>
        <button
          className={`${style.ButtonStyle} ${style.SmallButton}`}
          onClick={() => setBrushStrokeWidth((prev) => prev - 1)}
          disabled={brushStrokeWidth <= 1}
        >
          {" "}
          -{" "}
        </button>
      </div>
      <button className={`${style.ButtonStyle} ${style.ClearButton}`} disabled>
        Size:{brushStrokeWidth}
      </button>
      <br />
      <button
        className={`${style.ButtonStyle} ${style.ClearButton}`}
        onClick={() => undo()}
      >
        Undo
      </button>

      <br />
      <button
        className={`${style.ButtonStyle} ${style.ClearButton}`}
        onClick={clearCanvas}
      >
        Clear
      </button>
      <button
        className={`${style.ButtonStyle} ${style.ClearButton}`}
        onClick={downloadCanvas}
        style={{fontWeight:'bolder'}}
      >
        💾
      </button>
    </div>
  );
};
