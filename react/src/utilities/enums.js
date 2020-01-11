const days = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const repeatOptions = ['Daily', 'Weekly', 'Yearly'
];


export function getRepeatOptions() {
  return repeatOptions;
}

export function getDays() {
  return days;
}

export function getMonths() {
  return months;
}
