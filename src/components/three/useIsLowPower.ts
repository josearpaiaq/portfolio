'use client';

import { useEffect, useState } from 'react';

// Coarse pointer (touch) or a narrow viewport: cheaper rendering, same content.
export default function useIsLowPower() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse), (max-width: 768px)');
    setIsLowPower(query.matches);

    const onChange = (event: MediaQueryListEvent) => setIsLowPower(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return isLowPower;
}
