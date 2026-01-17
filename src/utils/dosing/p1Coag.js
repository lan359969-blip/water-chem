import { P1 } from './constants'

export function calcP1Coag(M_raw, C_raw) {
  const M = parseFloat(M_raw)
  const C = parseFloat(C_raw) / 100
  if (isNaN(M) || isNaN(C) || M <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const V = M / C
  let r = ''

  if (V <= P1.COAG.DISS_MAX_VOL) {
    r += `✓ 工况一\n`
    r += `总体积：${V.toFixed(2)} m³\n`
    r += `液位：${(V / P1.COAG.DISS_AREA).toFixed(2)} m`
  } else {
    const V_add = V - P1.COAG.DISS_MAX_VOL
    const H = V / P1.COAG.SOL_AREA
    r += `⚠ 工况二\n`
    r += `补水体积：${V_add.toFixed(2)} m³\n`
    r += H > P1.COAG.SOL_MAX_H ? '⚠ 溢流' : '✓ 安全'
  }
  return r
}