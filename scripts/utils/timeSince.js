/**
 * Retuns how long ago a date was in a readable format
 * @param {number} date - A UNIX timestamp (milliseconds) in the past
 * @returns {string} - a readable format of how long ago a date was
 */

function timeSince(date) {
    const now = new Date().getTime();
    const oneMinute = 60000;
    const oneHour = 3600000;
    const oneDay = 3600000 * 24;
    const oneWeek = 3600000 * 24 * 7;
    const oneMonth = 3600000 * 24 * 30;
    const oneYear = 3600000 * 24 * 365;
    const elapsed = now - date;

    // less than 1 minute
    if (elapsed < oneMinute) return 'Just now';

    // more than 1 minute, less than 2 minutes
    if (elapsed < oneMinute * 2) return '1 minute ago';

    // more than 1 minute, less than 1 hour
    if (elapsed < oneHour) {
        const elapsedMinutes = Math.floor(elapsed / oneMinute);
        return `${elapsedMinutes} minutes ago`;
    }

    // more than 1 hour, less than 2 hours
    if (elapsed < oneHour * 2) return '1 hour ago';

    // more than 2 hours, less than 1 day
    if (elapsed < oneDay) {
        const elapsedHours = Math.floor(elapsed / oneHour);
        return `${elapsedHours} hours ago`;
    }

    // more than 1 day, less than 2 days
    if (elapsed < oneDay * 2) return '1 day ago';

    // more than 2 days, less than 1 week
    if (elapsed < oneWeek) {
        const elapsedDays = Math.floor(elapsed / oneDay);
        return `${elapsedDays} days ago`;
    }

    // more than 1 week, less than 2 weeks
    if (elapsed < oneWeek * 2) return '1 week ago';

    // more than 1 week, less than 1 month
    if (elapsed < oneMonth) {
        const elapsedWeeks = Math.floor(elapsed / oneWeek);
        return `${elapsedWeeks} weeks ago`;
    }

    // more than 1 month, less than 2 months
    if (elapsed < oneMonth * 2) return '1 month ago';

    // more than 2 months, less than 1 year
    if (elapsed < oneYear) {
        const elapsedMonths = Math.floor(elapsed / oneMonth);
        return `${elapsedMonths} months ago`;
    }
    // more than 1 year, less than 2 years
    if (elapsed < oneYear * 2) return '1 year ago';

    // more than 2 years
    if (elapsed > oneYear * 2) {
        const elapsedYears = Math.floor(elapsed / oneYear);
        return `${elapsedYears} years ago`;
    }

    // Fallback - returns the date in a readable format
    return date.toLocaleString('no-NO');
}

export { timeSince };
