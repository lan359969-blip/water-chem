import { P2 } from './constants'

export function calcP2Coag(M_raw, C_raw) {
  const M = parseFloat(M_raw)
  const C = parseFloat(C_raw) / 100

  if (isNaN(M) || isNaN(C) || M <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const V_diss_max = P2.COAG.DISS_AREA_SINGLE * P2.COAG.DISS_MAX_H * 2
  const V_need = M / C
  let r = ''

  if (V_need <= V_diss_max) {
    const H = V_need / (P2.COAG.DISS_AREA_SINGLE * 2)
    r += '✓ 工况一：仅使用溶解池即可满足目标浓度\n'
    r += `所需总体积：${V_need.toFixed(2)} m³\n`
    r += `两座溶解池平均液位高度：${H.toFixed(2)} m`
  } else {
    const V_add = V_need - V_diss_max
    const H_add = V_add / P2.COAG.SOL_AREA
    const H_final = V_need / P2.COAG.SOL_AREA

    r += '⚠ 工况二：需要溶液池补水\n'
    r += `溶解池总体积：${V_diss_max.toFixed(2)} m³\n`
    r += `溶液池需补水体积：${V_add.toFixed(2)} m³\n`
    r += `折算补水高度：${H_add.toFixed(2)} m\n`

    r += H_final > P2.COAG.SOL_MAX_H
      ? `⚠ 溢流风险`
      : `✓ 液位安全`
  }

  return r
}