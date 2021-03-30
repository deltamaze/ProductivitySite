import _ from 'lodash';

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

function generatePlannerPayload(day, planner, month) {
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
function generateJournalPayload(day, journal, month) {
    let returnMonth = month;
    if (returnMonth === undefined) {
        returnMonth = { [day]: { planner: '', journal } };
        return returnMonth;
    }
    if (returnMonth[day] === undefined) {
        returnMonth[day] = { planner: '', journal };
        return returnMonth;
    }
    returnMonth[day].journal = journal;
    return returnMonth;
}
export function generateMonthPayload(day, targetElement, elementData, month) {
    const cloneDeepMonth = _.cloneDeep(month);

    if (targetElement === 'planner') {
        return generatePlannerPayload(day, elementData, cloneDeepMonth);
    }
    if (targetElement === 'journal') {
        return generateJournalPayload(day, elementData, cloneDeepMonth);
    }
    return { [day]: { planner: '', journal: '' } };
}
