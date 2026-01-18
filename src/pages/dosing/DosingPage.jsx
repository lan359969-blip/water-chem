import { useState } from 'react'
import { p1, p2 } from '@/modules/dosing'

export default function DosingPage() {
  const [H, setH] = useState('')
  const [C, setC] = useState('')
  const [result, setResult] = useState('')

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h1>配药计算（工业模块）</h1>

      {/* 输入区 */}
      <input
        placeholder="液位高度 H (m)"
        value={H}
        onChange={e => setH(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <input
        placeholder="浓度 (%)"
        value={C}
        onChange={e => setC(e.target.value)}
        style={{ width: '100%', marginBottom: 12 }}
      />

      {/* 一期 */}
      <h3>一期</h3>

      <button
        onClick={() => setResult(p1.calcP1Coag(H, C))}
        style={{ width: '100%', marginBottom: 6 }}
      >
        计算一期混凝
      </button>

      <button
        onClick={() => setResult(p1.calcP1Aid(H, C))}
        style={{ width: '100%', marginBottom: 12 }}
      >
        计算一期助凝
      </button>

      {/* 二期 */}
      <h3>二期</h3>

      <button
        onClick={() => setResult(p2.calcP2Coag(H, C))}
        style={{ width: '100%', marginBottom: 6 }}
      >
        计算二期混凝
      </button>

      <button
        onClick={() => setResult(p2.calcP2Aid(H, C))}
        style={{ width: '100%' }}
      >
        计算二期助凝
      </button>

      {/* 结果 */}
      <pre
        style={{
          marginTop: 16,
          padding: 12,
          background: '#f6f6f6',
          whiteSpace: 'pre-wrap'
        }}
      >
        {result}
      </pre>
    </div>
  )
}