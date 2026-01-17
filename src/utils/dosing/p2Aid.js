import { P2 } from './constants'

export function calcP2Aid(H_raw, C_raw) {
  const H = parseFloat(H_raw)
  const C = parseFloat(C_raw)

  if (isNaN(H) || isNaN(C) || H <= 0 || C <= 0) {
    return '请输入有效数值'
  }

  const V = P2.AID.TANK_L * P2.AID.TANK_W * H
  const M = V * P2.AID.DENSITY
  const Vt = (M / (C / 100)) / 1000

  return `需补水 ${(Vt - V).toFixed(2)} m³`
}