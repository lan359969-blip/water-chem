// src/modules/dosing/shared/unit.js

/**
 * mg/L → kg/m³
 */
export function mgLToKgM3(value) {
  return value * 0.001
}

/**
 * 百分比 → 小数
 * 10 (%) → 0.10
 */
export function percentToRatio(percent) {
  return percent / 100
}