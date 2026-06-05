'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

/* ── Data ── */
const PROJECTS_BASE = [
  { title: 'SaaS Gamification', sub: 'Next.js · Node.js · Multi-tenant', badge: 'PROD',    desc: 'Roues de la fortune\npour gamifier les avis Google.',               color: '#22c55e', link: 'https://ryturn.fr/',                  image: '/images/projects/saas.jpg'    },
  { title: 'Bel Institut',      sub: 'Next.js · React · TypeScript',     badge: 'LIVE',    desc: 'Institut de maquillage permanent.\nDesign élégant, réservation.',   color: '#ec4899', link: 'https://belmaquillagepermanent.fr/', image: '/images/projects/bel.jpg'     },
  { title: 'App École 89',      sub: 'React · Symfony · PHP · SQL',      badge: 'INTERNE', desc: 'Suivi pédagogique, présences\net notes — sécurité by design.',       color: '#3b82f6',                                              image: '/images/projects/ecole89.jpg' },
  { title: 'Jeu Alibi',         sub: 'Three.js · WebGL · Node.js',       badge: 'WIP',     desc: "Jeu d'enquête multijoueur 3D.\nDeux suspects, un inspecteur.",       color: '#f97316',                                              image: '/images/projects/alibi.jpg'   },
  { title: 'K-Shop',            sub: 'React · Express · PostgreSQL',     badge: 'WIP',     desc: 'E-commerce produits coréens.\nCatalogue, panier, paiement sécurisé.', color: '#a855f7',                                              image: '/images/projects/kshop.jpg'   },
];

type ProjectBase = typeof PROJECTS_BASE[0];

// Y=0.7 → écran centré au-dessus du socle, rot_x=-0.18 → incliné vers le visiteur
const DESKTOP_POS: Array<{ pos: [number,number,number]; rot: [number,number,number] }> = [
  { pos: [-2.5, 0.7,  -4], rot: [-0.18,  0.22, 0] },
  { pos: [ 2.5, 0.7,  -7], rot: [-0.18, -0.22, 0] },
  { pos: [-2.5, 0.7, -10], rot: [-0.18,  0.22, 0] },
  { pos: [ 2.5, 0.7, -13], rot: [-0.18, -0.22, 0] },
  { pos: [-2.5, 0.7, -16], rot: [-0.18,  0.22, 0] },
];

const MOBILE_POS: Array<{ pos: [number,number,number]; rot: [number,number,number] }> = [
  { pos: [0, 0.7,  -3.5], rot: [-0.18, 0, 0] },
  { pos: [0, 0.7,  -7.0], rot: [-0.18, 0, 0] },
  { pos: [0, 0.7, -10.5], rot: [-0.18, 0, 0] },
  { pos: [0, 0.7, -14.0], rot: [-0.18, 0, 0] },
  { pos: [0, 0.7, -17.5], rot: [-0.18, 0, 0] },
];

/* ── Canvas overlay ── */
function makeOverlayTexture(project: ProjectBase): THREE.CanvasTexture {
  const W = 512; const H = 320;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(4,3,2,0.3)');
  grad.addColorStop(0.55, 'rgba(4,3,2,0.1)');
  grad.addColorStop(1, 'rgba(4,3,2,0.92)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.font = 'bold 13px monospace';
  const badgeW = ctx.measureText('● ' + project.badge).width + 28;
  ctx.fillStyle = project.color + 'dd';
  roundRect(ctx, 16, 16, badgeW, 26, 13);
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  ctx.fillText('● ' + project.badge, 28, 33);

  ctx.font = 'bold 34px Arial Black, sans-serif';
  ctx.fillStyle = '#f5f0e8';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 12;
  ctx.fillText(project.title, W / 2, H - 72);

  ctx.font = 'italic 14px Georgia, serif';
  ctx.fillStyle = project.color;
  ctx.shadowBlur = 4;
  ctx.fillText(project.sub, W / 2, H - 46);

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(212,175,55,0.5)';
  ctx.fillRect(W / 2 - 60, H - 34, 120, 1);

  ctx.font = '12px Georgia, serif';
  ctx.fillStyle = 'rgba(245,240,232,0.7)';
  project.desc.split('\n').forEach((line: string, i: number) => ctx.fillText(line, W / 2, H - 20 + i * 15));

  return new THREE.CanvasTexture(c);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r); ctx.closePath(); ctx.fill();
}

