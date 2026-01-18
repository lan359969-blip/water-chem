import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import DosingPage from '../dosing/DosingPage'

function Home() {
  const [page, setPage] = useState('home')

  if (page === 'dosing') {
    return <DosingPage />
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>水厂加药与配药系统</h1>
      <button onClick={() => setPage('dosing')}>
        进入配药计算模块
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Home />
)