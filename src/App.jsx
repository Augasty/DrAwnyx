import { Canvas } from "./Components/Canvas/Canvas"
import { CanvasButtons } from "./Components/Buttons/CanvasButtons"
import { CanvasProvider } from "./Components/CanvasContext"
import style from "./App.module.css"

const App = () => {
  return (
    <CanvasProvider>
      <div className={style.Container}>

          <Canvas/>
      <CanvasButtons/>
      </div>
    </CanvasProvider>
  )
}

export default App