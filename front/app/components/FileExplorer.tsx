'use client';

import { useState } from 'react';
import './FileExplorer';

interface FileItem {
  name: string;
  icon: string;
  description: string;
}

interface DirectoryContent {
  folders?: string[];
  files: (string | FileItem)[];
}

type FileSystem = Record<string, DirectoryContent>;

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState('/home/dylan');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const fileSystem: FileSystem = {
    '/home/dylan': {
      folders: ['projects', 'hobbies', 'skills'],
      files: ['whoami.txt', 'readme.md'],
    },
    '/home/dylan/projects': {
      folders: [],
      files: [
        { name: 'portfolio-os.exe', icon: '💻', description: 'Interactive OS Portfolio' },
        { name: 'gta-scroll.js', icon: '🎮', description: 'GTA VI scroll effect' },
        { name: 'ecommerce.app', icon: '🛒', description: 'Full-stack e-commerce' },
      ],
    },
    '/home/dylan/hobbies': {
      folders: [],
      files: [
        { name: 'gaming.txt', icon: '🎮', description: 'Video games enthusiast' },
        { name: 'music.mp3', icon: '🎵', description: 'Music lover' },
        { name: 'travel.jpg', icon: '✈️', description: 'World explorer' },
      ],
    },
    '/home/dylan/skills': {
      folders: [],
      files: [
        { name: 'frontend.js', icon: '⚛️', description: 'React, Next.js, TypeScript' },
        { name: 'backend.py', icon: '🐍', description: 'Python, Node.js, SQL' },
        { name: 'design.fig', icon: '🎨', description: 'UI/UX, Figma' },
      ],
    },
  };

  const currentDir = fileSystem[currentPath] || { folders: [], files: [] };

  const navigateTo = (folder: string) => {
    const newPath = `${currentPath}/${folder}`;
    if (fileSystem[newPath]) {
      setCurrentPath(newPath);
      setSelectedItem(null);
    }
  };

  const goBack = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length > 2) {
      parts.pop();
      setCurrentPath('/' + parts.join('/'));
      setSelectedItem(null);
    }
  };

  return (
    <div className="file-explorer">
      <div className="explorer-nav">
        <button 
          className="nav-button" 
          onClick={goBack}
          disabled={currentPath === '/home/dylan'}
        >
          ← Back
        </button>
        <div className="current-path">{currentPath}</div>
      </div>

      <div className="explorer-content">
        <div className="file-list">
          {currentDir.folders?.map((folder, index) => (
            <div
              key={`folder-${index}`}
              className={`file-item folder ${selectedItem === folder ? 'selected' : ''}`}
              onClick={() => setSelectedItem(folder)}
              onDoubleClick={() => navigateTo(folder)}
            >
              <div className="file-icon">📁</div>
              <div className="file-name">{folder}</div>
            </div>
          ))}

          {currentDir.files?.map((file, index) => {
            const fileName = typeof file === 'string' ? file : file.name;
            const fileIcon = typeof file === 'string' ? '📄' : file.icon;
            const fileDesc = typeof file === 'string' ? '' : file.description;

            return (
              <div
                key={`file-${index}`}
                className={`file-item ${selectedItem === fileName ? 'selected' : ''}`}
                onClick={() => setSelectedItem(fileName)}
              >
                <div className="file-icon">{fileIcon}</div>
                <div className="file-info">
                  <div className="file-name">{fileName}</div>
                  {fileDesc && <div className="file-desc">{fileDesc}</div>}
                </div>
              </div>
            );
          })}
        </div>

        {selectedItem && (
          <div className="details-panel">
            <h3>Details</h3>
            <p><strong>Name:</strong> {selectedItem}</p>
            <p><strong>Location:</strong> {currentPath}</p>
          </div>
        )}
      </div>
    </div>
  );
}