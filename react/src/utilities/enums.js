const days = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const repeatOptions = ['Once', 'Daily', 'Weekly', 'Month/Yearly'
];

const frequencyOptions = ['First &weekday&', 'Second &weekday&', 'Third &weekday&', 'Fourth &weekday&', 'Last &weekday&', 'Last day of month'
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

export function getFrequencyOptions() {
    return frequencyOptions;
}
