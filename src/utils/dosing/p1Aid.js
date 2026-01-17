import { P1 } from './constants'

export function calcP1Aid(H_raw, C_raw) {
  const H = parseFloat(H_raw)
  const C = parseFloat(C_raw)

  if (isNaN(H) || isNaN(C) || H <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const PI = 3.14
  const V_drug = PI * P1.AID.RADIUS ** 2 * H
  const M_drug = V_drug * P1.AID.DENSITY

  const M_total = M_drug / (C / 100)
  const V_total = M_total / 1000

  const V_add = V_total - V_drug
  const H_add = V_add / P1.AID.POOL_AREA

  let r = ''
  r += `计量桶原液体积：${V_drug.toFixed(2)} m³\n`
  r += `计量桶原液质量：${M_drug.toFixed(2)} kg\n\n`
  r += `目标所需总体积：${V_total.toFixed(2)} m³\n`
  r += `溶液池需补水体积：${V_add.toFixed(2)} m³\n`
  r += `折算补水高度：${H_add.toFixed(2)} m\n\n`

  r += H_add > P1.AID.POOL_MAX_H
    ? `⚠ 溶液池最终液位 ${H_add.toFixed(2)} m ＞ ${P1.AID.POOL_MAX_H} m，发生溢流`
    : `✓ 溶液池液位 ${H_add.toFixed(2)} m，安全`

  return r
}