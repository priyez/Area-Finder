import { useState, useEffect } from 'react';

const useTimeAgo = (timestampInSeconds: number): string => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
      
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const difference = currentTime - timestampInSeconds;

      // Convert seconds to minutes, hours, days, and months
      const minutes = Math.floor(difference / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);

      // Update time ago based on the difference
      if (months > 0) {
        setTimeAgo(`${months} month${months > 1 ? 's' : ''} ago`);
      } else if (days > 0) {
        setTimeAgo(`${days} day${days > 1 ? 's' : ''} ago`);
      } else if (hours > 0) {
        setTimeAgo(`${hours} hour${hours > 1 ? 's' : ''} ago`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
      } else {
        setTimeAgo('Hours ago');
      }
    }, 6000); // Update every minute

    return () => clearInterval(interval); // Cleanup function
  }, [timestampInSeconds]);

  return timeAgo;
};

export default useTimeAgo;
