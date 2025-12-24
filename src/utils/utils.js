
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

