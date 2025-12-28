
import { useState, useEffect } from 'react';

export const useTimer = (initialTime: string | undefined) => {
  const [timer, setTimer] = useState<string>(initialTime || '00:00:00');

  useEffect(() => {
    if (!initialTime) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        const parts = prev.split(':').map(Number);
        let [h, m, s] = parts;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        
        if (h === 0 && m === 0 && s === 0) {
          clearInterval(interval);
          return '00:00:00';
        }
        
        return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  return timer;
};
