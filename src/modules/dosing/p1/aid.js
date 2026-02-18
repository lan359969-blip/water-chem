import {
  calcTankVolumeCircle,
  calcDrugMass,
  calcAidNeedVolume,
  calcAidAddVolume,
  calcSolAddHeight,
  checkOverflow
} from '../shared/formula'
import { DOSING } from '../../../config/dosing.config'

const CFG = DOSING.P1.AID

/**
 * 一期助凝剂（益维净）计算
 * @param {number} H - 计量桶液位（m）
 * @param {number} C - 目标浓度（%）
 */
export function calcP1Aid(H, C) {
  if (!H || !C || H <= 0 || C <= 0) return { error: '请输入有效正数' }

  const V_drug  = calcTankVolumeCircle(CFG.TANK_RADIUS, H)
  const M_drug  = calcDrugMass(V_drug, CFG.DENSITY)
  const V_total = calcAidNeedVolume(M_drug, C)
  const V_add   = calcAidAddVolume(V_total, V_drug)
  const H_add   = calcSolAddHeight(V_add, CFG.SOL_AREA)
  const overflow = checkOverflow(H_add, CFG.SOL_MAX_H)

  return {
    stage: '一期助凝',
    V_drug,
    M_drug,
    V_total,
    V_add,
    H_add,
    solMaxH: CFG.SOL_MAX_H,
    overflow
  }
}