function makeMarbleTexture(): THREE.CanvasTexture {
  const W = 512; const H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#16120e';
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, 0);
    ctx.bezierCurveTo(Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H, Math.random() * W, H);
    ctx.strokeStyle = `rgba(${180 + Math.random() * 40},${160 + Math.random() * 30},${120 + Math.random() * 20},${0.04 + Math.random() * 0.05})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
    ctx.stroke();
  }
  const tileSize = W / 4;
  ctx.strokeStyle = 'rgba(212,175,55,0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += tileSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += tileSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  return new THREE.CanvasTexture(c);
}

function addGoldFrame(group: THREE.Group, W: number, H: number) {
  const t = 0.07; const d = 0.05;
  const gold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.25 });
  [
    { w: W + t * 2, h: t, x: 0,          y: H / 2 + t / 2  },
    { w: W + t * 2, h: t, x: 0,          y: -H / 2 - t / 2 },
    { w: t,         h: H, x: -W / 2 - t / 2, y: 0          },
    { w: t,         h: H, x:  W / 2 + t / 2, y: 0          },
  ].forEach(({ w, h, x, y }) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), gold);
    mesh.position.set(x, y, -0.01);
    group.add(mesh);
  });
}

/* ── HUD ── */
function HUD({ active }: { active: number }) {
  const p = PROJECTS_BASE[Math.max(0, Math.min(PROJECTS_BASE.length - 1, active))];
  return (
    <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '14px 5vw 18px',
        background: 'linear-gradient(to top, rgba(4,3,2,0.95) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: '18px', pointerEvents: 'none' }}
    >
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.color, boxShadow: `0 0 10px ${p.color}`, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: '0.85rem', color: '#f5f0e8', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.62rem', color: p.color, marginTop: 2, opacity: 0.85 }}>{p.sub}</div>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {PROJECTS_BASE.map((_, i) => (
          <div key={i} style={{ width: i === active ? '18px' : '5px', height: '5px', borderRadius: '999px',
            background: i === active ? '#d4af37' : 'rgba(212,175,55,0.15)', transition: 'width 0.3s',
            boxShadow: i === active ? '0 0 6px #d4af3788' : 'none' }} />
        ))}
      </div>
      {'link' in p && (p as ProjectBase & { link: string }).link && (
        <a href={(p as ProjectBase & { link: string }).link} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.72rem', fontWeight: 600,
            color: '#d4af37', textDecoration: 'none', pointerEvents: 'auto',
            padding: '6px 14px', borderRadius: '2px',
            border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.06)', flexShrink: 0 }}>
          Voir →
        </a>
      )}
    </motion.div>
  );
}

/* ── Root ── */
export default function Projects() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const mountRef  = useRef<HTMLDivElement>(null);
  const titleRef  = useRef<HTMLDivElement>(null);
  const inView    = useInView(titleRef, { once: true });
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const layout = mobile ? MOBILE_POS : DESKTOP_POS;

    const PROJECTS = PROJECTS_BASE.map((p, i) => ({ ...p, ...layout[i] }));

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: false });
    renderer.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x060401);
    if (!mobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x060401, mobile ? 10 : 14, mobile ? 22 : 28);

    const camera = new THREE.PerspectiveCamera(
      mobile ? 72 : 62,
      mount.clientWidth / mount.clientHeight, 0.1, 60
    );
    camera.position.set(0, 1.1, 3);

    /* Lights */
    scene.add(new THREE.AmbientLight(0xfff5e0, mobile ? 0.3 : 0.18));
    const ceilLight = new THREE.DirectionalLight(0xffecc0, 0.35);
    ceilLight.position.set(0, 8, -5);
    scene.add(ceilLight);

    /* Floor */
    const marbleTex = makeMarbleTexture();
    marbleTex.wrapS = marbleTex.wrapT = THREE.RepeatWrapping;
    marbleTex.repeat.set(mobile ? 4 : 8, 14);
    const floorW = mobile ? 8 : 16;
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(floorW, 30),
      new THREE.MeshStandardMaterial({ map: marbleTex, roughness: 0.7, metalness: 0.1, color: 0xb8a890 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.25, -8);
    floor.receiveShadow = true;
    scene.add(floor);

    /* Ceiling */
    const ceil = new THREE.Mesh(
      new THREE.PlaneGeometry(floorW, 30),
      new THREE.MeshStandardMaterial({ color: 0x100d08, roughness: 1 })
    );
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, 4.5, -8);
    scene.add(ceil);

    /* Walls */
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1a1510, roughness: 0.95 });
    const wallX = mobile ? 3.5 : 6.5;
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });
    [-wallX, wallX].forEach(x => {
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(30, 8), wallMat);
      wall.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
      wall.position.set(x, 1.75, -8);
      scene.add(wall);
      const wain = new THREE.Mesh(new THREE.PlaneGeometry(30, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x2a2218, roughness: 0.8 }));
      wain.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
      wain.position.set(x * 0.998, -0.85, -8);
      scene.add(wain);
      const base = new THREE.Mesh(new THREE.PlaneGeometry(30, 0.04), goldMat);
      base.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
      base.position.set(x * 0.996, -0.46, -8);
      scene.add(base);
    });

    /* Back wall */
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(floorW, 8), wallMat);
    backWall.position.set(0, 1.75, -22);
    scene.add(backWall);

    /* Columns — desktop only */
    if (!mobile) {
      const colMat = new THREE.MeshStandardMaterial({ color: 0x2a2218, metalness: 0.15, roughness: 0.85 });
      const capMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.3 });
      [-5.2, 5.2].forEach(x => {
        [-1, -5, -9, -13, -17].forEach(z => {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 5.7, 10), colMat);
          col.position.set(x, 1.6, z); col.castShadow = true; scene.add(col);
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.6), capMat);
          cap.position.set(x, 4.4, z); scene.add(cap);
          const base2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.55), capMat);
          base2.position.set(x, -1.18, z); scene.add(base2);
        });
      });
      const corniceMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.35 });
      [-6.0, 6.0].forEach(x => {
        const cornice = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 30), corniceMat);
        cornice.position.set(x, 4.3, -8); scene.add(cornice);
      });
    }

    /* Dust */
    const dustN = mobile ? 80 : 180;
    const dustPos = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * (mobile ? 6 : 12);
      dustPos[i * 3 + 1] = Math.random() * 4;
      dustPos[i * 3 + 2] = Math.random() * -22 + 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(dustGeo,
      new THREE.PointsMaterial({ color: 0xffecc0, size: 0.015, transparent: true, opacity: 0.5, sizeAttenuation: true }));
    scene.add(dust);

    /* Screens */
    const PW = mobile ? 2.0 : 2.5;
    const PH = mobile ? 1.26 : 1.58;
    const loader = new THREE.TextureLoader();
    const screenGroups: THREE.Group[] = [];
    const spotLights: THREE.SpotLight[] = [];

    PROJECTS.forEach((proj, i) => {
      const group = new THREE.Group();
      group.position.set(proj.pos[0], proj.pos[1], proj.pos[2]);
      group.rotation.set(proj.rot[0], proj.rot[1], proj.rot[2]);

      const imgMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.2 });
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), imgMat);
      panel.userData = { link: (proj as ProjectBase & { link?: string }).link, index: i };
      panel.castShadow = !mobile;
      group.add(panel);

      loader.load(proj.image, (tex) => { imgMat.map = tex; imgMat.color.set(0xffffff); imgMat.needsUpdate = true; });

      const overlay = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH),
        new THREE.MeshBasicMaterial({ map: makeOverlayTexture(proj), transparent: true, opacity: 1, depthWrite: false }));
      overlay.position.z = 0.003;
      group.add(overlay);

      addGoldFrame(group, PW, PH);

      // ── Socle de musée ──
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x2a2218, roughness: 0.85, metalness: 0.05 });
      const goldAccent = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 });

      // Chapeau du socle (top cap)
      const capTop = new THREE.Mesh(new THREE.BoxGeometry(PW * 0.7, 0.06, 0.38), stoneMat);
      capTop.position.set(0, -PH / 2 - 0.06, -0.12);
      group.add(capTop);

      // Moulure dorée sous le chapeau
      const moulure = new THREE.Mesh(new THREE.BoxGeometry(PW * 0.7, 0.03, 0.38), goldAccent);
      moulure.position.set(0, -PH / 2 - 0.10, -0.12);
      group.add(moulure);

      // Fût (colonne centrale)
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(PW * 0.48, 1.15, 0.3), stoneMat);
      shaft.position.set(0, -PH / 2 - 0.68, -0.12);
      group.add(shaft);

      // Plaquette gravée sur le fût
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(PW * 0.36, 0.18, 0.025), goldAccent);
      plaque.position.set(0, -PH / 2 - 0.68, 0.16);
      group.add(plaque);

      // Moulure dorée au bas du fût
      const moulureBase = new THREE.Mesh(new THREE.BoxGeometry(PW * 0.55, 0.03, 0.35), goldAccent);
      moulureBase.position.set(0, -PH / 2 - 1.27, -0.12);
      group.add(moulureBase);

      // Base large (pied)
      const base = new THREE.Mesh(new THREE.BoxGeometry(PW * 0.65, 0.09, 0.44), stoneMat);
      base.position.set(0, -PH / 2 - 1.33, -0.12);
      group.add(base);

      scene.add(group);
      screenGroups.push(group);

      const spotColor = new THREE.Color(proj.color).lerp(new THREE.Color(0xfff5e0), 0.65);
      const spot = new THREE.SpotLight(spotColor, mobile ? 4.5 : 4, 12, Math.PI / 6, 0.4, 1.1);
      spot.position.set(proj.pos[0] * 0.4, 4.2, proj.pos[2] + 1.5);
      spot.target.position.set(proj.pos[0], proj.pos[1] - 0.5, proj.pos[2]);
      if (!mobile) { spot.castShadow = true; spot.shadow.mapSize.width = 512; spot.shadow.mapSize.height = 512; }
      scene.add(spot); scene.add(spot.target);
      spotLights.push(spot);
    });

    /* Interaction */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredIdx = -1;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      const rect = mount.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(screenGroups.map(g => g.children[0]));
      if (hits.length > 0) {
        const link = hits[0].object.userData.link;
        if (link) window.open(link, '_blank');
      }
    };
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('touchmove', onTouch, { passive: true });
    mount.addEventListener('click', onClick);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    /* Animation */
    const camPos = { x: 0, y: 1.1, z: 3 };
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = scrollRef.current;
      const now = Date.now();

      const tgtZ = 3 - t * (mobile ? 19 : 18);
      const tgtX = mobile ? 0 : Math.sin(t * Math.PI) * 0.6;
      const tgtY = 1.1 + Math.sin(t * Math.PI * 0.5) * 0.12;
      camPos.x += (tgtX - camPos.x) * 0.05;
      camPos.y += (tgtY - camPos.y) * 0.05;
      camPos.z += (tgtZ - camPos.z) * 0.05;
      camera.position.set(camPos.x, camPos.y, camPos.z);
      camera.lookAt(camPos.x * 0.4, camPos.y * 0.9, camPos.z - 8);

      if (!mobile) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(screenGroups.map(g => g.children[0]));
        const newHover = hits.length > 0 ? (hits[0].object.userData.index ?? -1) : -1;
        if (newHover !== hoveredIdx) {
          document.body.style.cursor = newHover >= 0 ? 'pointer' : 'default';
          hoveredIdx = newHover;
        }
      }

      spotLights.forEach((spot, i) => {
        const base = mobile ? 4 : 3.5;
        spot.intensity += ((i === hoveredIdx ? base * 1.6 : base) - spot.intensity) * 0.08;
      });

      screenGroups.forEach((group, i) => {
        group.position.y = PROJECTS[i].pos[1] + Math.sin(now * 0.0007 + i * 1.8) * 0.025;
      });

      dust.rotation.y += 0.00015;
      dust.position.y = Math.sin(now * 0.0002) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('touchmove', onTouch);
      mount.removeEventListener('click', onClick);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      document.body.style.cursor = 'default';
    };
  }, [mobile]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const fn = () => {
      const t = Math.max(0, Math.min(1, -outer.getBoundingClientRect().top / (outer.offsetHeight - window.innerHeight)));
      scrollRef.current = t;
      setActive(Math.min(PROJECTS_BASE.length - 1, Math.floor(t * PROJECTS_BASE.length)));
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div ref={outerRef} id="projets" style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#060401' }}>
        <div ref={titleRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: `${mobile ? '56px' : 'clamp(18px,4vh,42px)'} 6vw 0`, pointerEvents: 'none' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3d3320', fontSize: '0.75rem', letterSpacing: '0.15em', margin: 0 }}>{'< 02 />'}</p>
            <h2 style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1, margin: 0, letterSpacing: '-0.04em' }}>Projets</h2>
            <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.75rem', color: '#4a3f2a' }}>Galerie · {PROJECTS_BASE.length} œuvres</span>
          </motion.div>
        </div>
        <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
        <HUD active={active} />
      </div>
    </div>
  );
}
