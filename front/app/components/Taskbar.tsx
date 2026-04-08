'use client';

interface WindowState {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
  maximized: boolean;
}

interface TaskbarProps {
  windows: WindowState[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
}

export default function Taskbar({ windows, activeWindow, onWindowClick }: TaskbarProps) {
  return (
    <div className="taskbar">
      <div className="taskbar-start">
        <div className="start-button">
          <span className="start-icon">💻</span>
          <span className="start-text">LE DYLAN</span>
        </div>
      </div>

      <div className="taskbar-windows">
        {windows.map(window => (
          <button
            key={window.id}
            className={`taskbar-window ${activeWindow === window.id ? 'active' : ''}`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="window-icon">
              {window.component === 'Terminal' ? '💻' :
               window.component === 'FileExplorer' ? '📁' :
               window.component === 'TaskManager' ? '⚙️' :
               window.component === 'AboutMe' ? '📄' :
               window.component === 'CV' ? '📋' :
               window.component === 'Contact' ? '✉️' : '❓'}
            </span>
            <span className="window-title-taskbar">{window.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}