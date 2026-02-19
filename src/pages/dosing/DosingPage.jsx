import { useState } from 'react'
import { calcP1Coag, calcP1Aid, calcP2Coag, calcP2Aid } from '../../modules/dosing'
import { DOSING } from '../../config/dosing.config'

const T = {
  bg:       '#0a0e1a',
  bgCard:   '#111827',
  bgCardAlt:'#0d1424',
  border:   'rgba(0,200,255,0.15)',
  borderHi: 'rgba(0,200,255,0.45)',
  cyan:     '#00c8ff',
  cyanDim:  'rgba(0,200,255,0.7)',
  green:    '#10d97e',
  greenDim: 'rgba(16,217,126,0.12)',
  red:      '#ff4444',
  redDim:   'rgba(255,68,68,0.12)',
  textPrim: '#e2e8f0',
  textSec:  '#94a3b8',
  textMute: '#4a5568',
}

export default function DosingPage({ onBack }) {
  const [stage, setStage] = useState('p1')
  const [type,  setType]  = useState('coag')
  const [M, setM] = useState('')
  const [H, setH] = useState('')
  const [C, setC] = useState('')
  const [result, setResult] = useState(null)
  const [error,  setError]  = useState('')
  const [calcTime, setCalcTime] = useState(null)

  function switchStage(s) { setStage(s); setResult(null); setError('') }
  function switchType(t)  { setType(t);  setResult(null); setError('') }

  function calc() {
    setError(''); setResult(null)
    let r
    if (stage === 'p1' && type === 'coag') r = calcP1Coag(Number(M), Number(C))
    if (stage === 'p1' && type === 'aid')  r = calcP1Aid(Number(H), Number(C))
    if (stage === 'p2' && type === 'coag') r = calcP2Coag(Number(M), Number(C))
    if (stage === 'p2' && type === 'aid')  r = calcP2Aid(Number(H), Number(C))
    if (r?.error) setError(r.error)
    else { setResult(r); setCalcTime(new Date().toLocaleTimeString('zh-CN')) }
  }

  const isCoag    = type === 'coag'
  const stageName = stage === 'p1' ? '一期' : '二期'
  const typeName  = isCoag ? '混凝剂' : '助凝剂'
  const cfg       = DOSING[stage.toUpperCase()][type.toUpperCase()]

  const specs = isCoag
    ? stage === 'p1'
      ? [
          { label:'溶解池容积', val:cfg.DISS_VOLUME_MAX, unit:'m³' },
          { label:'溶液池面积', val:cfg.SOL_AREA,        unit:'m²' },
          { label:'溢流液位',   val:cfg.SOL_MAX_H,       unit:'m'  },
        ]
      : [
          { label:'溶解池总容积(双)', val:cfg.DISS_VOLUME_MAX, unit:'m³' },
          { label:'溶液池面积',       val:cfg.SOL_AREA,        unit:'m²' },
          { label:'溢流液位',         val:cfg.SOL_MAX_H,       unit:'m'  },
        ]
    : stage === 'p1'
      ? [
          { label:'计量桶半径', val:cfg.TANK_RADIUS, unit:'m (圆)' },
          { label:'药剂密度',   val:cfg.DENSITY,     unit:'kg/m³'  },
          { label:'溶液池面积', val:cfg.SOL_AREA,    unit:'m²'     },
        ]
      : [
          { label:'计量桶尺寸', val:`${cfg.TANK_L}×${cfg.TANK_W}`, unit:'m (矩形)' },
          { label:'药剂密度',   val:cfg.DENSITY,                    unit:'kg/m³'   },
          { label:'溶液池面积', val:cfg.SOL_AREA,                   unit:'m²'      },
        ]

  return (
    <div style={{ maxWidth:480, margin:'0 auto', minHeight:'100vh', background:T.bg, display:'flex', flexDirection:'column' }}>

      {/* 顶部导航 */}
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        padding:'12px 16px',
        borderBottom:`1px solid ${T.border}`,
        background:'rgba(0,200,255,0.03)',
      }}>
        <button onClick={onBack} style={{
          background:'rgba(0,200,255,0.06)',
          border:`1px solid ${T.border}`,
          borderRadius:8, padding:'6px 12px',
          color:T.cyanDim, fontSize:13, cursor:'pointer',
        }}>
          ← 返回
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, color:T.textMute, letterSpacing:'0.1em' }}>配药计算模块</div>
          <div style={{ fontSize:15, fontWeight:600, color:T.textPrim }}>{stageName} · {typeName}</div>
        </div>
        <span style={{
          width:7, height:7, borderRadius:'50%',
          background:T.green, boxShadow:`0 0 6px ${T.green}`,
          animation:'pulse-dot 2s infinite',
          display:'inline-block',
        }} />
      </div>

      <div style={{ padding:'14px 16px', flex:1 }}>

        {/* 工段/药剂切换 */}
        <SectionCard label="工段 / 药剂选择">
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:11, color:T.textMute, marginBottom:6, letterSpacing:'0.08em' }}>工段</div>
            <ToggleGroup
              options={[['p1','一期工段'],['p2','二期工段']]}
              value={stage} onChange={switchStage}
            />
          </div>
          <div>
            <div style={{ fontSize:11, color:T.textMute, marginBottom:6, letterSpacing:'0.08em' }}>药剂类型</div>
            <ToggleGroup
              options={[['coag','混凝剂 PAC'],['aid','助凝剂']]}
              value={type} onChange={switchType}
            />
          </div>
        </SectionCard>

        {/* 池体参数 */}
        <SectionCard label="池体参数">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            {specs.map((sp, i) => (
              <div key={i} style={{
                background:T.bgCardAlt,
                border:`1px solid ${T.border}`,
                borderRadius:8, padding:'8px 10px',
              }}>
                <div style={{ fontSize:10, color:T.textMute, marginBottom:4 }}>{sp.label}</div>
                <div className="mono" style={{ fontSize:14, fontWeight:600, color:T.cyan }}>{sp.val}</div>
                <div style={{ fontSize:10, color:T.textMute }}>{sp.unit}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 参数输入 */}
        <SectionCard label="参数输入">
          {isCoag
            ? <Field label="固体药剂投加量" unit="吨" value={M} onChange={setM} placeholder="0.00" />
            : <Field label="计量桶液位高度 H" unit="m" value={H} onChange={setH} placeholder="0.00" />
          }
          <Field label="目标配置浓度" unit="%" value={C} onChange={setC} placeholder="0.00" />
          <button onClick={calc} style={{
            width:'100%', marginTop:4, padding:'13px 0',
            background:'linear-gradient(135deg, #0077aa, #00c8ff)',
            color:'#fff', border:'none', borderRadius:9,
            fontSize:15, fontWeight:700, cursor:'pointer',
            letterSpacing:'0.06em',
            boxShadow:'0 0 16px rgba(0,200,255,0.25)',
          }}>
            ▶  开始计算
          </button>
        </SectionCard>

        {/* 错误 */}
        {error && (
          <div style={{
            background:T.redDim,
            border:'1px solid rgba(255,68,68,0.4)',
            borderRadius:10, padding:'12px 14px', marginBottom:12,
            display:'flex', alignItems:'center', gap:8,
            animation:'fade-in 0.2s ease',
          }}>
            <span style={{ fontSize:18 }}>⚠️</span>
            <span style={{ color:'#ff8888', fontSize:13 }}>{error}</span>
          </div>
        )}

        {/* 结果 */}
        {result && <ResultCard r={result} isCoag={isCoag} calcTime={calcTime} />}

      </div>
    </div>
  )
}

