/**
 * Retorna hoy
 * @returns {string} ex: "AAAA-MM-DD"
 */
export const getTodayDate = (byHTML = false ) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
  const dd = String(today.getDate()).padStart(2, '0');

  if(byHTML){
    return `${dd}-${mm}-${yyyy}`;
  }else{
    return `${yyyy}-${mm}-${dd}`;
  }
};



/**
 * Retorna la hora actual en formato HH:mm (24h)
 * @returns {string} Ejemplo: "08:42"
 */
export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};


/**
 * Return Month
 */
export const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth() + 1; // Enero es 0, por eso se suma 1
};


/**
 * Return Year
 */
export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear(); // Ej: 2025
};


/**
 * Retorna la fecha en formato DD-MM-AAAA. Ejemplo "2025-12-15" -> "25-12-2025"
 * @param {*} dateStr 
 * @returns 
 */
export function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}


/**
 * Convierte un string ISO (ej: "2025-07-31T14:47:44.000000Z")
 * en formato "DD-MM-YYYY HH:mm"
 */
export function formatDateTimeToDDMMYYYYHHmm(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr); // crea objeto Date

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}
