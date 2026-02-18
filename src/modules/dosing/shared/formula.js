// =============================================
// 共享计算公式
// =============================================
export const PI = Math.PI

// ——— 混凝剂（固体PAC）公式 ———

/**
 * 所需总体积 m³
 * M: 固体投加量 吨
 * C: 目标浓度 % (传入百分数，内部转小数)
 * 公式：V = M(吨) × 1000(kg) ÷ [C(小数) × 1000(kg/m³水)] = M / C(小数)
 */
export function calcCoagNeedVolume(M, C) {
  return M / (C / 100)   // 单位：m³
}

/**
 * 溶解池液位高度 m（工况一）
 */
export function calcDissHeight(V, dissArea) {
  return V / dissArea
}

/**
 * 溶液池需补水体积 m³（工况二）
 */
export function calcSolAddVolume(V_need, V_diss_max) {
  return V_need - V_diss_max
}

/**
 * 折算补水高度 m
 */
export function calcSolAddHeight(V_add, solArea) {
  return V_add / solArea
}

/**
 * 溶液池最终液位 m（工况二）
 * 整体体积除以溶液池面积
 */
export function calcSolFinalHeight(V_need, solArea) {
  return V_need / solArea
}

// ——— 助凝剂（液体）公式 ———

/**
 * 计量桶原液体积 m³（圆形桶）
 */
export function calcTankVolumeCircle(r, H) {
  return PI * r * r * H
}

/**
 * 计量桶原液体积 m³（长方体桶）
 */
export function calcTankVolumeRect(L, W, H) {
  return L * W * H
}

/**
 * 原液质量 kg
 * V: m³, density: kg/m³
 */
export function calcDrugMass(V, density) {
  return V * density
}

/**
 * 目标所需总体积 m³
 * 公式：V总 = (原液质量 kg ÷ 目标浓度小数) ÷ 1000
 * 相当于把原液质量当做溶质，算出溶液总质量再除以水的密度
 */
export function calcAidNeedVolume(M_drug, C) {
  return (M_drug / (C / 100)) / 1000
}

/**
 * 溶液池补水体积 m³
 */
export function calcAidAddVolume(V_total, V_drug) {
  return V_total - V_drug
}

/**
 * 溢流判断
 */
export function checkOverflow(finalH, maxH) {
  return finalH > maxH
}
