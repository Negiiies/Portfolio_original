'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { marbleBg, marbleBorder, marbleShadow, CRACKS } from './MarbleCard';

interface FormData { name: string; email: string; subject: string; message: string; }

const LINKS = [
  { label: 'Email',        value: 'Dylanle372@gmail.com', href: 'mailto:Dylanle372@gmail.com' },
  { label: 'GitHub',       value: 'github.com/Negiiies',  href: 'https://github.com/Negiiies' },
  { label: 'Localisation', value: 'Île de France',        href: undefined },
  { label: 'Disponibilité',value: 'Maintenant · Alternance', href: undefined },
];

const FIELDS = [
  { id: 'name',    label: 'Nom',   type: 'text',  placeholder: 'Votre nom' },
  { id: 'email',   label: 'Email', type: 'email', placeholder: 'votre@email.com' },
  { id: 'subject', label: 'Sujet', type: 'text',  placeholder: 'Objet du message' },
];

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
      const res  = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) setSuccess(true); else setError('Une erreur est survenue.');
    } catch { setError('Impossible de contacter le serveur.'); }
    finally { setLoading(false); }
  };

  const fieldBase: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(212,175,55,0.18)',
    borderRadius: '10px', padding: '12px 16px',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '0.9375rem', color: '#e2e8f0',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: '#000', padding: '120px 6vw', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem', color: '#64748b', letterSpacing: '0.15em', marginBottom: '14px' }}>
            {'< 05 />'}
          </p>
          <h2 style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-0.04em', lineHeight: 1, margin: 0,
          }}>
            Travaillons<br />
            <span style={{ color: '#d4af37' }}>ensemble.</span>
          </h2>
          <div style={{ marginTop: '20px', height: '2px', width: '48px', borderRadius: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: '#64748b', lineHeight: 1.8, margin: '0 0 48px' }}>
              Je suis disponible pour une alternance en cybersécurité ou des projets freelance.
              Contactez-moi directement ou remplissez le formulaire.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {LINKS.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    gap: '16px', padding: '18px 0',
                    borderBottom: '1px solid rgba(212,175,55,0.07)',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
                    {link.label}
                  </span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', textAlign: 'right' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#94a3b8', textAlign: 'right' }}>{link.value}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Marble form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {success ? (
              <div style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: '20px', background: marbleBg,
                border: '1px solid rgba(16,185,129,0.3)', boxShadow: marbleShadow,
                padding: '56px 40px', textAlign: 'center',
              }}>
                {CRACKS[0]}
                <div style={{ position: 'relative' }}>
                  <div style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: '3rem', color: '#10b981', marginBottom: '16px' }}>✓</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#10b981', fontWeight: 600 }}>Message envoyé !</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#475569', marginTop: '8px' }}>Je vous répondrai sous 48h.</p>
                </div>
              </div>
            ) : (
              <div style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: '20px', background: marbleBg,
                border: marbleBorder, boxShadow: marbleShadow,
              }}>
                {CRACKS[0]}
                <form onSubmit={handleSubmit} style={{ position: 'relative', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {FIELDS.map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={`c-${id}`} style={{
                        display: 'block', marginBottom: '8px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.65rem', color: '#4a3f1a',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>
                        {label}
                      </label>
                      <input
                        id={`c-${id}`} type={type} name={id}
                        value={formData[id as keyof FormData]}
                        onChange={handleChange}
                        required placeholder={placeholder}
                        style={fieldBase}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)')}
                        onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)')}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="c-message" style={{
                      display: 'block', marginBottom: '8px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem', color: '#4a3f1a',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      Message
                    </label>
                    <textarea
                      id="c-message" name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required placeholder="Votre message..." rows={5}
                      style={{ ...fieldBase, resize: 'none' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)')}
                      onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)')}
                    />
                  </div>

                  {error && (
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#ef4444',
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: '8px', padding: '10px 14px', margin: 0,
                    }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit" disabled={loading}
                    style={{
                      width: '100%', padding: '14px',
                      background: loading ? 'rgba(212,175,55,0.3)' : 'linear-gradient(90deg, #b8860b, #ffd700, #d4af37)',
                      border: 'none', borderRadius: '10px',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: 700,
                      color: '#0a0800', cursor: loading ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.02em',
                      boxShadow: '0 0 24px rgba(212,175,55,0.25)',
                      transition: 'box-shadow 0.2s, opacity 0.2s',
                    }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(212,175,55,0.45)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(212,175,55,0.25)'; }}
                  >
                    {loading ? 'Envoi…' : 'Envoyer le message'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
