// src/modules/dosing/shared/validate.js

/**
 * 检查参数是否为有效正数
 */
export function validatePositiveNumbers(params, stage = '') {
  for (const key in params) {
    const v = Number(params[key])
    if (isNaN(v) || v <= 0) {
      return `${stage} 参数错误：${key}`
    }
  }
  return null
}