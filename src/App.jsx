import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import DosingCalculation from './DosingCalculation'

function App() {
  return (
    <BrowserRouter basename="/water-chem">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dosing-calculation" element={<DosingCalculation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App