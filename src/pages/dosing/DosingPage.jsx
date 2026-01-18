import { useState } from 'react'
import InputPanel from './InputPanel'
import ResultPanel from './ResultPanel'
import { p1, p2 } from '@/modules/dosing'

export default function DosingPage() {
  const [params, setParams] = useState(null)
  const [result, setResult] = useState(null)

  const handleCalc = (stage, type, data) => {
    let res
    if (stage === 'p1' && type === 'coag') res = p1.coag(data)
    if (stage === 'p1' && type === 'aid')  res = p1.aid(data)
    if (stage === 'p2' && type === 'coag') res = p2.coag(data)
    if (stage === 'p2' && type === 'aid')  res = p2.aid(data)

    setResult(res)
  }

  return (
    <div className="dosing-page">
      <h1>配药计算（工程模式）</h1>

      <InputPanel onCalc={handleCalc} />
      <ResultPanel data={result} />
    </div>
  )
}