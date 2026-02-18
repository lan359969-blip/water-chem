import {
  calcCoagNeedVolume,
  calcDissHeight,
  calcSolAddVolume,
  calcSolAddHeight,
  calcSolFinalHeight,
  checkOverflow
} from '../shared/formula'
import { DOSING } from '../../../config/dosing.config'

const CFG = DOSING.P2.COAG

/**
 * 二期混凝剂计算
 * @param {number} M - 固体投加量（吨）
 * @param {number} C - 目标浓度（%）
 */
export function calcP2Coag(M, C) {
  if (!M || !C || M <= 0 || C <= 0) return { error: '请输入有效正数' }

  const V_need = calcCoagNeedVolume(M, C)

  if (V_need <= CFG.DISS_VOLUME_MAX) {
    // 工况一：两座溶解池装得下
    const dissH = calcDissHeight(V_need, CFG.DISS_TOTAL_AREA)
    return {
      case: 1,
      stage: '二期混凝',
      V_need,
      dissH,
      dissMaxH: CFG.DISS_MAX_H,
      overflow: false
    }
  } else {
    // 工况二：需要溶液池补水
    const V_add   = calcSolAddVolume(V_need, CFG.DISS_VOLUME_MAX)
    const H_add   = calcSolAddHeight(V_add, CFG.SOL_AREA)
    const H_final = calcSolFinalHeight(V_need, CFG.SOL_AREA)
    const overflow = checkOverflow(H_final, CFG.SOL_MAX_H)
    return {
      case: 2,
      stage: '二期混凝',
      V_need,
      V_diss: CFG.DISS_VOLUME_MAX,
      V_add,
      H_add,
      H_final,
      solMaxH: CFG.SOL_MAX_H,
      overflow
    }
  }
}
