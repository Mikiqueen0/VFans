
const FormatTime = (createdAt) => {
    const postCreatedAt = new Date(createdAt);
    const now = new Date();
    const diffMs = now - postCreatedAt;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
        // Less than a minute
        return "Just now";
    } else if (diffMinutes < 60) {
        // 1-60 minutes
        return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffHours < 24) {
        // 1-24 hours
        return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays < 7) {
        // 1-7 days
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return `Posted ${
            days[postCreatedAt.getDay()]
        } at ${postCreatedAt.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })}`;
    } else {
        // Longer than 7 days
        return `Posted on ${postCreatedAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
        })}, ${postCreatedAt.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })}`;
    }
};

export default FormatTime;