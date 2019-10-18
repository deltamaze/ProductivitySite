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
