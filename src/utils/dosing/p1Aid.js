import { P1 } from './constants'

export function calcP1Aid(H_raw, C_raw) {
  const H = parseFloat(H_raw)
  const C = parseFloat(C_raw)
  if (isNaN(H) || isNaN(C) || H <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const V = Math.PI * P1.AID.RADIUS ** 2 * H
  const M = V * P1.AID.DENSITY
  const Vt = (M / (C / 100)) / 1000
  const Hadd = (Vt - V) / P1.AID.POOL_AREA

  return Hadd > P1.AID.POOL_MAX_H
    ? '⚠ 溢流'
    : `✓ 补水高度 ${Hadd.toFixed(2)} m`
}