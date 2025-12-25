
/*
    Returns scheduled date for today/tomorrow, time also if time is true
    @param {int} dayOffset: number of days to add, -1: yesterday, 0: today, 1: tomorrow, 2: tomorrow + 1 day
    @param {boolean} withTime: return timestamp, false: return date
*/
export const getDateTimeString = (dayOffset = 0, withTime = false) => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);

    return withTime
        ? d.toISOString()                     // timestamptz
        : d.toISOString().slice(0, 10);       // date
}


/*
    Returns formatted date
    @param {string} timestamp: ISO timestamp
    @param {object} options: options object
    @returns {string} formatted date
*/
export const formatDate = (
    timestamp,
    {
        locale = 'en-GB',
        showDate = true,
        showTime = true,
        showYear = false,
        hour12 = false,
        fallback = 'Never'
    } = {}
) => {
    if (!timestamp) return fallback;

    const options = {};

    if (showDate) {
        options.day = 'numeric';
        options.month = 'short';
        if (showYear) options.year = 'numeric';
    }

    if (showTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = hour12;
    }

    return new Date(timestamp).toLocaleString(locale, options);
};

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


/*
    Returns relative time
    @param {string} date: ISO timestamp
    @param {boolean} withoutSuffix: whether to include suffix (with suffix: 2 days ago, without suffix: 2 days)
    @returns {string} relative time
*/
export const getRelativeTime = (date, withoutSuffix = false) => {
    return dayjs(date).fromNow(withoutSuffix);
}


/*
    Returns whether a date is overdue: if the date is before today
    @param {string} date: ISO timestamp
    @returns {boolean} whether the date is overdue
*/
export const isOverdue = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
}
