export function storage(key, value) {
  if (value) {
    localStorage.setItem(key, value)
  }

  return JSON.parse(localStorage.getItem(key))
}