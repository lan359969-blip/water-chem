import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import DosingCalculation from './DosingCalculation.jsx'
import DosingPage from './pages/dosing/DosingPage'

function App() {
  return (
    <BrowserRouter basename="/water-chem">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dosing-calculation" element={<DosingCalculation />} />
        <Route path="/dosing-v2" element={<DosingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App