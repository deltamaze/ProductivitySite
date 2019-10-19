
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
export function getDay(ms) {
  const date = new Date(ms);
  return date.getDate().toString();
}
