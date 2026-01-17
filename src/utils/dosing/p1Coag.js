import { P1 } from './constants'

export function calcP1Coag(M_raw, C_raw) {
  const M = parseFloat(M_raw)
  const C = parseFloat(C_raw) / 100

  if (isNaN(M) || isNaN(C) || M <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const V_need = M / C
  let r = ''

  if (V_need <= P1.COAG.DISS_MAX_VOL) {
    const H = V_need / P1.COAG.DISS_AREA
    r += '✓ 工况一：仅使用溶解池即可满足目标浓度\n'
    r += `所需总体积：${V_need.toFixed(2)} m³\n`
    r += `溶解池液位高度：${H.toFixed(2)} m（≤2.5 m）\n`
    r += '无需启用溶液池补水'
  } else {
    const V_add = V_need - P1.COAG.DISS_MAX_VOL
    const H_add = V_add / P1.COAG.SOL_AREA
    const H_final = V_need / P1.COAG.SOL_AREA

    r += '⚠ 工况二：溶解池加满仍超浓，需要溶液池补水\n'
    r += '溶解池体积：20.00 m³（液位 2.5 m）\n'
    r += `最终所需总体积：${V_need.toFixed(2)} m³\n`
    r += `溶液池需补水体积：${V_add.toFixed(2)} m³\n`
    r += `折算补水高度：${H_add.toFixed(2)} m\n`

    r += H_final > P1.COAG.SOL_MAX_H
      ? `⚠ 溶液池最终液位 ${H_final.toFixed(2)} m ＞ 3.2 m，发生溢流`
      : `✓ 溶液池最终液位：${H_final.toFixed(2)} m（安全）`
  }

  return r
}
