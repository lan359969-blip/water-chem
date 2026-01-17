import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <header className="header">
        <h1>🧪 水处理加药计算系统</h1>
        <p className="version">工程级 v3.0.0</p>
      </header>

      <div className="nav-grid">
        <div className="nav-card" onClick={() => navigate('/dosing-calculation')}>
          <div className="nav-icon">💊</div>
          <h2>加药加氯计算</h2>
          <p>一期/二期加药量、加氯量精确计算</p>
        </div>

        <div className="nav-card" onClick={() => navigate('/drug-consumption')}>
          <div className="nav-icon">📊</div>
          <h2>药剂消耗核算</h2>
          <p>班报/日报自动生成，消耗统计</p>
        </div>

        <div className="nav-card" onClick={() => navigate('/dosing-system')}>
          <div className="nav-icon">⚗️</div>
          <h2>配药计算系统</h2>
          <p>混凝剂/助凝剂配药水量计算</p>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 水处理加药计算系统</p>
        <p className="footer-sub">工程级架构 | 数据本地化存储</p>
      </footer>
    </div>
  )
}

export default Home