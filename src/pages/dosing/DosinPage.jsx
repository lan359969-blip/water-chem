import { useState } from 'react'
import {
  calcP1Coag,
  calcP1Aid,
  calcP2Coag,
  calcP2Aid
} from '@/utils/dosing'

export default function DosingPage() {
  const [m, setM] = useState('')
  const [c, setC] = useState('')
  const [r, setR] = useState('')

  return (
    <div style={{ padding: 20 }}>
      <h1>配药计算（工业模块）</h1>

      <input
        placeholder="投加量"
        value={m}
        onChange={e => setM(e.target.value)}
      />
      <input
        placeholder="浓度 %"
        value={c}
        onChange={e => setC(e.target.value)}
      />

      <button onClick={() => setR(calcP1Coag(m, c))}>
        计算一期混凝
      </button>

      <pre>{r}</pre>
    </div>
  )
}