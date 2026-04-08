'use client';

export default function ReadMe() {
  return (
    <div className="readme-container">
      <div className="readme-header">
        <h1>📘 README.md</h1>
        <p className="readme-subtitle">Portfolio OS - Technical Documentation</p>
      </div>

      <div className="readme-content">
        <section className="readme-section">
          <h2>🛠️ Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <div>
                <strong>React 18</strong>
                <p>UI Components</p>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-icon">▲</span>
              <div>
                <strong>Next.js 14</strong>
                <p>Framework</p>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-icon">📘</span>
              <div>
                <strong>TypeScript</strong>
                <p>Type Safety</p>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎨</span>
              <div>
                <strong>CSS3</strong>
                <p>Styling & Animations</p>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎬</span>
              <div>
                <strong>GSAP</strong>
                <p>Advanced Animations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="readme-section">
          <h2>✨ Features Implemented</h2>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">✅</span>
              <strong>Window Manager System</strong> - Draggable, resizable, minimize/maximize
            </li>
            <li>
              <span className="feature-icon">✅</span>
              <strong>Custom Terminal</strong> - Interactive command-line interface
            </li>
            <li>
              <span className="feature-icon">✅</span>
              <strong>File Explorer</strong> - Navigation system with folder structure
            </li>
            <li>
              <span className="feature-icon">✅</span>
              <strong>Task Manager</strong> - Real-time skills monitoring
            </li>
            <li>
              <span className="feature-icon">✅</span>
              <strong>Responsive Design</strong> - Mobile & desktop optimized
            </li>
            <li>
              <span className="feature-icon">✅</span>
              <strong>State Management</strong> - Complex UI interactions
            </li>
          </ul>
        </section>

        <section className="readme-section">
          <h2>🎯 Key Implementations</h2>
          <div className="code-block">
            <div className="code-header">
              <span>TypeScript Interface</span>
            </div>
            <pre>{`interface WindowState {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
  maximized: boolean;
}`}</pre>
          </div>
        </section>

        <section className="readme-section">
          <h2>🚀 Performance</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">100%</div>
              <div className="stat-label">TypeScript</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">60 FPS</div>
              <div className="stat-label">Animations</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">8</div>
              <div className="stat-label">Components</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Responsive</div>
              <div className="stat-label">All Devices</div>
            </div>
          </div>
        </section>

        <section className="readme-section">
          <h2>📦 Project Structure</h2>
          <div className="code-block">
            <pre>{`src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Desktop.tsx      # Main OS interface
│   ├── Window.tsx       # Window manager
│   ├── Terminal.tsx     # Interactive terminal
│   ├── FileExplorer.tsx # File navigation
│   ├── TaskManager.tsx  # Skills display
│   └── ...
└── public/
    └── videos/          # Background assets`}</pre>
          </div>
        </section>

        <section className="readme-section">
          <h2>🎮 Easter Eggs</h2>
          <p className="readme-hint">
            💡 Try typing <code>sudo hire dylan</code> in the terminal...
          </p>
        </section>
      </div>
    </div>
  );
}