import { P2 } from './constants'

export function calcP2Coag(M_raw, C_raw) {
  const M = parseFloat(M_raw)
  const C = parseFloat(C_raw) / 100

  if (isNaN(M) || isNaN(C) || M <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const Vmax = P2.COAG.DISS_AREA_SINGLE * P2.COAG.DISS_MAX_H * 2
  const V = M / C

  return V <= Vmax ? '✓ 溶解池可满足' : '⚠ 需溶液池补水'
}