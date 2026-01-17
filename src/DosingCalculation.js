import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import InputField from '../components/InputField'
import { showToast } from '../components/Toast'
import { Storage } from '../utils/storage'
import { Calculator } from '../utils/calculator'

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
      text = `一期：\n混凝 AB:${dosingResult.p1.coagAB} CD:${dosingResult.p1.coagCD}\n助凝 AB:${dosingResult.p1.flocAB} CD:${dosingResult.p1.flocCD}\n\n二期：\n混凝 5-1:${dosingResult.p2.c51} 5-2:${dosingResult.p2.c52} 6-1:${dosingResult.p2.c61} 6-2:${dosingResult.p2.c62}\n助凝 5-1:${dosingResult.p2.f51} 5-2:${dosingResult.p2.f52} 6-1:${dosingResult.p2.f61} 6-2:${dosingResult.p2.f62}`
    } else if (type === 'chlorine' && chlorineResult) {
      text = `前加氯：\nAB:${chlorineResult.pre.ab} CD:${chlorineResult.pre.cd} E:${chlorineResult.pre.e} F:${chlorineResult.pre.f}\n\n主加氯：\nAB:${chlorineResult.main.ab} CD:${chlorineResult.main.cd} E:${chlorineResult.main.e} F:${chlorineResult.main.f}`
      if (chlorineResult.supp) text += `\n\n补氯：\nA:${chlorineResult.supp.a} B:${chlorineResult.supp.b} C:${chlorineResult.supp.c} D:${chlorineResult.supp.d}`
    }
    
    try {
      await navigator.clipboard.writeText(text)
      showToast('✅ 已复制')
    } catch (e) {
      showToast('❌ 复制失败')
    }
  }

  return (
    <div className="container">
      <header className="page-header">
        <a onClick={() => navigate('/')} className="back-btn" style={{cursor: 'pointer'}}>← 返回</a>
        <h1>💊 加药加氯计算</h1>
      </header>

      <div className="warning-box">
        ⚠️ 输入的差值均为无视小数点后的整数
      </div>

      <Card title="📋 微信数据导入">
        <textarea 
          value={wechatInput}
          onChange={(e) => setWechatInput(e.target.value)}
          placeholder="粘贴格式：【1-2系: 1000】【3-4系: 2000】【5-6系: 3000】"
          rows="3"
        />
        <div className="btn-group">
          <button onClick={parseWechat} className="btn btn-primary">🔍 解析数据</button>
          <button onClick={() => setWechatInput('')} className="btn btn-secondary">🗑️ 清空</button>
        </div>
      </Card>

      <Card title="⚙️ 进水量配置">
        <div className="input-grid">
          <InputField label="1-2系进水量" value={waters.w12} onChange={(e) => setWaters(p => ({ ...p, w12: +e.target.value || 0 }))} />
          <InputField label="3-4系进水量" value={waters.w34} onChange={(e) => setWaters(p => ({ ...p, w34: +e.target.value || 0 }))} />
          <InputField label="5-6系进水量（总）" value={waters.w56} onChange={(e) => setWaters(p => ({ ...p, w56: +e.target.value || 0 }))} />
        </div>
        
        <div className="water-split-box">
          <div className="water-split-title">💡 水量分配调节</div>
          <div className="water-split-grid">
            <InputField label="5-1系" value={waters.w51} onChange={(e) => {
              const v = +e.target.value || 0
              setWaters(p => ({ ...p, w51: v }))
              const total = v + waters.w52 + waters.w61 + waters.w62
              if (total > 0) setRatios({ r51: v/total, r52: waters.w52/total, r61: waters.w61/total, r62: waters.w62/total })
            }} />
            <InputField label="5-2系" value={waters.w52} onChange={(e) => {
              const v = +e.target.value || 0
              setWaters(p => ({ ...p, w52: v }))
              const total = waters.w51 + v + waters.w61 + waters.w62
              if (total > 0) setRatios({ r51: waters.w51/total, r52: v/total, r61: waters.w61/total, r62: waters.w62/total })
            }} />
            <InputField label="6-1系" value={waters.w61} onChange={(e) => {
              const v = +e.target.value || 0
              setWaters(p => ({ ...p, w61: v }))
              const total = waters.w51 + waters.w52 + v + waters.w62
              if (total > 0) setRatios({ r51: waters.w51/total, r52: waters.w52/total, r61: v/total, r62: waters.w62/total })
            }} />
            <InputField label="6-2系" value={waters.w62} onChange={(e) => {
              const v = +e.target.value || 0
              setWaters(p => ({ ...p, w62: v }))
              const total = waters.w51 + waters.w52 + waters.w61 + v
              if (total > 0) setRatios({ r51: waters.w51/total, r52: waters.w52/total, r61: waters.w61/total, r62: v/total })
            }} />
          </div>
        </div>
      </Card>

      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'dosing' ? 'active' : ''}`}
          onClick={() => setActiveTab('dosing')}
        >
          💊 加药计算
        </button>
        <button 
          className={`tab-btn ${activeTab === 'chlorine' ? 'active' : ''}`}
          onClick={() => setActiveTab('chlorine')}
        >
          🧪 加氯计算
        </button>
      </div>

      {activeTab === 'dosing' && (
        <div className="tab-content active">
          <Card title="🧪 浓度配置">
            <div className="input-grid">
              <InputField label="一期混凝剂(%)" value={conc.p1Coag} onChange={(e) => setConc(p => ({ ...p, p1Coag: +e.target.value || 0 }))} step="0.1" />
              <InputField label="一期助凝剂(%)" value={conc.p1Floc} onChange={(e) => setConc(p => ({ ...p, p1Floc: +e.target.value || 0 }))} step="0.1" />
              <InputField label="二期混凝剂(%)" value={conc.p2Coag} onChange={(e) => setConc(p => ({ ...p, p2Coag: +e.target.value || 0 }))} step="0.1" />
              <InputField label="二期助凝剂(%)" value={conc.p2Floc} onChange={(e) => setConc(p => ({ ...p, p2Floc: +e.target.value || 0 }))} step="0.1" />
            </div>
          </Card>

          <Card title="📊 一期差值">
            <h3 className="section-title">混凝剂差值</h3>
            <div className="input-grid">
              {['a', 'b', 'c', 'd'].map(k => (
                <InputField 
                  key={k}
                  label={`${k.toUpperCase()}系`}
                  value={p1CoagDiff[k]}
                  onChange={(e) => setP1CoagDiff(p => ({ ...p, [k]: +e.target.value || 0 }))}
                />
              ))}
            </div>
            <h3 className="section-title">助凝剂差值</h3>
            <div className="input-grid">
              {['a', 'b', 'c', 'd'].map(k => (
                <InputField 
                  key={k}
                  label={`${k.toUpperCase()}系`}
                  value={p1FlocDiff[k]}
                  onChange={(e) => setP1FlocDiff(p => ({ ...p, [k]: +e.target.value || 0 }))}
                />
              ))}
            </div>
          </Card>

          <Card title="📊 二期差值">
            <h3
          <Card title="📊 二期差值">
            <h3 className="section-title">混凝剂差值</h3>
            <div className="input-grid">
              {['s51', 's52', 's61', 's62'].map(k => (
                <InputField
                  key={k}
                  label={k.toUpperCase()}
                  value={p2CoagDiff[k]}
                  onChange={(e) =>
                    setP2CoagDiff(p => ({ ...p, [k]: +e.target.value || 0 }))
                  }
                />
              ))}
            </div>

            <h3 className="section-title">助凝剂差值</h3>
            <div className="input-grid">
              {['s51', 's52', 's61', 's62'].map(k => (
                <InputField
                  key={k}
                  label={k.toUpperCase()}
                  value={p2FlocDiff[k]}
                  onChange={(e) =>
                    setP2FlocDiff(p => ({ ...p, [k]: +e.target.value || 0 }))
                  }
                />
              ))}
            </div>
          </Card>
