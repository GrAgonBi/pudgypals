export const baseUrl = process.env.REACT_APP_API_URL;

export function formatWeekday(str) {
  const date = new Date(str);
  const dateParts = str.split("-");
  const day = dateParts[2]; // Add leading zero if necessary

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formattedDate = `${day}/${weekdayNames[date.getDay()]}`;

  return formattedDate;
}

export function formatDate(str) {
  // Parse the input date string
  const dateParts = str.split("-");

  return `${dateParts[1]}/${dateParts[2]}`;
}

export function formatYeardate(str) {
  // Parse the input date string
  const dateParts = str.split("-");

  return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
}

export function generateDateArray(weights) {
  // const targetLength = 7;
  const weightsLength = weights.length;

  if (weightsLength <= 2) {
    return weights.map((entry) => entry.date);
  }

  const middleIndex = Math.floor(weightsLength / 2);

  const modifiedDateArray = [
    weights[0].date,
    weights[middleIndex].date,
    weights[weightsLength - 1].date,
  ];

  return modifiedDateArray;
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function transformToday(str) {
  const year = str.getFullYear();
  const month = String(str.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(str.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
