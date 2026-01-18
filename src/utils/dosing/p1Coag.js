import { P1 } from './constants'

/**
 * 一期混凝计算
 * @param {string|number} Q_raw 处理水量 m³/h
 * @param {string|number} D_raw 投加量 mg/L
 * @param {string|number} C_raw 溶液浓度 %
 */
export function calcP1Coag(Q_raw, D_raw, C_raw) {
  const Q = parseFloat(Q_raw)   // m³/h
  const D = parseFloat(D_raw)   // mg/L
  const C = parseFloat(C_raw)   // %

  if (
    isNaN(Q) || isNaN(D) || isNaN(C) ||
    Q <= 0 || D <= 0 || C <= 0
  ) {
    return '请输入有效数值'
  }

  // ① 单位时间药剂质量（kg/h）
  // mg/L × m³/h × 1000L/m³ ÷ 1e6
  const M = D * Q / 1000

  // ② 折算所需溶液体积（m³）
  const Vt = (M / (C / 100)) / P1.COAG.DENSITY

  // ③ 当前计量桶体积（m³）
  const V0 = Math.PI * P1.COAG.RADIUS ** 2 * P1.COAG.CUR_H

  // ④ 需补充体积
  const Vadd = Vt - V0

  // ⑤ 折算补水高度
  const Hadd = Vadd / P1.COAG.POOL_AREA

  // ===== 工程输出 =====
  let result = ''
  result += `处理水量：${Q.toFixed(2)} m³/h\n`
  result += `投加量：${D.toFixed(2)} mg/L\n`
  result += `药剂需求：${M.toFixed(2)} kg/h\n`
  result += `溶液浓度：${C.toFixed(2)} %\n`
  result += `所需溶液体积：${Vt.toFixed(2)} m³\n`
  result += `当前液位体积：${V0.toFixed(2)} m³\n`
  result += `需补水高度：${Hadd.toFixed(2)} m\n`

  if (Hadd > P1.COAG.POOL_MAX_H) {
    result += '⚠ 发生溢流'
  } else {
    result += '✓ 未溢流'
  }

  return result
}