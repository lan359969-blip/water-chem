import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import DosingPage from './pages/dosing/DosingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dosing" element={<DosingPage />} />
    </Routes>
  )
}

export default App