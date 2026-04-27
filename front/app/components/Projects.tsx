'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

/* ── Data ── */
const PROJECTS = [
  {
    title: 'SaaS\nGamification',
    sub: 'Next.js · Node.js · Multi-tenant',
    badge: 'PROD',
    desc: 'Roues de la fortune pour gamifier\nles avis Google restaurants.',
    color: '#22c55e',
    link: 'https://ryturn.fr/',
    pos: [-4, 0.4, -3] as [number, number, number],
    rot: [0, 0.5, 0] as [number, number, number],
  },
  {
    title: 'Bel Institut',
    sub: 'Next.js · React · TypeScript',
    badge: 'LIVE',
    desc: 'Institut de maquillage permanent.\nDesign élégant, réservation en ligne.',
    color: '#ec4899',
    link: 'https://belmaquillagepermanent.fr/',
    pos: [-1.5, 0.6, -6] as [number, number, number],
    rot: [0, 0.12, 0] as [number, number, number],
  },
  {
    title: 'App\nÉcole 89',
    sub: 'React · Symfony · PHP · SQL',
    badge: 'INTERNE',
    desc: 'Suivi pédagogique, présences\net notes — sécurité by design.',
    color: '#3b82f6',
    pos: [1.8, 0.2, -9] as [number, number, number],
    rot: [0, -0.18, 0] as [number, number, number],
  },
  {
    title: 'Jeu Alibi',
    sub: 'Three.js · WebGL · Node.js',
    badge: 'WIP',
    desc: "Jeu d'enquête multijoueur 3D.\nDeux suspects, un inspecteur.",
    color: '#f97316',
    pos: [4.5, 0.5, -5] as [number, number, number],
    rot: [0, -0.52, 0] as [number, number, number],
  },
  {
    title: 'K-Shop',
    sub: 'React · Express · PostgreSQL',
    badge: 'WIP',
    desc: 'E-commerce produits coréens.\nCatalogue, panier, paiement sécurisé.',
    color: '#a855f7',
    pos: [0.5, 0.8, -13] as [number, number, number],
    rot: [0, -0.06, 0] as [number, number, number],
  },
];

/* ── Single floating screen ── */
function Screen({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const groupRef  = useRef<THREE.Group>(null);
  const lightRef  = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const w = 2.6; const h = 1.6;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = project.pos[1] + Math.sin(Date.now() * 0.001 + index * 1.3) * 0.07;
    if (lightRef.current) {
      lightRef.current.intensity = hovered
        ? 3 + Math.sin(Date.now() * 0.004) * 0.6
        : 1 + Math.sin(Date.now() * 0.002 + index) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={project.pos} rotation={project.rot}>
      <pointLight ref={lightRef} color={project.color} intensity={1} distance={5} />

      {/* Screen panel */}
      <mesh
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() =>  { setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={() => project.link && window.open(project.link, '_blank')}
      >
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          color="#080808"
          emissive={new THREE.Color(project.color)}
          emissiveIntensity={hovered ? 0.18 : 0.06}
          roughness={0.15} metalness={0.9}
        />
      </mesh>

      {/* Glowing border */}
      <mesh>
        <planeGeometry args={[w + 0.05, h + 0.05]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={hovered ? 0.25 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Badge */}
      <Text position={[-w / 2 + 0.18, h / 2 - 0.18, 0.01]} fontSize={0.09}
        color={project.color} anchorX="left" letterSpacing={0.12}
        outlineWidth={0} font={undefined}>
        {`● ${project.badge}`}
      </Text>

      {/* Title */}
      <Text position={[0, h / 2 - 0.52, 0.01]} fontSize={0.21}
        color="#f1f5f9" anchorX="center" maxWidth={w - 0.3}
        lineHeight={1.2} letterSpacing={-0.02} font={undefined}>
        {project.title}
      </Text>

      {/* Sub */}
      <Text position={[0, h / 2 - 0.95, 0.01]} fontSize={0.085}
        color={project.color} anchorX="center" fillOpacity={0.75}
        letterSpacing={0.04} font={undefined}>
        {project.sub}
      </Text>

      {/* Divider */}
      <mesh position={[0, 0.08, 0.01]}>
        <planeGeometry args={[w - 0.5, 0.004]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.2} />
      </mesh>

      {/* Description */}
      <Text position={[0, -0.22, 0.01]} fontSize={0.095}
        color="#94a3b8" anchorX="center" maxWidth={w - 0.4}
        textAlign="center" lineHeight={1.55} font={undefined}>
        {project.desc}
      </Text>

      {/* CTA */}
      {project.link && (
        <Text position={[0, -h / 2 + 0.22, 0.01]} fontSize={0.1}
          color={project.color} anchorX="center" letterSpacing={0.08} font={undefined}>
          {'↗  VOIR LE PROJET'}
        </Text>
      )}

      {/* Wire */}
      <mesh position={[0, h / 2 + 0.45, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.9, 4]} />
        <meshStandardMaterial color="#1e293b" metalness={1} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ── Gold dust particles ── */
function Dust() {
  const ref = useRef<THREE.Points>(null);
  const n = 250;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 22;
    pos[i*3+1] = Math.random() * 7 - 0.5;
    pos[i*3+2] = Math.random() * -20;
  }
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0003; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d4af37" size={0.025} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

/* ── Floor grid ── */
function Floor() {
  return (
    <gridHelper args={[40, 40, '#1a1a1a', '#111111']} position={[0, -1.1, -8]} />
  );
}

/* ── Camera driven by ScrollControls ── */
function Rig() {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    const t = scroll.offset;
    camera.position.z += (3 - t * 15 - camera.position.z) * 0.06;
    camera.position.x += (Math.sin(t * Math.PI * 0.7) * 1.2 - camera.position.x) * 0.06;
    camera.position.y += (1.2 + Math.sin(t * Math.PI * 0.5) * 0.3 - camera.position.y) * 0.06;
    camera.lookAt(new THREE.Vector3(camera.position.x * 0.3, 0.4, camera.position.z - 10));
  });

  return null;
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      <color attach="background" args={['#030303']} />
      <fog attach="fog" args={['#030303', 10, 24]} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 2]} intensity={0.25} color="#e2e8f0" />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#d4af37" distance={20} />
      <Rig />
      <Floor />
      <Dust />
      {PROJECTS.map((p, i) => <Screen key={p.title} project={p} index={i} />)}
    </>
  );
}

