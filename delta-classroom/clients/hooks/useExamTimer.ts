import { useState, useEffect } from 'react';

export function useExamTimer(minutes: number) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
}
