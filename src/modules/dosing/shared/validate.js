// src/modules/dosing/shared/validate.js

export function toNumber(val, name = '参数') {
  const n = parseFloat(val)
  if (isNaN(n)) {
    throw new Error(`${name} 不是有效数字`)
  }
  return n
}

export function mustPositive(val, name = '参数') {
  const n = toNumber(val, name)
  if (n <= 0) {
    throw new Error(`${name} 必须大于 0`)
  }
  return n
}

export function mustNonNegative(val, name = '参数') {
  const n = toNumber(val, name)
  if (n < 0) {
    throw new Error(`${name} 不能小于 0`)
  }
  return n
}