function SectionCard({ label, children }) {
  return (
    <div style={{
      background:T.bgCard,
      border:`1px solid ${T.border}`,
      borderRadius:12, padding:'12px 14px', marginBottom:12,
    }}>
      <div style={{
        fontSize:10, color:T.cyanDim, fontWeight:600,
        letterSpacing:'0.12em', marginBottom:10,
        display:'flex', alignItems:'center', gap:6,
      }}>
        <span style={{ width:14, height:1, background:T.cyan, display:'inline-block', opacity:0.5 }} />
        {label}
        <span style={{ width:14, height:1, background:T.cyan, display:'inline-block', opacity:0.5 }} />
      </div>
      {children}
    </div>
  )
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div style={{ display:'flex', gap:6 }}>
      {options.map(([v, label]) => {
        const active = value === v
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            flex:1, padding:'9px 0',
            border:`1px solid ${active ? T.cyan : T.border}`,
            borderRadius:8,
            background: active ? 'rgba(0,200,255,0.12)' : 'transparent',
            color: active ? T.cyan : T.textSec,
            fontSize:13, fontWeight: active ? 600 : 400,
            cursor:'pointer', transition:'all 0.15s',
            boxShadow: active ? '0 0 10px rgba(0,200,255,0.2)' : 'none',
          }}>
            {label}
          </button>
        )
      })}
    </div>
  )
}

function Field({ label, unit, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
        <label style={{ fontSize:12, color:T.textSec }}>{label}</label>
        <span style={{
          fontSize:11, color:T.cyan,
          background:'rgba(0,200,255,0.08)',
          border:'1px solid rgba(0,200,255,0.2)',
          borderRadius:4, padding:'1px 6px',
        }}>{unit}</span>
      </div>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width:'100%', padding:'11px 12px',
          background:T.bgCardAlt,
          border:`1px solid ${T.border}`,
          borderRadius:8, color:T.textPrim,
          fontSize:16,
          fontFamily:"'Rajdhani', monospace",
          fontWeight:500,
          transition:'border-color 0.15s, box-shadow 0.15s',
        }}
      />
    </div>
  )
}

