export function passwordValidator(password) {
  if (!password) return "סיסמה לא יכולה להיות ריקה"
  if (password.length < 5) return 'סיסמה חייבת להיות באורך של 5 תווים'
  return ''
}
