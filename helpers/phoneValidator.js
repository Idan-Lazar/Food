export function phoneValidator(phone) {
    if (!phone) return "טלפון לא יכול להיות ריק"
    if (phone.length != 10) return "טלפון לא תקני"
    return ''
  }