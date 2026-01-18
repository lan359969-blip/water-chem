// 通用工程公式（所有期、所有药剂共用）

/** 日耗药量 kg/d */
export function calcDayMass(D, Q) {
  return D * Q / 1000
}

/** 原液体积 m³ */
export function calcRawVolume(dayMass, density) {
  return dayMass / density
}

/** 按浓度折算体积 m³ */
export function calcNeedVolume(rawVolume, C) {
  return rawVolume / (C / 100)
}

/** 圆池体积 m³ */
export function calcCircleVolume(R, H) {
  return Math.PI * R * R * H
}

/** 补水高度 m */
export function calcAddHeight(addVolume, poolArea) {
  return addVolume / poolArea
}