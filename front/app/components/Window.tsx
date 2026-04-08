'use client';

import { useRef, useEffect, useState } from 'react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isActive: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}

export default function Window({
  id,
  title,
  children,
  position,
  size,
  isActive,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    
    onFocus();
    setIsDragging(true);
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Limites de l'écran
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height;

      setCurrentPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, size, isMaximized]);

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 80px)',
        transition: 'all 0.2s ease',
      }
    : {
        top: currentPosition.y,
        left: currentPosition.x,
        width: size.width,
        height: size.height,
        transition: isDragging ? 'none' : 'all 0.2s ease',
      };

  return (
    <div
      ref={windowRef}
      className={`window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={windowStyle}
      onClick={onFocus}
      data-window-id={id}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button className="window-button minimize" onClick={onMinimize}>
            −
          </button>
          <button className="window-button maximize" onClick={onMaximize}>
            {isMaximized ? '❐' : '□'}
          </button>
          <button className="window-button close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}