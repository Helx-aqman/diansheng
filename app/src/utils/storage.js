export function load(key) {
  try { return uni.getStorageSync(key) } catch (e) { return null }
}
export function save(key, val) {
  try { uni.setStorageSync(key, val) } catch (e) {}
}
