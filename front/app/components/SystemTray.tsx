'use client';

import { useState, useEffect } from 'react';

export default function SystemTray() {
  const [currentTime, setCurrentTime] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle('night-mode');
      setClickCount(0); // Reset counter
      
      // Notification
      alert('🌙 Night mode ' + (!isDarkMode ? 'activated' : 'deactivated') + '!');
    }

    // Reset counter après 2 secondes
    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <div className="system-bar">
      <div className="system-bar-left">
        <span 
          className="os-icon" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💻
        </span>
        <span className="os-name">DylanOS v1.0</span>
        {clickCount > 0 && clickCount < 5 && (
          <span className="click-counter">{clickCount}/5</span>
        )}
      </div>

      <div className="system-bar-right">
        <div className="system-icons">
          <span className="system-icon" title="Network">📶</span>
          <span className="system-icon" title="Volume">🔊</span>
          <span className="system-icon" title="Battery">🔋</span>
        </div>
        <div className="system-time">
          <span className="time-display">{currentTime}</span>
          <span className="date-display">{getCurrentDate()}</span>
        </div>
      </div>
    </div>
  );
}