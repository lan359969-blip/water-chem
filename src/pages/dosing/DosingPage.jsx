import { useState } from 'react'
import { calcP1Coag, calcP1Aid, calcP2Coag, calcP2Aid } from '../../modules/dosing'
import { DOSING } from '../../config/dosing.config'

export default function DosingPage({ onBack }) {
  const [stage, setStage] = useState('p1')   // p1 | p2
  const [type,  setType]  = useState('coag') // coag | aid

  const [M, setM] = useState('')   // 混凝剂：固体投加量（吨）
  const [H, setH] = useState('')   // 助凝剂：计量桶液位（m）
  const [C, setC] = useState('')   // 目标浓度（%）
  const [result, setResult] = useState(null)
  const [error,  setError]  = useState('')

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
    else setResult(r)
  }

  const isCoag    = type === 'coag'
  const stageName = stage === 'p1' ? '一期' : '二期'
  const typeName  = isCoag ? '混凝剂' : '助凝剂'
  const cfg       = DOSING[stage.toUpperCase()][type.toUpperCase()]

  // 池体参数提示文字
  const hint = isCoag
    ? stage === 'p1'
      ? `溶解池 ${cfg.DISS_VOLUME_MAX}m³ / 溶液池面积 ${cfg.SOL_AREA}m² / 溢流线 ${cfg.SOL_MAX_H}m`
      : `溶解池两座共 ${cfg.DISS_VOLUME_MAX}m³ / 溶液池面积 ${cfg.SOL_AREA}m² / 溢流线 ${cfg.SOL_MAX_H}m`
    : stage === 'p1'
      ? `计量桶圆形 r=${cfg.TANK_RADIUS}m / 密度 ${cfg.DENSITY}kg/m³ / 溶液池面积 ${cfg.SOL_AREA}m²`
      : `计量桶 ${cfg.TANK_L}×${cfg.TANK_W}m / 密度 ${cfg.DENSITY}kg/m³ / 溶液池面积 ${cfg.SOL_AREA}m²`

  return (
    <div style={s.page}>
      {/* 顶部 */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={onBack}>← 返回</button>
        <h2 style={s.title}>配药计算 · {stageName}{typeName}</h2>
      </div>

      {/* 切换工段 */}
      <div style={s.card}>
        <div style={s.cardLabel}>工段</div>
        <div style={s.btnRow}>
          {[['p1','一期'],['p2','二期']].map(([v,n]) => (
            <button key={v} style={stage===v ? {...s.btn,...s.btnOn} : s.btn} onClick={() => switchStage(v)}>{n}</button>
          ))}
        </div>
        <div style={s.cardLabel}>药剂类型</div>
        <div style={s.btnRow}>
          {[['coag','混凝剂'],['aid','助凝剂']].map(([v,n]) => (
            <button key={v} style={type===v ? {...s.btn,...s.btnOn} : s.btn} onClick={() => switchType(v)}>{n}</button>
          ))}
        </div>
      </div>

      {/* 参数输入 */}
      <div style={s.card}>
        <div style={s.cardLabel}>参数输入</div>
        <div style={s.hint}>{hint}</div>

        {isCoag ? (
          <Field label="固体药剂投加量（吨）" value={M} onChange={setM} placeholder="例：2" />
        ) : (
          <Field label="计量桶液位高度 H（m）" value={H} onChange={setH} placeholder="例：1.2" />
        )}
        <Field label="目标配置浓度（%）" value={C} onChange={setC} placeholder="例：5" />

        <button style={s.calcBtn} onClick={calc}>▶ 计算</button>
      </div>

      {/* 错误 */}
      {error && <div style={s.errBox}>⚠️ {error}</div>}

      {/* 结果 */}
      {result && <ResultCard r={result} isCoag={isCoag} />}
    </div>
  )
}

// ——— 输入框组件 ———
function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={s.fieldLabel}>{label}</label>
      <input
        style={s.input}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

