import { useState, useEffect } from 'react';

/**
 * Custom hook to detect online/offline status
 * @returns {boolean} - Current online status (true = online, false = offline)
 *
 * @example
 * const isOnline = useOnlineStatus();
 * if (!isOnline) {
 *   return <div>You are offline</div>;
 * }
 */
const useOnlineStatus = () => {
  // Initialize with current navigator status
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    // Handler when browser goes online
    const handleOnline = () => {
      setIsOnline(true);
    };

    // Handler when browser goes offline
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
