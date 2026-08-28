import { useState } from 'react'
import Game from './components/Game/Game.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Game/>
    </>
  )
}

export default App
