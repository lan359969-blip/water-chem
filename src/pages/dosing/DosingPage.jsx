import { useState } from 'react'
import {
  calcP1Coag,
  calcP1Aid,
  calcP2Coag,
  calcP2Aid
} from '../../modules/dosing'

export default function DosingPage() {
  const [stage, setStage] = useState('p1')   // p1 | p2
  const [type, setType] = useState('coag')   // coag | aid

  const [H, setH] = useState('')
  const [C, setC] = useState('')
  const [result, setResult] = useState('')

  function calc() {
  try {
    let r = ''

    if (stage === 'p1' && type === 'coag') r = calcP1Coag(H, C)
    if (stage === 'p1' && type === 'aid')  r = calcP1Aid(H, C)
    if (stage === 'p2' && type === 'coag') r = calcP2Coag(H, C)
    if (stage === 'p2' && type === 'aid')  r = calcP2Aid(H, C)

    setResult(String(r))
  } catch (e) {
    console.error(e)
    setResult('❌ 计算异常')
  }
}

  return (
    <div style={styles.page}>
      <h2>水厂配药计算系统</h2>

      {/* 工段选择 */}
      <div style={styles.row}>
        <label>工段：</label>
        <button
          style={stage === 'p1' ? styles.active : styles.btn}
          onClick={() => setStage('p1')}
        >
          一期
        </button>
        <button
          style={stage === 'p2' ? styles.active : styles.btn}
          onClick={() => setStage('p2')}
        >
          二期
        </button>
      </div>

      {/* 类型选择 */}
      <div style={styles.row}>
        <label>类型：</label>
        <button
          style={type === 'coag' ? styles.active : styles.btn}
          onClick={() => setType('coag')}
        >
          混凝
        </button>
        <button
          style={type === 'aid' ? styles.active : styles.btn}
          onClick={() => setType('aid')}
        >
          助凝
        </button>
      </div>

      <hr />

      {/* 参数输入区 */}
      <div style={styles.block}>
        <h4>参数输入</h4>

        <input
          placeholder="液位高度 H（m）"
          value={H}
          onChange={e => setH(e.target.value)}
        />

        <input
          placeholder="药液浓度 C（%）"
          value={C}
          onChange={e => setC(e.target.value)}
        />

        <button style={styles.calc} onClick={calc}>
          ▶ 计算
        </button>
      </div>

      {/* 结果显示区 */}
      <div style={styles.block}>
        <h4>计算结果</h4>
        <pre style={result.includes('⚠') ? styles.warn : styles.ok}>
          {result || '—'}
        </pre>
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: 20,
    maxWidth: 480,
    fontFamily: 'sans-serif'
  },
  row: {
    marginBottom: 10
  },
  btn: {
    marginLeft: 6
  },
  active: {
    marginLeft: 6,
    background: '#1677ff',
    color: '#fff'
  },
  block: {
    marginTop: 15
  },
  calc: {
    marginTop: 10,
    width: '100%'
  },
  ok: {
    color: '#222'
  },
  warn: {
    color: 'red'
  }
}