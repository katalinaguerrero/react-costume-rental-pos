export const getFormattedDate = (
  date: { seconds?: number } | Date | null
): string => {
  if (!date) {
    return "Fecha no disponible"; // Handle the case when the date is null
  }

  const dateObj =
    date instanceof Date ? date : new Date((date.seconds ?? 0) * 1000); // Use 0 if seconds is undefined

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-indexed
  const year = dateObj.getFullYear();

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const getNowFormattedDate = (): string => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  return `${day}_${month}_${year}_ListaHelados`;
};
