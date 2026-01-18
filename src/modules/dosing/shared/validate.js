export function checkPositiveNumbers(obj, label = '') {
  for (const [key, val] of Object.entries(obj)) {
    if (isNaN(val) || val <= 0) {
      return `${label} 参数错误：${key}`
    }
  }
  return null
}