const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const days = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const months = ['January', 'February', 'March', 'April',
//  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function getMonthYear(ms) {
  const date = new Date(ms);
  // month starts at 0, so add 1
  const returnVal = (date.getFullYear() * 100) + (date.getMonth() + 1);
  return returnVal.toString();
}
export function getFormattedDate(ms) {
  const date = new Date(ms);
  let dd = date.getDate();
  let mm = date.getMonth() + 1; // January is 0!

  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}
export function getFormattedShortDate(ms) {
  const date = new Date(ms);
  let dd = date.getDate();
  let mm = date.getMonth() + 1; // January is 0!

  const yyyy = date.getFullYear().toString().substr(-2);
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}
export function getDayNumber(ms) {
  const date = new Date(ms);
  return date.getDate().toString();
}
export function getDayOfWeek(ms) {
  const date = new Date(ms);
  return days[date.getDay()];
}
export function getDayOfWeekShort(ms) {
  const date = new Date(ms);
  return days[date.getDay()].substring(0, 3);
}
export function getFirstDayOfMonth(ms) {
  const date = new Date(ms);
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m, 1);
}
export function getMonthName(ms) {
  const date = new Date(ms);
  return `${monthNames[date.getMonth()]}`;
  // return `${monthNames[date.getMonth()].substring(0, 3)} ${date.getFullYear().toString()}`;
}
export function getYear(ms) {
  const date = new Date(ms);
  // return `${monthNames[date.getMonth()]}`;
  return `${date.getFullYear().toString()}`;
}
