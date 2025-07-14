import React, { useEffect, useRef, useState } from 'react';

interface NotImplementedToastProps {
  show: boolean;
  onClose?: () => void;
  duration?: number; // ms
}

const ANIMATION_DURATION = 350; // ms

const NotImplementedToast: React.FC<NotImplementedToastProps> = ({ show, onClose, duration = 2500 }) => {
  const [visible, setVisible] = useState(show);
  const [animate, setAnimate] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const animationTimer = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup timers on unmount or when show changes
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, []);

  useEffect(() => {
    if (show) {
      setVisible(true);
      animationTimer.current = setTimeout(() => setAnimate(true), 10);
      hideTimer.current = setTimeout(() => {
        setAnimate(false); // Start fade out
        animationTimer.current = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, ANIMATION_DURATION);
      }, duration);
    } else {
      setAnimate(false);
      animationTimer.current = setTimeout(() => setVisible(false), ANIMATION_DURATION);
    }
    // Cleanup previous timers if show changes
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, [show, duration, onClose]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 32,
      right: 32,
      background: '#fff',
      color: '#113893',
      padding: '16px 32px',
      borderRadius: 8,
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: 1,
      transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1), opacity ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1)`,
      transform: animate ? 'translateX(0)' : 'translateX(60px)',
      opacity: animate ? 1 : 0,
      pointerEvents: animate ? 'auto' : 'none',
    }}>
      Función no implementada aún.
    </div>
  );
};

export default NotImplementedToast;
