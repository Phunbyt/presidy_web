export function convertISOToDDMMYYYY(isoDate: string) {
  // Create a Date object from the ISO string
  const date = new Date(isoDate);

  // Get day, month, and year
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();

  // Return in dd/mm/yyyy format
  return `${day}/${month}/${year}`;
}
