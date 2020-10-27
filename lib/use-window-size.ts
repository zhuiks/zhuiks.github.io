import { useState, useLayoutEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

function getWindowSize(): WindowSize {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height
  };
}

export default function useWindowSize(): WindowSize {
  const [windowDimensions, setWindowSize] = useState<WindowSize>(
    { width: 0, height: 0 }
  );

  useLayoutEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}