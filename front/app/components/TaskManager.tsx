'use client';

import { useState, useEffect } from 'react';
import './TaskManager';

interface Process {
  name: string;
  status: 'running' | 'monitoring' | 'stopped';
  level: number;
}

export default function TaskManager() {
  const [processes, setProcesses] = useState<Process[]>([
    { name: 'React.js', status: 'running', level: 95 },
    { name: 'Next.js', status: 'running', level: 90 },
    { name: 'TypeScript', status: 'running', level: 85 },
    { name: 'GSAP', status: 'running', level: 80 },
    { name: 'Node.js', status: 'running', level: 85 },
    { name: 'Python', status: 'running', level: 75 },
    { name: 'SQL', status: 'running', level: 80 },
    { name: 'Git', status: 'running', level: 90 },
    { name: 'Docker', status: 'running', level: 70 },
    { name: 'Figma', status: 'running', level: 85 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses(prev =>
        prev.map(p => ({
          ...p,
          level: Math.min(100, Math.max(60, p.level + (Math.random() * 2 - 1))),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'running': return '#39ff14';
      case 'monitoring': return '#00d4ff';
      case 'stopped': return '#ff073a';
      default: return '#fff';
    }
  };

  return (
    <div className="task-manager">
      <div className="task-manager-header">
        <h2>Task Manager - Skills.exe</h2>
        <p>Monitoring Dylan&apos;s technical capabilities</p>
      </div>

      <div className="process-table">
        <div className="table-header">
          <div className="col-name">Process</div>
          <div className="col-status">Status</div>
          <div className="col-level">Proficiency</div>
        </div>

        <div className="table-body">
          {processes.map((process, index) => (
            <div key={index} className="process-row">
              <div className="col-name">
                <span className="process-icon">⚙️</span>
                {process.name}
              </div>
              <div className="col-status">
                <span
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(process.status) }}
                />
                {process.status}
              </div>
              <div className="col-level">
                <div className="level-bar-container">
                  <div
                    className="level-bar"
                    style={{ width: `${process.level}%` }}
                  />
                </div>
                <span className="level-text">{Math.round(process.level)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="task-manager-footer">
        <div className="stat">
          <span className="stat-label">Total Processes:</span>
          <span className="stat-value">{processes.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Status:</span>
          <span className="stat-value" style={{ color: '#39ff14' }}>All Systems Operational</span>
        </div>
      </div>
    </div>
  );
}