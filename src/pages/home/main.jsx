import React from 'react'
import ReactDOM from 'react-dom/client'

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>水厂加药与配药系统</h1>

      <a href="./src/pages/dosing/index.html">
        进入配药计算模块
      </a>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Home />
)