import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import DosingPage from '../dosing/DosingPage'

function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ padding: 20 }}>
      <h1>水厂加药与配药系统</h1>
      <button onClick={() => navigate('/dosing')}>
        进入配药计算模块
      </button>
      {/* 以后新增模块在这里加按钮，例如：
      <button onClick={() => navigate('/chlorine')}>加氯计算模块</button>
      */}
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/"       element={<Home />} />
      <Route path="/dosing" element={<DosingPage onBack={() => navigate('/')} />} />
      {/* 以后新增模块在这里加一行 Route，例如：
      <Route path="/chlorine" element={<ChlorinePage onBack={() => navigate('/')} />} />
      */}
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
