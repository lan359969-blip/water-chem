// src/modules/dosing/shared/formula.js

import { percentToRatio } from './unit'
import { PI } from './constants'

/**
 * ① 日耗药量 kg/d
 * D: mg/L
 * Q: m³/d
 */
export function calcDayMass(D, Q) {
  return (D * Q) / 1000
}

/**
 * ② 原液体积 m³
 * dayMass: kg/d
 * density: kg/m³
 */
export function calcRawVolume(dayMass, density) {
  return dayMass / density
}

/**
 * ③ 按浓度折算所需体积 m³
 * rawVolume: m³
 * C: %
 */
export function calcNeedVolume(rawVolume, C) {
  return rawVolume / percentToRatio(C)
}

/**
 * ④ 圆形配药池体积 m³
 * R: m
 * H: m
 */
export function calcCircleVolume(R, H) {
  return PI * R * R * H
}

/**
 * ⑤ 需补加体积 m³
 */
export function calcAddVolume(needVolume, currentVolume) {
  return needVolume - currentVolume
}

/**
 * ⑥ 折算补水高度 m
 * addVolume: m³
 * poolArea: m²
 */
export function calcAddHeight(addVolume, poolArea) {
  return addVolume / poolArea
}

/**
 * ⑦ 最终液位 m
 */
export function calcFinalHeight(H, addHeight) {
  return H + addHeight
}

/**
 * ⑧ 溢流判断
 */
export function checkOverflow(finalHeight, maxH) {
  return finalHeight > maxH
}