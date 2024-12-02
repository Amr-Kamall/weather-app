function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function convertTo12Hour(data) {
  // data = 2024-11-24 16:14
  const [hours, minutes] = data.split(" ")[1].split(":"); // 18 34 for example
  const period = +hours >= 12 ? "PM" : "AM";
  return `${+hours % 12 || 12}:${+minutes
    .toString()
    .padStart(2, "0")} ${period}`;
}

function currentDay(date) {
  //date = "date": "2024-12-03",
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
}

export { truncateText, convertTo12Hour, currentDay };
