import { Canvas } from "./Components/Canvas/Canvas"
import { CanvasButtons } from "./Components/Buttons/CanvasButtons"
import { CanvasProvider } from "./Components/CanvasContext"
import style from "./App.module.css"

const App = () => {
  return (
    <div className={style.Container}>
    <CanvasProvider>

          <Canvas/>
      <CanvasButtons/>
    </CanvasProvider>
      </div>
  )
}

export default App