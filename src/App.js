import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DosingCalculation from './pages/DosingCalculation'
import DrugConsumption from './pages/DrugConsumption'
import DosingSystem from './pages/DosingSystem'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dosing-calculation" element={<DosingCalculation />} />
        <Route path="/drug-consumption" element={<DrugConsumption />} />
        <Route path="/dosing-system" element={<DosingSystem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
