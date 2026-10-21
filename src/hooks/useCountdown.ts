import { useState, useEffect } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
  hasMounted: boolean;
}

export function useCountdown(targetIsoDate: string = '2026-12-06T12:05:00+05:30'): CountdownState {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
    hasMounted: false,
  });

  useEffect(() => {
    const targetTimestamp = new Date(targetIsoDate).getTime();

    const calculateTimeLeft = (): CountdownState => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
          hasMounted: true,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
        isCompleted: false,
        hasMounted: true,
      };
    };

    // Calculate immediately on mount
    setState(calculateTimeLeft());

    const timer = setInterval(() => {
      setState(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetIsoDate]);

  return state;
}
