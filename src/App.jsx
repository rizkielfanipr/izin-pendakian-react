import { useState } from 'react'
import PerizinanForm from './components/PerizinanForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PerizinanForm />
  )
}

export default App
