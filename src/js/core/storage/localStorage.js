export function storage(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return JSON.parse(localStorage.getItem(key))
}