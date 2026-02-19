import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import DosingPage from '../dosing/DosingPage'

const globalStyle = document.createElement('style')
globalStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0e1a;
    color: #e2e8f0;
    font-family: 'Noto Sans SC', sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,200,255,0.012) 2px, rgba(0,200,255,0.012) 4px
    );
    pointer-events: none;
    z-index: 0;
  }

  #root { position: relative; z-index: 1; }
  .mono { font-family: 'Rajdhani', monospace; letter-spacing: 0.05em; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .anim-up   { animation: slide-up 0.35s ease both; }
  .anim-up-2 { animation: slide-up 0.35s 0.08s ease both; }
  .anim-up-3 { animation: slide-up 0.35s 0.16s ease both; }
  .anim-up-4 { animation: slide-up 0.35s 0.24s ease both; }

  .nav-card { transition: border-color 0.2s, background 0.2s; }
  .nav-card:hover { border-color: rgba(0,200,255,0.5) !important; }
  .nav-arrow { transition: transform 0.2s; display: inline-block; }
  .nav-card:hover .nav-arrow { transform: translateX(4px); }

  input:focus {
    outline: none;
    border-color: #00c8ff !important;
    box-shadow: 0 0 0 3px rgba(0,200,255,0.15) !important;
  }
  input::placeholder { color: #4a5568; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  button:active { opacity: 0.82; transform: scale(0.98); }
`
document.head.appendChild(globalStyle)

const T = {
  bg:       '#0a0e1a',
  bgCard:   '#111827',
  bgCardAlt:'#0d1424',
  border:   'rgba(0,200,255,0.15)',
  borderHi: 'rgba(0,200,255,0.45)',
  cyan:     '#00c8ff',
  cyanDim:  'rgba(0,200,255,0.7)',
  green:    '#10d97e',
  amber:    '#f59e0b',
  textPrim: '#e2e8f0',
  textSec:  '#94a3b8',
  textMute: '#4a5568',
}

const MODULES = [
  {
    id: 'dosing',
    icon: '⚗',
    label: '配药计算',
    desc: '混凝剂 · 助凝剂 · 一期/二期',
    tag: '在线',
    tagColor: T.green,
  },
  {
    id: 'chlorine',
    icon: '🧪',
    label: '加药加氯单耗',
    desc: '日单耗统计 · 趋势分析',
    tag: '开发中',
    tagColor: T.amber,
    disabled: true,
  },
]

function StatusBar() {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', weekday: 'short' })
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'10px 16px',
      borderBottom:`1px solid ${T.border}`,
      background:'rgba(0,200,255,0.03)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <span style={{
          width:7, height:7, borderRadius:'50%',
          background:T.green, display:'inline-block',
          animation:'pulse-dot 2s infinite',
          boxShadow:`0 0 6px ${T.green}`,
        }} />
        <span style={{ fontSize:11, color:T.textSec, letterSpacing:'0.08em' }}>系统在线</span>
      </div>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <span className="mono" style={{ fontSize:12, color:T.textSec }}>{dateStr}</span>
        <span className="mono" style={{ fontSize:14, color:T.cyan, fontWeight:600 }}>{timeStr}</span>
      </div>
    </div>
  )
}

function NavCard({ module: m, animClass, onClick }) {
  return (
    <div
      className={`nav-card ${animClass}`}
      onClick={onClick}
      style={{
        display:'flex', alignItems:'center', gap:14,
        padding:'16px 14px', marginBottom:10,
        background: m.disabled ? 'rgba(17,24,39,0.5)' : T.bgCard,
        border:`1px solid ${T.border}`,
        borderRadius:12,
        cursor: m.disabled ? 'not-allowed' : 'pointer',
        opacity: m.disabled ? 0.55 : 1,
      }}
    >
      <div style={{
        width:46, height:46, borderRadius:10, flexShrink:0,
        background: m.disabled ? 'rgba(0,200,255,0.04)' : 'rgba(0,200,255,0.08)',
        border:`1px solid ${m.disabled ? T.border : T.borderHi}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:22,
      }}>
        {m.icon}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
          <span style={{ fontSize:15, fontWeight:600, color:T.textPrim }}>{m.label}</span>
          <span style={{
            fontSize:10, padding:'1px 6px', borderRadius:4,
            background:`${m.tagColor}22`, color:m.tagColor,
            border:`1px solid ${m.tagColor}44`,
            letterSpacing:'0.05em', fontWeight:500,
          }}>{m.tag}</span>
        </div>
        <div style={{ fontSize:12, color:T.textMute }}>{m.desc}</div>
      </div>
      {!m.disabled && (
        <span className="nav-arrow" style={{ color:T.cyanDim, fontSize:18, flexShrink:0 }}>›</span>
      )}
    </div>
  )
}

function Home({ onNavigate }) {
  return (
    <div style={{ maxWidth:480, margin:'0 auto', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <StatusBar />
      <div className="anim-up" style={{ padding:'28px 20px 20px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
          <div style={{
            width:3, height:28,
            background:`linear-gradient(to bottom, #00c8ff, transparent)`,
            borderRadius:2,
          }} />
          <div>
            <div style={{ fontSize:11, color:T.cyanDim, letterSpacing:'0.15em', fontWeight:500, marginBottom:2 }}>
              WATER TREATMENT SYSTEM v3.0
            </div>
            <h1 style={{ fontSize:20, fontWeight:700, color:T.textPrim, lineHeight:1.2 }}>
              水厂加药配药系统
            </h1>
          </div>
        </div>
        <p style={{ fontSize:13, color:T.textMute, marginLeft:13, marginTop:8 }}>
          选择功能模块进入操作
        </p>
      </div>
      <div style={{ padding:'0 16px', flex:1 }}>
        {MODULES.map((m, i) => (
          <NavCard
            key={m.id}
            module={m}
            animClass={`anim-up-${Math.min(i + 2, 4)}`}
            onClick={() => !m.disabled && onNavigate(m.id)}
          />
        ))}
      </div>
      <div style={{
        padding:'20px 20px 32px', textAlign:'center',
        borderTop:`1px solid ${T.border}`, marginTop:16,
      }}>
        <span style={{ fontSize:11, color:T.textMute, letterSpacing:'0.06em' }}>
          © 水厂运营管理系统 · 仅限内部使用
        </span>
      </div>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('home')
  if (page === 'dosing') return <DosingPage onBack={() => setPage('home')} />
  // 新增页面在这里加一行，例如：
  // if (page === 'chlorine') return <ChlorinePage onBack={() => setPage('home')} />
  return <Home onNavigate={setPage} />
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
