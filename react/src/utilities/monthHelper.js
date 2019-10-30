export function getDayPlanner(day, month) {
  if (month === undefined) {
    return '';
  }
  if (month[day] === undefined) {
    return '';
  }
  if (month[day].planner === undefined) {
    return '';
  }
  return month[day].planner;
}

export function getDayElement(day, month, element) {
  if (month === undefined) {
    return '';
  }
  if (month[day] === undefined) {
    return '';
  }

  if (month[day][element] === undefined) {
    return '';
  }
  return month[day][element];
}
export function generateNewMonth(day, planner, month) {
  let returnMonth = month;
  if (returnMonth === undefined) {
    returnMonth = { [day]: { planner, journal: '' } };
    return returnMonth;
  }
  if (returnMonth[day] === undefined) {
    returnMonth[day] = { planner, journal: '' };
    return returnMonth;
  }
  returnMonth[day].planner = planner;
  return returnMonth;
}
