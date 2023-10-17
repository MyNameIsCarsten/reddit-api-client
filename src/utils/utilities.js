export const getTimeElapsedString = (timestamp) => {
    // Convert the timestamp to a Date object
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
  
    // Get the current date and time
    const now = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = now - date;
  
    // Calculate various time units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Roughly 30 days per month
    const years = Math.floor(months / 12);
  
    // Create a human-readable string
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }