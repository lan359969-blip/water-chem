// src/modules/dosing/p2/coag.js
// 二期混凝配药计算（完整工程版，不删减公式）

export function calcP2Coag(input) {
  const {
    M,            // 投加量 kg
    C,            // 目标浓度 %
    A_diss_single,// 单个溶解池有效面积 m²
    H_diss_max,   // 溶解池最大液位 m
    dissCount,    // 溶解池数量
    A_sol,        // 溶液池面积 m²
    H_sol_max     // 溶液池最大液位 m
  } = input

  const m = parseFloat(M)
  const c = parseFloat(C)

  if (isNaN(m) || isNaN(c) || m <= 0 || c <= 0) {
    return '请输入有效数值'
  }

  /* ===== 原 HTML：目标所需总体积 ===== */
  const V_total_raw = m / (c / 100)

  /* ===== 原 HTML：溶解池可容最大体积 ===== */
  const V_diss_max =
    A_diss_single * H_diss_max * dissCount

  let result = ''
  result += `【二期混凝计算结果】\n\n`
  result += `目标所需总体积：${V_total_raw.toFixed(2)} m³\n`
  result += `溶解池最大可用体积：${V_diss_max.toFixed(2)} m³\n\n`

  /* ===== 原 HTML：工况判断 ===== */
  if (V_total_raw <= V_diss_max) {
    const H_use =
      V_total_raw / (A_diss_single * dissCount)

    result += `工况一：仅使用溶解池\n`
    result += `溶解池运行液位：${H_use.toFixed(2)} m\n`
    result += `无需启用溶液池\n`

    return result
  }

  /* ===== 原 HTML：溶液池补水计算 ===== */
  const V_add_raw = V_total_raw - V_diss_max
  const H_add_raw = V_add_raw / A_sol
  const H_final = V_total_raw / A_sol

  result += `工况二：启用溶液池\n`
  result += `需补水体积：${V_add_raw.toFixed(2)} m³\n`
  result += `折算补水高度：${H_add_raw.toFixed(2)} m\n`
  result += `溶液池最终液位：${H_final.toFixed(2)} m\n`

  /* ===== 原 HTML：溢流判断 ===== */
  if (H_final > H_sol_max) {
    result += `⚠️ 溢流风险：超过最大允许液位 ${H_sol_max} m`
  } else {
    result += `✅ 液位满足池体要求`
  }

  return result
}