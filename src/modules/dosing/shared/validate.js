export function mustPositive(val, name = '参数') {
  const n = parseFloat(val)
  if (isNaN(n) || n <= 0) {
    throw new Error(`${name} 必须为大于 0 的数字`)
  }
  return n
}