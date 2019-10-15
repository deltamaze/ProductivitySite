
export function getMonthYear(ms) {
  const date = new Date(ms);
  const returnVal = (date.getFullYear() * 100) + (date.getMonth());
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
