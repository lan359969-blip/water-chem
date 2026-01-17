import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import DosingCalculation from './DosingCalculation'
import DrugConsumption from './DrugConsumption'
import DosingSystem from './DosingSystem'

function App() {
  return (
    <BrowserRouter   basename="/water-chem">
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