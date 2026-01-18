// 一期混凝配药计算（完全还原原 HTML）

export function calcP1Coag(input) {
  const {
    H,          // 计量桶液位高度 m
    C,          // 目标浓度 %
    radius,     // 计量桶半径 m
    density,    // 原液密度 kg/m³
    poolArea,   // 配药池面积 m²
    poolMaxH    // 配药池最大允许液位 m
  } = input

  const h = parseFloat(H)
  const c = parseFloat(C)

  if (isNaN(h) || isNaN(c) || h <= 0 || c <= 0) {
    return '请输入有效数值'
  }

  /* ===== 原 HTML：计量桶原液体积 ===== */
  const V_drug_raw = Math.PI * radius * radius * h

  /* ===== 原 HTML：计量桶原液质量 ===== */
  const M_drug_raw = V_drug_raw * density

  /* ===== 原 HTML：目标所需总体积 ===== */
  const V_total_raw = (M_drug_raw / (c / 100)) / 1000

  /* ===== 原 HTML：需补水体积 ===== */
  const V_add_raw = V_total_raw - V_drug_raw

  /* ===== 原 HTML：折算补水高度 ===== */
  const H_add_raw = V_add_raw / poolArea

  let result = ''
  result += `计量桶原液体积：${V_drug_raw.toFixed(2)} m³\n`
  result += `计量桶原液质量：${M_drug_raw.toFixed(2)} kg\n\n`

  result += `目标所需总体积：${V_total_raw.toFixed(2)} m³\n`
  result += `公式：V总 = (原液质量 ÷ 目标浓度) ÷ 1000\n\n`

  result += `需补水体积：${V_add_raw.toFixed(2)} m³\n`
  result += `折算补水高度：${H_add_raw.toFixed(2)} m\n`

  /* ===== 原 HTML：溢流判断 ===== */
  if (H_add_raw > poolMaxH) {
    result += `⚠️ 溢流：补水高度超过池体最大液位 ${poolMaxH} m`
  } else {
    result += `✅ 补水高度满足要求`
  }

  return result
}