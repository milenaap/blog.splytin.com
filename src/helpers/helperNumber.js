// helpers/helperNumber.js
/**
 * Formatea un número a formato europeo con decimales y símbolo de moneda.
 *
 * @param {number|string} value - El número a formatear.
 * @param {Object} options - Opciones opcionales (mínimo de decimales, etc.).
 * @param {boolean} withCurrency - Si se incluye el símbolo de €.
 * @returns {string} - Número formateado.
 */
export const formatNumber = (
  value,
  withCurrency = true,
  options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
) => {
  const numericValue = Number(value);

  if (isNaN(numericValue)) return "";

  const formatted = new Intl.NumberFormat("es-ES", {
    useGrouping: true,
    ...options,
  }).format(numericValue);

  return withCurrency ? `${formatted} €` : formatted;
};



/**
 * Agrega ceros a la izquierda hasta alcanzar la longitud deseada
 * @param {string|number} numero - El número original
 * @param {number} longitud - La longitud total deseada
 * @returns {string} El número con ceros a la izquierda
 */
export function padLeft(numero, longitud = 0) {
  return numero.toString().padStart(longitud, '0');
}




/**
 * Retorna un UUID unico
 * @returns {string} El número con ceros a la izquierda
 */
export function getUID() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
