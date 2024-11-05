export const formatRUT = (text, setRut) => {
  let cleaned = text.replace(/[^0-9kK]/g, '');

  if (cleaned.length > 9) {
    cleaned = cleaned.slice(0, 9);
  }

  if (cleaned.length > 1) {
    cleaned = cleaned.replace(/(\d{1,2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    if (cleaned.length > 9) {
      cleaned = cleaned.replace(/(\d{1,2}\.\d{3}\.\d{3})(\d{1})/, '$1-$2');
    }
  }

  if (cleaned.endsWith('k') || cleaned.endsWith('K')) {
    cleaned = cleaned.slice(0, -1) + '-k';
  }

  setRut(cleaned);
};
  
export const formatFecha = (text, setFechaNacimiento) => {
  let cleaned = text.replace(/[^0-9]/g, '');
  if (cleaned.length > 2) {
    cleaned = cleaned.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  }
  if (cleaned.length > 10) {
    cleaned = cleaned.slice(0, 10);
  }
  setFechaNacimiento(cleaned);
};

export const formatCelular = (text, setCelular) => {
  if (text.startsWith('+569')) {
    if (text.length <= 12) setCelular(text);
  } else {
    setCelular('+569');
  }
};

  