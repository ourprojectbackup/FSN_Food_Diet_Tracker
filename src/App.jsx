import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './Pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-7xl font-bold underline">
        Hello world!
      </h1>
<Landing/>


    </>
  )
}

export default App



