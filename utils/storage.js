export const Storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key, defaultValue = null) {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : defaultValue
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}
