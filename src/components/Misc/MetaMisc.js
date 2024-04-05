import moment from 'moment';
import { Badge } from 'react-bootstrap';

/**
 * Calculates the number of days remaining until a given expiry date and returns a badge.
 * @param {string} expiryDate - The expiry date in 'DD/MM/YYYY' format.
 * @returns A React Bootstrap Badge element indicating the number of days remaining or expired status.
 */
export const getRemainingDaysBadge = (expiryDate) => {
    // Parse the expiry date using moment
    const end = moment(expiryDate, 'DD/MM/YYYY');
    const now = moment();
    const remainingDays = end.diff(now, 'days');
    let badgeVariant;

    // Determine the badge color based on the remaining days
    if (remainingDays > 30) {
        badgeVariant = 'success'; // Green for more than 30 days remaining
    } else if (remainingDays > 7) {
        badgeVariant = 'warning'; // Yellow for less than 30 but more than 7 days
    } else {
        badgeVariant = 'danger'; // Red for less than 7 days
    }

    // Return the badge with the appropriate text
    return (
        <Badge bg={badgeVariant}>
            {remainingDays > 0 ? `${remainingDays} days remaining` : 'Expired'}
        </Badge>
    );
};

