import { getDays, getMonths } from './enums';

const monthNames = getMonths();
const days = getDays();
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
export function getTimeFromDate(ms) {
  return ms % 86400000;
}
export function getLocalTimezoneOffsetInMS() {
  return (new Date().getTimezoneOffset() * 60000);
}
export function getHtmlFormattedTime(ms) {
  // ms passed in is UTC, so convert to local
  const timezonedMs = ms - getLocalTimezoneOffsetInMS();
  const timeMs = getTimeFromDate(timezonedMs);

  let minutes = Math.floor((timeMs / (1000 * 60)) % 60);
  let hours = Math.floor((timeMs / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
}
export function getRevertedHtmlFormattedTime(formattedTime) {
  // opposite of getHtmlFormattedTime
  // parse out hours and minutes
  // determine if string has ":" if not return 0
  if (!formattedTime.includes(':')) {
    return 0;
  }
  const hours = formattedTime.split(':')[0];
  const minutes = formattedTime.split(':')[1];
  let msTime = (hours * 1000 * 60 * 60) + (minutes * 1000 * 60);
  msTime += getLocalTimezoneOffsetInMS();
  return msTime;
}
export function getHtmlFormattedDate(ms) {
  // ms passed in is UTC, so convert to local
  const timezonedMs = ms - getLocalTimezoneOffsetInMS();
  const date = new Date(timezonedMs);
  let dd = date.getDate();
  let mm = date.getMonth() + 1; // January is 0!

  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
}
export function getSwappedTimePortionOfDate(originalDate, newTime) {
  // get time portion of original date
  const timeFromOriginalDate = getTimeFromDate(originalDate);
  // negate from date
  let updatedDate = originalDate - timeFromOriginalDate;
  // add in new time
  updatedDate += newTime;// return
  return updatedDate;
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