/* ── HUD overlay ── */
function HUD({ active }: { active: number }) {
  const p = PROJECTS[Math.max(0, Math.min(PROJECTS.length - 1, active))];
  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: '14px 5vw 18px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: '18px',
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, boxShadow: `0 0 10px ${p.color}`, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: '0.85rem', color: '#f1f5f9', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {p.title.replace('\n', ' ')}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: p.color, marginTop: 2, opacity: 0.8 }}>{p.sub}</div>
      </div>
      <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
        {PROJECTS.map((proj, i) => (
          <div key={i} style={{
            width: i === active ? '18px' : '5px', height: '5px',
            borderRadius: '999px',
            background: i === active ? proj.color : 'rgba(255,255,255,0.08)',
            transition: 'width 0.3s, background 0.3s',
            boxShadow: i === active ? `0 0 6px ${proj.color}88` : 'none',
          }} />
        ))}
      </div>
      {p.link && (
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600,
            color: p.color, textDecoration: 'none', pointerEvents: 'auto',
            padding: '6px 14px', borderRadius: '999px',
            border: `1px solid ${p.color}44`, background: `${p.color}11`,
            flexShrink: 0,
          }}
        >
          Voir →
        </a>
      )}
    </motion.div>
  );
}

/* ── Root ── */
export default function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(titleRef, { once: true });
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768));
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const fn = () => {
      const t = Math.max(0, Math.min(1, -outer.getBoundingClientRect().top / (outer.offsetHeight - window.innerHeight)));
      setActive(Math.min(PROJECTS.length - 1, Math.floor(t * PROJECTS.length)));
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div ref={outerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#030303' }}>

        {/* Header */}
        <div ref={titleRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: 'clamp(22px,4vh,42px) 6vw 0', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}
          >
            <p style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3d3320', fontSize: '0.75rem', letterSpacing: '0.15em', margin: 0 }}>{'< 02 />'}</p>
            <h2 style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: '#f1f5f9', lineHeight: 1, margin: 0, letterSpacing: '-0.04em' }}>
              Projets
            </h2>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#334155', letterSpacing: '0.06em' }}>
              {PROJECTS.length} projets · scroll →
            </span>
          </motion.div>
        </div>

        {/* 3D */}
        <Canvas
          camera={{ position: [0, 1.2, 3], fov: 65, near: 0.1, far: 60 }}
          dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
          gl={{ antialias: true, alpha: false }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={5} damping={0.25}>
              <Scene />
            </ScrollControls>
          </Suspense>
        </Canvas>

        <HUD active={active} />
      </div>
    </div>
  );
}
