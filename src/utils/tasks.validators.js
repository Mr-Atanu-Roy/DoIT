/**
    * functions to validate user input
    * @param {string} 
    * @returns {status: boolean, message: string}
*/

export const validateTasks = {
    title: (title) => {
        const trimmedTitle = title ? title.trim() : "";
        if (!trimmedTitle) {
            return { status: false, message: "Title is required" };
        }
        if (trimmedTitle.length <= 6) {
            return { status: false, message: "Title must have more than 6 characters" };
        }
        return { status: true, message: "" };
    },

    description: (description) => {
        const trimmedDesc = description ? description.trim() : "";
        if (trimmedDesc && trimmedDesc.length <= 25) {
            return { status: false, message: "Description must have more than 25 characters" };
        }
        return { status: true, message: "" };
    },

    priority: (priority) => {
        // Priority must be 1, 2, or 3
        const validPriorities = [1, 2, 3];
        if (!validPriorities.includes(priority)) {
            return { status: false, message: "Priority must be 1, 2, or 3" };
        }
        return { status: true, message: "" };
    },

    scheduled_for: (date) => {
        if (!date) {
            return { status: false, message: "Scheduled date is required" };
        }

        const inputDate = new Date(date);
        if (isNaN(inputDate.getTime())) {
            return { status: false, message: "Invalid date format" };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Normalize input date to remove time component for comparison
        const checkDate = new Date(inputDate);
        checkDate.setHours(0, 0, 0, 0);

        const isToday = checkDate.getTime() === today.getTime();
        const isTomorrow = checkDate.getTime() === tomorrow.getTime();

        if (!isToday && !isTomorrow) {
            return { status: false, message: "Scheduled date must be today's or tomorrow's date" };
        }

        return { status: true, message: "" };
    },

}