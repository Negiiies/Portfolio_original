'use client';

import { useState } from 'react';
import Window from './Window';
import Terminal from './Terminal';
import FileExplorer from './FileExplorer';
import TaskManager from './TaskManager';
import AboutMe from './AboutMe';
import CV from './CV';
import Taskbar from './Taskbar';
import SystemTray from './SystemTray';
import ReadMe from './ReadMe';
import Contact from './Contact';
import { IconMap } from './Icons';

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  component: string;
}

interface WindowState {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
  maximized: boolean;
}

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [_isLoading, setIsLoading] = useState(false);

  const desktopIcons: DesktopIcon[] = [
    { id: 'projects', name: 'Projects', icon: 'folder', component: 'FileExplorer' },
    { id: 'about', name: 'About_me.txt', icon: 'notepad', component: 'AboutMe' },
    { id: 'skills', name: 'Skills.exe', icon: 'settings', component: 'TaskManager' },
    { id: 'cv', name: 'CV.pdf', icon: 'document', component: 'CV' },
    { id: 'contact', name: 'Contact.mail', icon: 'mail', component: 'Contact' },
    { id: 'terminal', name: 'Terminal', icon: 'terminal', component: 'Terminal' },
    { id: 'secret', name: 'Secret.exe', icon: 'mystery', component: 'Secret' },
    { id: 'readme', name: 'README.md', icon: 'readme', component: 'ReadMe' },
  ];

  const openWindow = (icon: DesktopIcon) => {
    const existingWindow = windows.find(w => w.id === icon.id);
    if (existingWindow) {
      if (existingWindow.minimized) {
        restoreWindow(existingWindow.id);
      } else {
        setActiveWindow(existingWindow.id);
      }
      return;
    }

    // Animation loading
    setIsLoading(true);
    document.body.classList.add('loading');

    // Simule un délai de chargement
    setTimeout(() => {
      const newWindow: WindowState = {
        id: icon.id,
        title: icon.name,
        component: icon.component,
        position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
        size: { width: 800, height: 600 },
        minimized: false,
        maximized: false,
      };

      setWindows([...windows, newWindow]);
      setActiveWindow(newWindow.id);
      
      setIsLoading(false);
      document.body.classList.remove('loading');
    }, 300);
  };

  const closeWindow = (id: string) => {
    // Animation de fermeture
    const windowElement = document.querySelector(`[data-window-id="${id}"]`);
    windowElement?.classList.add('closing');
    
    setTimeout(() => {
      setWindows(windows.filter(w => w.id !== id));
      if (activeWindow === id) {
        const remainingWindows = windows.filter(w => w.id !== id);
        setActiveWindow(remainingWindows[remainingWindows.length - 1]?.id || null);
      }
    }, 200);
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: true } : w));
    setActiveWindow(null);
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: false } : w));
    setActiveWindow(id);
  };

  const toggleMaximize = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  };

  const renderWindowContent = (componentName: string): JSX.Element => {
    switch(componentName) {
      case 'Terminal':
        return <Terminal />;
      case 'FileExplorer':
        return <FileExplorer />;
      case 'TaskManager':
        return <TaskManager />;
      case 'AboutMe':
        return <AboutMe />;
      case 'CV':
        return <CV />;
      case 'ReadMe':
        return <ReadMe />;
      case 'Contact':
        return <Contact />;
      case 'Secret':
        return (
          <div className="window-content secret">
            🎉 Vous avez trouvé le secret ! 🎊
          </div>
        );
      default:
        return <div className="window-content">Contenu à venir...</div>;
    }
  };

  return (
    <div className="desktop">
      <div className="desktop-background">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="desktop-video"
        >
          <source src="/videos/vid.mp4" type="video/mp4" />
        </video>
      </div>

      <SystemTray />

      <div className="desktop-icons">
        {desktopIcons.map(icon => {
          const IconComponent = IconMap[icon.icon];
          
          return (
            <div
              key={icon.id}
              className="desktop-icon"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  openWindow(icon);
                }
              }}
              onDoubleClick={() => {
                if (window.innerWidth > 768) {
                  openWindow(icon);
                }
              }}
            >
              <div className="icon-image">
                {IconComponent ? <IconComponent /> : icon.icon}
              </div>
              <div className="icon-label">{icon.name}</div>
            </div>
          );
        })}
      </div>

      {windows.map(window => (
        !window.minimized && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            position={window.position}
            size={window.size}
            isActive={activeWindow === window.id}
            isMaximized={window.maximized}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => toggleMaximize(window.id)}
            onFocus={() => setActiveWindow(window.id)}
          >
            {renderWindowContent(window.component)}
          </Window>
        )
      ))}

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onWindowClick={(id: string) => {
          const window = windows.find(w => w.id === id);
          if (window?.minimized) restoreWindow(id);
          else setActiveWindow(id);
        }}
      />
    </div>
  );
}