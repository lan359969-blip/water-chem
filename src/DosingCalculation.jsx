import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './components/Card'
import InputField from './components/InputField'
import { showToast } from './components/Toast'
import { Storage } from './utils/storage'
import { Calculator } from './utils/calculator'

function DosingCalculation() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dosing')
  
  // 进水量
  const [waters, setWaters] = useState({
    w12: 0, w34: 0, w56: 0,
    w51: 0, w52: 0, w61: 0, w62: 0
  })
  
  // 浓度
  const [conc, setConc] = useState({
    p1Coag: 10, p1Floc: 5,
    p2Coag: 10, p2Floc: 5,
    cl1: 0, cl2: 0
  })
  
  // 水量比例
  const [ratios, setRatios] = useState({ r51: 0.25, r52: 0.25, r61: 0.25, r62: 0.25 })
  
  // 加药差值
  const [p1CoagDiff, setP1CoagDiff] = useState({ a: 0, b: 0, c: 0, d: 0 })
  const [p1FlocDiff, setP1FlocDiff] = useState({ a: 0, b: 0, c: 0, d: 0 })
  const [p2CoagDiff, setP2CoagDiff] = useState({ s51: 0, s52: 0, s61: 0, s62: 0 })
  const [p2FlocDiff, setP2FlocDiff] = useState({ s51: 0, s52: 0, s61: 0, s62: 0 })
  
  // 加氯差值
  const [preClDiff, setPreClDiff] = useState({ ab: 0, cd: 0, e: 0, f: 0 })
  const [mainClDiff, setMainClDiff] = useState({ ab: 0, cd: 0, e: 0, f: 0 })
  const [suppClDiff, setSuppClDiff] = useState({ a: 0, b: 0, c: 0, d: 0 })
  const [includeSupp, setIncludeSupp] = useState(false)
  
  const [wechatInput, setWechatInput] = useState('')
  const [dosingResult, setDosingResult] = useState(null)
  const [chlorineResult, setChlorineResult] = useState(null)

  // 56系自动分配
  useEffect(() => {
    const total = waters.w56
    if (total > 0) {
      setWaters(prev => ({
        ...prev,
        w51: Math.round(total * ratios.r51),
        w52: Math.round(total * ratios.r52),
        w61: Math.round(total * ratios.r61),
        w62: Math.round(total * ratios.r62)
      }))
    }
  }, [waters.w56, ratios])

  // 微信数据解析
  const parseWechat = () => {
    const parsed = Calculator.parseWechat(wechatInput)
    if (parsed) {
      setWaters(prev => ({ ...prev, ...parsed }))
      showToast('✅ 解析成功')
      setWechatInput('')
    } else {
      showToast('❌ 格式错误')
    }
  }

  // 加药计算
  const calcDosing = () => {
    const result = Calculator.calculateDosing(
      { p1CoagDiff, p1FlocDiff, p2CoagDiff, p2FlocDiff },
      conc,
      waters
    )
    setDosingResult(result)
    showToast('✅ 计算完成')
  }

  // 加氯计算
  const calcChlorine = () => {
    const result = Calculator.calculateChlorine(
      { preClDiff, mainClDiff, suppClDiff },
      conc,
      waters,
      includeSupp
    )
    setChlorineResult(result)
    showToast('✅ 计算完成')
  }

  // 复制结果
  const copyResult = async (type) => {
    let text = ''
    if (type === 'dosing' && dosingResult) {
      text = `一期：\n混凝 AB:${dosingResult.p1.coagAB} CD:${dosingResult.p1.coagCD}`
    } else if (type === 'chlorine' && chlorineResult) {
      text = `前加氯：AB:${chlorineResult.pre.ab}`
    }
    await navigator.clipboard.writeText(text)
    showToast('✅ 已复制')
  }

  return (
    <div className="container">
      <header className="page-header">
        <a onClick={() => navigate('/')} className="back-btn" style={{cursor: 'pointer'}}>← 返回</a>
        <h1>💊 加药加氯计算</h1>
      </header>

      <div className="warning-box">⚠️ 输入的差值均为无视小数点后的整数</div>

      <div className="tab-buttons">
        <button className={activeTab === 'dosing' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('dosing')}>💊 加药计算</button>
        <button className={activeTab === 'chlorine' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('chlorine')}>🧪 加氯计算</button>
      </div>

      {activeTab === 'dosing' && (
        <div className="tab-content active">
          <Card title="📊 二期差值">
            <h3 className="section-title">混凝剂差值</h3>
            <div className="input-grid">
              {['s51','s52','s61','s62'].map(k => (
                <InputField
                  key={k}
                  label={k.toUpperCase()}
                  value={p2CoagDiff[k]}
                  onChange={(e) => setP2CoagDiff(p => ({ ...p, [k]: +e.target.value || 0 }))}
                />
              ))}
            </div>

            <h3 className="section-title">助凝剂差值</h3>
            <div className="input-grid">
              {['s51','s52','s61','s62'].map(k => (
                <InputField
                  key={k}
                  label={k.toUpperCase()}
                  value={p2FlocDiff[k]}
                  onChange={(e) => setP2FlocDiff(p => ({ ...p, [k]: +e.target.value || 0 }))}
                />
              ))}
            </div>

            <button className="btn btn-primary" onClick={calcDosing}>计算</button>
          </Card>
        </div>
      )}

      {activeTab === 'chlorine' && (
        <div className="tab-content active">
          <Card title="🧪 加氯计算">
            <button className="btn btn-primary" onClick={calcChlorine}>计算</button>
          </Card>
        </div>
      )}
    </div>
  )
}

export default DosingCalculation