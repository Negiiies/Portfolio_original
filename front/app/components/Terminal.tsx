'use client';

import { useState, useRef, useEffect } from 'react';

interface HistoryLine {
  type: 'input' | 'output' | 'error';
  text: string;
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: '╔═══════════════════════════════════════════════╗' },
    { type: 'output', text: '║         Welcome to DylanOS Terminal          ║' },
    { type: 'output', text: '╚═══════════════════════════════════════════════╝' },
    { type: 'output', text: '' },
    { type: 'output', text: '> System initialized successfully' },
    { type: 'output', text: '> All services running' },
    { type: 'output', text: '' },
    { type: 'output', text: '💡 Type "help" to see available commands' },
    { type: 'output', text: '🎯 Try "sudo hire dylan" for a surprise!' },
    { type: 'output', text: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, () => string[] | null> = {
    help: () => [
      'Available commands:',
      '  help        - Show this help message',
      '  about       - About Dylan',
      '  skills      - List technical skills',
      '  projects    - Show projects',
      '  contact     - Contact information',
      '  clear       - Clear terminal',
      '  coffee      - Brew some coffee ☕',
      '  konami      - Secret code 🎮',
      '  sudo hire dylan - Hire Dylan! 🎉',
      '  sudo rm -rf /   - DON\'T try this! 💀',
    ],
    about: () => [
      'LE DYLAN - Full-Stack Developer',
      'Passionate about creating immersive web experiences',
      'Specialized in React, Next.js, and modern web technologies',
      '',
      '🎯 Currently building amazing interactive portfolios',
      '🚀 Always learning new technologies',
    ],
    skills: () => [
      'Frontend: React, Next.js, TypeScript, GSAP',
      'Backend: Node.js, Python, SQL',
      'Tools: Git, Docker, Figma',
      'Currently learning: WebGL, Three.js',
      '',
      '💡 Tip: Check the Task Manager (Skills.exe) for real-time stats!',
    ],
    projects: () => [
      '1. Portfolio OS - Interactive portfolio (you are here!)',
      '2. GTA-style scroll effect - Cinematic animations',
      '3. E-commerce platform - Full-stack application',
      '',
      'Type "open <project-number>" to learn more',
      '📁 Or check the Projects folder!',
    ],
    contact: () => [
      '📧 Email: dylan@portfolio.dev',
      '🔗 GitHub: github.com/ledylan',
      '💼 LinkedIn: linkedin.com/in/ledylan',
      '',
      '💡 You can also open Contact.mail from the desktop!',
    ],
    clear: () => {
      setHistory([]);
      return null;
    },
    coffee: () => {
      launchCoffeeAnimation();
      return [
        '☕ Brewing coffee...',
        '▓▓▓▓▓▓▓▓▓▓ 100%',
        '',
        '✨ Coffee ready!',
        '💪 Energy +50%',
        '🧠 Focus +100%',
        '⚡ Dylan is now ultra-productive!',
        '',
        '(You can see coffee particles floating up! ☕)',
      ];
    },
    'sudo rm -rf /': () => {
      triggerGlitchScreen();
      return [
        '⚠️  WARNING: CRITICAL OPERATION',
        '🚨 Deleting system files...',
        '',
        '▓▓▓░░░░░░░ 30%',
        'ERROR: Permission denied',
        'ERROR: System protection active',
        'ERROR: Nice try, hacker!',
        '',
        '😅 System is protected. Phew!',
        '💡 Tip: NEVER run this on a real system!',
        '',
        '(Screen glitch effect activated for 2 seconds)',
      ];
    },
    'sudo hire dylan': () => {
      launchConfetti();
      return [
        '🎉 ACCESS GRANTED! 🎊',
        'CONFETTI.EXE LAUNCHING...',
        '✨ Congratulations! You hired Dylan! ✨',
        '',
        '📧 Sending confirmation email...',
        '✅ Dylan will contact you shortly!',
        '',
        '💼 Welcome to the team!',
        '🚀 Let\'s build amazing things together!',
      ];
    },
    konami: () => {
      triggerKonamiCode();
      return [
        '🎮 KONAMI CODE ACTIVATED!',
        '⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ 🅰️',
        '',
        '🌀 The world is spinning!',
        '✨ +30 lives',
        '🚀 Unlimited power unlocked!',
        '🎯 Achievement unlocked: "Retro Gamer"',
        '',
        '(Watch the screen spin! 🌀)',
      ];
    },
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const newHistory: HistoryLine[] = [
      ...history,
      { type: 'input', text: `Dylan@Portfolio:~$ ${cmd}` },
    ];

    if (trimmedCmd === '') {
      setHistory(newHistory);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      if (output) {
        output.forEach(line => {
          newHistory.push({ type: 'output', text: line });
        });
      }
    } else {
      newHistory.push({ 
        type: 'error', 
        text: `Command not found: ${cmd}. Type "help" for available commands.` 
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  // Coffee animation
  const launchCoffeeAnimation = () => {
    const colors = ['#8B4513', '#A0522D', '#D2691E'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'coffee-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 4000);
    }
  };

  // Glitch screen effect
  const triggerGlitchScreen = () => {
    const body = document.body;
    body.classList.add('glitch-active');
    
    setTimeout(() => {
      body.classList.remove('glitch-active');
    }, 2000);
  };

  // Konami code effect
  const triggerKonamiCode = () => {
    const body = document.body;
    body.style.transform = 'rotate(360deg)';
    body.style.transition = 'transform 2s ease';
    
    setTimeout(() => {
      body.style.transform = 'rotate(0deg)';
    }, 2000);
  };

  // Confetti animation
  const launchConfetti = () => {
    const colors = ['#39ff14', '#ff073a', '#00d4ff', '#bf00ff', '#ffd700'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {history.map((line, index) => (
          <div 
            key={index} 
            className={`terminal-line ${line.type}`}
          >
            {line.text}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="terminal-prompt">Dylan@Portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}