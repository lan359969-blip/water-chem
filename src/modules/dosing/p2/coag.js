// src/modules/dosing/p2/coag.js
// 二期混凝配药计算（完整工程链）

export function calcP2Coag(params) {
  const {
    D,          // 设计投加量 mg/L
    Q,          // 日处理水量 m³/d
    C,          // 原液浓度 %
    density,    // 药剂密度 kg/m³
    R,          // 配药池半径 m
    H,          // 当前液位 m
    poolArea,   // 配药池面积 m²
    maxH        // 最大允许液位 m
  } = params

  const d = Number(D)
  const q = Number(Q)
  const c = Number(C)
  const rho = Number(density)
  const r = Number(R)
  const h = Number(H)

  if ([d, q, c, rho, r, h].some(v => isNaN(v) || v <= 0)) {
    return { error: '二期混凝：输入参数不完整或非法' }
  }

  /* ① 日耗药量 kg/d */
  const dayMass = d * q / 1000

  /* ② 原液体积 m³ */
  const rawVolume = dayMass / rho

  /* ③ 折算所需体积 m³ */
  const needVolume = rawVolume / (c / 100)

  /* ④ 当前池体积 m³ */
  const currentVolume = Math.PI * r * r * h

  /* ⑤ 需补加体积 m³ */
  const addVolume = needVolume - currentVolume

  /* ⑥ 折算补水高度 m */
  const addHeight = addVolume / poolArea

  /* ⑦ 最终液位 & 溢流判断 */
  const finalHeight = h + addHeight
  const overflow = finalHeight > maxH

  return {
    stage: '二期混凝',

    dayMass,
    rawVolume,
    needVolume,
    currentVolume,
    addVolume,
    addHeight,
    finalHeight,
    overflow
  }
}