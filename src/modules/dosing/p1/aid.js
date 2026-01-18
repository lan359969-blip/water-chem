// src/modules/dosing/p1/aid.js
// 一期助凝配药计算（完整工程链，不删减公式）

export function calcP1Aid(params) {
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

  if (
    [d, q, c, rho, r, h].some(v => isNaN(v) || v <= 0)
  ) {
    return { error: '一期助凝：输入参数不完整或非法' }
  }

  /* ===============================
     ① 日耗药量（kg/d）
     原 HTML：D × Q / 1000
  =============================== */
  const dayMass = d * q / 1000

  /* ===============================
     ② 原液体积（m³/d）
     原 HTML：日耗药量 / 密度
  =============================== */
  const rawVolume = dayMass / rho

  /* ===============================
     ③ 按浓度折算所需体积（m³）
     原 HTML：原液体积 / (C / 100)
  =============================== */
  const needVolume = rawVolume / (c / 100)

  /* ===============================
     ④ 当前池内容积（m³）
     原 HTML：π × R² × H
  =============================== */
  const currentVolume = Math.PI * r * r * h

  /* ===============================
     ⑤ 需补加体积（m³）
     原 HTML：所需体积 − 当前体积
  =============================== */
  const addVolume = needVolume - currentVolume

  /* ===============================
     ⑥ 折算补水高度（m）
     原 HTML：补加体积 / 池面积
  =============================== */
  const addHeight = addVolume / poolArea

  /* ===============================
     ⑦ 最终液位 & 溢流判断
  =============================== */
  const finalHeight = h + addHeight
  const overflow = finalHeight > maxH

  /* ===============================
     工程结果（完整返回）
  =============================== */
  return {
    stage: '一期助凝',

    // 原 HTML 每一行工程量
    dayMass,        // 日耗药量 kg/d
    rawVolume,      // 原液体积 m³
    needVolume,     // 折算所需体积 m³
    currentVolume,  // 当前池体积 m³
    addVolume,      // 需补加体积 m³
    addHeight,      // 补水高度 m
    finalHeight,    // 最终液位 m

    // 工程判断
    overflow
  }
}