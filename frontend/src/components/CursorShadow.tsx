import { useEffect, useState } from 'react';
import { useThemeMode } from '../contexts/ThemeContext';

const CursorShadow = () => {
  const { mode } = useThemeMode();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const shadowStyle = mode === 'dark'
    ? {
        boxShadow: '0 0 50px 25px rgba(168, 208, 240, 0.25), 0 0 100px 50px rgba(168, 208, 240, 0.12)',
      }
    : {
        boxShadow: '0 0 50px 25px rgba(255, 203, 5, 0.3), 0 0 100px 50px rgba(255, 203, 5, 0.15), 0 0 150px 75px rgba(255, 255, 255, 0.1)',
      };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '1px',
        height: '1px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'box-shadow 0.3s ease',
        willChange: 'left, top',
        ...shadowStyle,
      }}
    />
  );
};

export default CursorShadow;

