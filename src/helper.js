export const baseUrl = "http://localhost:8080";

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

  // 如果weights长度不超过7，则无需修改
  if (weightsLength <= 2) {
    return weights.map((entry) => entry.date);
  }

  const middleIndex = Math.floor(weightsLength / 2); // 计算中间位置的索引

  // 构建修改后的日期数组
  const modifiedDateArray = [
    weights[0].date, // 添加首个日期
    weights[middleIndex].date, // 添加中间位置的日期
    weights[weightsLength - 1].date, // 添加最后一个日期
  ];

  return modifiedDateArray;
}

// 示例用法