function ResultCard({ r, isCoag, calcTime }) {
  const overflow = r.overflow
  return (
    <div style={{
      background:T.bgCard,
      border:`1px solid ${overflow ? 'rgba(255,68,68,0.5)' : T.borderHi}`,
      borderRadius:12, padding:'14px',
      marginBottom:12,
      animation:'slide-up 0.3s ease',
      boxShadow: overflow ? '0 0 20px rgba(255,68,68,0.15)' : '0 0 16px rgba(0,200,255,0.08)',
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        marginBottom:12, paddingBottom:10,
        borderBottom:`1px solid ${T.border}`,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {overflow ? (
            <span style={{
              fontSize:11, fontWeight:700, letterSpacing:'0.08em',
              color:T.red, background:T.redDim,
              border:'1px solid rgba(255,68,68,0.4)',
              borderRadius:5, padding:'2px 8px',
            }}>⚠ 溢流风险</span>
          ) : (
            <span style={{
              fontSize:11, fontWeight:700, letterSpacing:'0.08em',
              color:T.green, background:T.greenDim,
              border:'1px solid rgba(16,217,126,0.3)',
              borderRadius:5, padding:'2px 8px',
            }}>✓ 安全</span>
          )}
          <span style={{ fontSize:13, color:T.textSec }}>
            {isCoag
              ? (r.case === 1 ? '工况一：仅溶解池' : '工况二：补水至溶液池')
              : '计算结果'}
          </span>
        </div>
        <span style={{ fontSize:11, color:T.textMute }}>{calcTime}</span>
      </div>
      {isCoag ? <CoagResult r={r} /> : <AidResult r={r} />}
    </div>
  )
}

function CoagResult({ r }) {
  return (
    <>
      <ResultRow label="所需总体积"   val={r.V_need.toFixed(2)} unit="m³" highlight />
      {r.case === 1 ? (
        <ResultRow label="溶解池液位" val={r.dissH.toFixed(2)}  unit="m" />
      ) : (
        <>
          <ResultRow label="溶解池装入量"   val={r.V_diss.toFixed(2)}  unit="m³" />
          <ResultRow label="溶液池补水量"   val={r.V_add.toFixed(2)}   unit="m³" />
          <ResultRow label="补水折算高度"   val={r.H_add.toFixed(2)}   unit="m" />
          <ResultRow
            label="溶液池最终液位" val={r.H_final.toFixed(2)} unit="m"
            status={r.overflow ? 'danger' : 'safe'}
            extra={r.overflow ? `> ${r.solMaxH}m 溢流！` : `≤ ${r.solMaxH}m 安全`}
          />
        </>
      )}
    </>
  )
}

function AidResult({ r }) {
  return (
    <>
      <ResultRow label="计量桶原液体积" val={r.V_drug.toFixed(2)}  unit="m³" />
      <ResultRow label="计量桶原液质量" val={r.M_drug.toFixed(2)}  unit="kg" highlight />
      <ResultRow label="目标总体积"     val={r.V_total.toFixed(2)} unit="m³" />
      <ResultRow label="溶液池补水量"   val={r.V_add.toFixed(2)}   unit="m³" />
      <ResultRow
        label="溶液池最终液位" val={r.H_add.toFixed(2)} unit="m"
        status={r.overflow ? 'danger' : 'safe'}
        extra={r.overflow ? `> ${r.solMaxH}m 溢流！` : `≤ ${r.solMaxH}m 安全`}
      />
    </>
  )
}

function ResultRow({ label, val, unit, highlight, status, extra }) {
  const isSafe   = status === 'safe'
  const isDanger = status === 'danger'
  return (
    <div style={{
      display:'flex', alignItems:'center',
      padding: isDanger || isSafe ? '9px 6px' : '9px 0',
      borderBottom:'1px solid rgba(0,200,255,0.06)',
      background: isDanger ? 'rgba(255,68,68,0.05)' : isSafe ? 'rgba(16,217,126,0.05)' : 'transparent',
      borderRadius: isDanger || isSafe ? 6 : 0,
      margin: isDanger || isSafe ? '2px -6px' : 0,
    }}>
      <span style={{ flex:1, fontSize:12, color:'#94a3b8' }}>{label}</span>
      <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
        <span className="mono" style={{
          fontSize: isDanger || isSafe ? 17 : highlight ? 18 : 15,
          fontWeight:700,
          color: isDanger ? '#ff4444' : isSafe ? '#10d97e' : highlight ? '#00c8ff' : '#e2e8f0',
        }}>{val}</span>
        <span style={{ fontSize:11, color:'#4a5568' }}>{unit}</span>
        {extra && (
          <span style={{ fontSize:11, marginLeft:6, fontWeight:600, color: isDanger ? '#ff4444' : '#10d97e' }}>
            {extra}
          </span>
        )}
      </div>
    </div>
  )
}
