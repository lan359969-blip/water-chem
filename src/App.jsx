import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Dosing from './Dosing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dosing" element={<Dosing />} />
    </Routes>
  )
}

export default App