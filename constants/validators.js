// Validación para RUT chileno usando módulo 11 y excluyendo patrones repetidos
export const validateRUT = (rut) => {
  const cleanedRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  const repeatedPattern = /^(\d)\1{7}-\1$/;
  if (repeatedPattern.test(rut)) return false;

  const rutNumber = cleanedRut.slice(0, -1);
  const verificationDigit = cleanedRut.slice(-1);

  let sum = 0;
  let multiplier = 2;
  for (let i = rutNumber.length - 1; i >= 0; i--) {
    sum += parseInt(rutNumber[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = 11 - (sum % 11);
  const calculatedDigit = remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();

  return calculatedDigit === verificationDigit;
};

// Validación para número de teléfono chileno
export const validatePhone = (phone) => {
  const phonePattern = /^\+569\d{8}$/;
  return phonePattern.test(phone);
};
