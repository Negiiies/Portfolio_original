'use client';

import { useState } from 'react';

export default function CV() {
  const [confettiLaunched, setConfettiLaunched] = useState(false);

  const launchConfetti = () => {
    if (confettiLaunched) return;
    
    setConfettiLaunched(true);
    const colors = ['#39ff14', '#ff073a', '#00d4ff', '#bf00ff', '#ffd700'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 6000);
    }

    setTimeout(() => setConfettiLaunched(false), 6000);
  };

  return (
    <div className="cv-container">
      <div className="cv-header">
        <h1>LE DYLAN</h1>
        <h2>Full-Stack Developer</h2>
        <p className="cv-tagline">Crafting Exceptional Digital Experiences</p>
      </div>

      <div className="cv-content">
        <section className="cv-section">
          <h3>💼 Experience</h3>
          <div className="cv-item">
            <h4>Full-Stack Developer</h4>
            <p className="cv-date">2023 - Present</p>
            <ul>
              <li>Built interactive web applications with React & Next.js</li>
              <li>Implemented complex animations with GSAP</li>
              <li>Developed responsive UI/UX designs</li>
            </ul>
          </div>
        </section>

        <section className="cv-section">
          <h3>🎓 Education</h3>
          <div className="cv-item">
            <h4>Computer Science Degree</h4>
            <p>Specialized in Web Development</p>
          </div>
        </section>

        <section className="cv-section">
          <h3>🛠️ Technical Stack</h3>
          <div className="cv-skills">
            <span className="skill-tag">React</span>
            <span className="skill-tag">Next.js</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">SQL</span>
            <span className="skill-tag">GSAP</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">PHP </span>
          </div>
        </section>

        <section className="cv-section">
          <h3>🚀 Featured Projects</h3>
          <div className="cv-item">
            <h4>Portfolio OS</h4>
            <p>Interactive portfolio designed as an operating system</p>
          </div>
          <div className="cv-item">
            <h4>GTA VI Scroll Effect</h4>
            <p>Recreation of Rockstar&apos;s cinematic scroll animation</p>
          </div>
        </section>
      </div>

      <div className="cv-footer">
        <button className="hire-button" onClick={launchConfetti}>
          🎉 HIRE DYLAN NOW! 🎊
        </button>
        <p className="cv-contact">
          📧 dylan@portfolio.dev | 🔗 github.com/ledylan
        </p>
      </div>
    </div>
  );
}