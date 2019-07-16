export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function thirtyday() {
  const dat = new Date();
  const rest = new Date(dat.getTime() - (3 * 30 * 24 * 60 * 60 * 1000))
  return rest
}
