export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "מייל לא יכול להיות ריק"
  if (!re.test(email)) return 'מייל לא תקני'
  return ''
}