// ——— 结果展示组件 ———
function ResultCard({ r, isCoag }) {
  const isOverflow = r.overflow

  if (isCoag) {
    // 混凝剂结果
    return (
      <div style={s.card}>
        <div style={r.case === 1 ? s.caseOk : s.caseWarn}>
          {r.case === 1
            ? '✅ 工况一：仅使用溶解池即可'
            : '⚠️ 工况二：溶解池不足，需溶液池补水'}
        </div>
        <Row label="最终所需总体积" val={r.V_need.toFixed(2)} unit="m³" />
        {r.case === 1 ? (
          <Row label="溶解池液位高度" val={r.dissH.toFixed(2)} unit="m" />
        ) : (
          <>
            <Row label="溶解池装入体积" val={r.V_diss.toFixed(2)} unit="m³" />
            <Row label="溶液池补水体积" val={r.V_add.toFixed(2)} unit="m³" />
            <Row label="折算补水高度"   val={r.H_add.toFixed(2)} unit="m" />
            <div style={isOverflow ? s.finalWarn : s.finalOk}>
              溶液池最终液位：{r.H_final.toFixed(2)} m
              {isOverflow ? ` ＞ ${r.solMaxH} m ⚠️ 溢流` : '（安全）'}
            </div>
          </>
        )}
      </div>
    )
  } else {
    // 助凝剂结果
    return (
      <div style={s.card}>
        <div style={s.caseOk}>计算结果 — {r.stage}</div>
        <Row label="计量桶原液体积" val={r.V_drug.toFixed(2)}  unit="m³" />
        <Row label="计量桶原液质量" val={r.M_drug.toFixed(2)}  unit="kg" />
        <Row label="目标所需总体积" val={r.V_total.toFixed(2)} unit="m³" />
        <Row label="溶液池补水体积" val={r.V_add.toFixed(2)}   unit="m³" />
        <div style={isOverflow ? s.finalWarn : s.finalOk}>
          溶液池液位：{r.H_add.toFixed(2)} m
          {isOverflow ? ` ＞ ${r.solMaxH} m ⚠️ 溢流` : '（安全）'}
        </div>
      </div>
    )
  }
}

function Row({ label, val, unit }) {
  return (
    <div style={s.row}>
      <span style={s.rowLabel}>{label}</span>
      <span style={s.rowVal}>{val}</span>
      <span style={s.rowUnit}>{unit}</span>
    </div>
  )
}

// ——— 样式 ———
const s = {
  page:      { maxWidth:500, margin:'0 auto', padding:16, fontFamily:'system-ui,sans-serif', background:'#f5f7fa', minHeight:'100vh' },
  header:    { display:'flex', alignItems:'center', gap:12, marginBottom:16 },
  backBtn:   { background:'none', border:'1px solid #ccc', borderRadius:6, padding:'4px 10px', cursor:'pointer', fontSize:13 },
  title:     { margin:0, fontSize:18, fontWeight:600 },
  card:      { background:'#fff', borderRadius:10, padding:'14px 16px', marginBottom:14, boxShadow:'0 1px 4px rgba(0,0,0,.08)' },
  cardLabel: { fontSize:12, color:'#888', fontWeight:600, letterSpacing:1, marginBottom:8 },
  btnRow:    { display:'flex', gap:8, marginBottom:12 },
  btn:       { flex:1, padding:'8px 0', border:'1px solid #d0d0d0', borderRadius:6, background:'#fafafa', cursor:'pointer', fontSize:14 },
  btnOn:     { background:'#1677ff', color:'#fff', border:'1px solid #1677ff' },
  hint:      { fontSize:12, color:'#999', background:'#f8f9fb', borderRadius:6, padding:'6px 10px', marginBottom:14 },
  fieldLabel:{ display:'block', fontSize:13, color:'#555', marginBottom:4 },
  input:     { width:'100%', boxSizing:'border-box', padding:'9px 10px', border:'1px solid #e0e0e0', borderRadius:6, fontSize:15 },
  calcBtn:   { width:'100%', marginTop:6, padding:'11px 0', background:'#1677ff', color:'#fff', border:'none', borderRadius:7, fontSize:15, cursor:'pointer', fontWeight:600 },
  errBox:    { background:'#fff2f0', border:'1px solid #ffccc7', borderRadius:8, padding:'10px 14px', color:'#cf1322', marginBottom:14 },
  caseOk:    { color:'#389e0d', fontWeight:'bold', marginBottom:10 },
  caseWarn:  { color:'#d4380d', fontWeight:'bold', marginBottom:10 },
  row:       { display:'flex', alignItems:'baseline', padding:'6px 0', borderBottom:'1px solid #f5f5f5' },
  rowLabel:  { flex:1, fontSize:13, color:'#555' },
  rowVal:    { fontSize:15, fontWeight:600, marginRight:4 },
  rowUnit:   { fontSize:12, color:'#999' },
  finalOk:   { marginTop:10, color:'#389e0d', fontWeight:'bold', fontSize:14 },
  finalWarn: { marginTop:10, color:'#d4380d', fontWeight:'bold', fontSize:14 },
}
