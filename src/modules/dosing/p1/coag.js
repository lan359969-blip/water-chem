import {
  calcDayMass,
  calcRawVolume,
  calcNeedVolume,
  calcCircleVolume,
  calcAddVolume,
  calcAddHeight,
  calcFinalHeight,
  checkOverflow
} from '../shared'

import { validatePositiveNumbers } from '../shared'

export function calcP1Coag(params) {
  const {
    D, Q, C, density,
    R, H, poolArea, maxH
  } = params

  const err = validatePositiveNumbers(
    { D, Q, C, density, R, H, poolArea, maxH },
    '一期混凝'
  )
  if (err) return { error: err }

  const dayMass = calcDayMass(D, Q)
  const rawVolume = calcRawVolume(dayMass, density)
  const needVolume = calcNeedVolume(rawVolume, C)
  const currentVolume = calcCircleVolume(R, H)
  const addVolume = calcAddVolume(needVolume, currentVolume)
  const addHeight = calcAddHeight(addVolume, poolArea)
  const finalHeight = calcFinalHeight(H, addHeight)
  const overflow = checkOverflow(finalHeight, maxH)

  return {
    stage: '一期混凝',
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