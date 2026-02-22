import { useRef, useEffect } from 'react';

/**
 * Full-page canvas particle network.
 * - Nodes drift slowly with organic motion
 * - Nearby nodes are connected with fading lines
 * - Scroll velocity accelerates particles (transit feel during parallax)
 * - Music energy pulses nearby particles when audio is playing
 */
export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    let particles = [];
    let animId = null;
    let scrollY = 0;
    let prevScrollY = 0;
    let scrollVel = 0;

    const isMobile = window.innerWidth < 640;
    const PARTICLE_COUNT = isMobile ? 30 : 80;
    const CONNECTION_DIST = isMobile ? 120 : 180;
    const BASE_SPEED = 0.3;

    // Shape types with rarity weights (higher = more common)
    const SHAPE_POOL = [
      { type: 'circle', weight: 40 },
      { type: 'triangle', weight: 15 },
      { type: 'diamond', weight: 12 },
      { type: 'pentagon', weight: 8 },
      { type: 'hexagon', weight: 5 },
      { type: 'star', weight: 2 },
    ];
    const totalWeight = SHAPE_POOL.reduce((s, p) => s + p.weight, 0);
    function pickShape() {
      let r = Math.random() * totalWeight;
      for (const s of SHAPE_POOL) {
        r -= s.weight;
        if (r <= 0) return s.type;
      }
      return 'circle';
    }

    // Draw a polygon with n sides, centered at (x,y), radius r, rotated by angle
    function drawPolygon(ctx, x, y, r, sides, angle) {
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const a = (i / sides) * Math.PI * 2 + angle - Math.PI / 2;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    // Draw a star with n points
    function drawStar(ctx, x, y, outerR, innerR, points, angle) {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const a = (i / (points * 2)) * Math.PI * 2 + angle - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    // Draw a diamond (rotated square)
    function drawDiamond(ctx, x, y, r, angle) {
      drawPolygon(ctx, x, y, r, 4, angle + Math.PI / 4);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = '100vh';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      const docH = document.documentElement.scrollHeight;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const phi = 1.618033988749;
        const angle = i * phi * Math.PI * 2;
        const radius = Math.sqrt(i / PARTICLE_COUNT);
        const shape = pickShape();
        // Complex shapes are slightly bigger
        const sizeBonus =
          shape === 'circle'
            ? 0
            : shape === 'star'
              ? 1.5
              : shape === 'hexagon'
                ? 1.2
                : 0.6;
        const baseR = 1.2 + (i % 5) * 0.5 + sizeBonus;
        particles.push({
          // Spread across full document height
          x: (0.5 + Math.cos(angle) * radius * 0.48) * w,
          y: Math.random() * docH,
          // Base velocity — gentle drift
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED * 0.5,
          // Visual
          r: baseR,
          baseR,
          hue: 210 + (i % 6) * 18,
          alpha: 0.25 + (i % 4) * 0.1,
          baseAlpha: 0.25 + (i % 4) * 0.1,
          // Shape
          shape,
          rotation: Math.random() * Math.PI * 2,
          baseRotation: Math.random() * Math.PI * 2,
          springRotation: 0, // current spring offset
          springVel: 0, // spring velocity
          // Organic drift phase
          phase: Math.random() * Math.PI * 2,
          driftSpeed: 0.3 + Math.random() * 0.4,
          driftAmp: 8 + Math.random() * 12,
        });
      }
    }

    function getAudioEnergy() {
      const musicEl = document.querySelector('.musicRegion');
      if (!musicEl) return { energy: 0, bass: 0, mid: 0, high: 0 };
      return {
        energy: parseFloat(musicEl.style.getPropertyValue('--energy')) || 0,
        bass: parseFloat(musicEl.style.getPropertyValue('--bass')) || 0,
        mid: parseFloat(musicEl.style.getPropertyValue('--mid')) || 0,
        high: parseFloat(musicEl.style.getPropertyValue('--high')) || 0,
      };
    }

    function getMusicSectionY() {
      const el = document.querySelector('.musicRegion');
      if (!el) return -1;
      const r = el.getBoundingClientRect();
      return scrollY + r.top;
    }

    function tick() {
      const vh = window.innerHeight;
      scrollY = window.scrollY;
      // Scroll velocity — smoothed
      const rawVel = scrollY - prevScrollY;
      scrollVel += (rawVel - scrollVel) * 0.15;
      prevScrollY = scrollY;

      const t = Date.now() / 1000;
      const audio = getAudioEnergy();
      const musicY = getMusicSectionY();
      const musicInfluenceRange = vh * 1.5;

      // Check if we're in dark or light mode
      const isDark =
        document.documentElement.getAttribute('data-theme') !== 'light';
      const lineBaseColor = isDark ? [140, 170, 230] : [80, 100, 170];
      const nodeAlphaScale = isDark ? 1 : 0.75;
      const lineAlphaScale = isDark ? 1 : 0.85;
      const pathAlphaBase = isDark ? 0.04 : 0.045;

      ctx.clearRect(0, 0, w, vh);

      // Visible range in document coords
      const viewTop = scrollY - 200;
      const viewBottom = scrollY + vh + 200;

      // Update particles
      for (const p of particles) {
        // Organic drift
        p.phase += p.driftSpeed * 0.016;
        const driftX = Math.sin(p.phase) * p.driftAmp * 0.016;
        const driftY = Math.cos(p.phase * 0.7 + 1) * p.driftAmp * 0.5 * 0.016;

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        // Scroll velocity effect — particles rush upward when scrolling down
        p.y -= scrollVel * (0.02 + Math.random() * 0.01);

        // Spring twist — scroll winds up rotation, then it springs back
        const twistForce =
          scrollVel * 0.008 * (p.shape !== 'circle' ? 1.5 : 0.5);
        p.springVel += twistForce;
        // Spring physics: pull back toward 0 + damping
        const springK = 0.06;
        const damping = 0.88;
        p.springVel += -p.springRotation * springK;
        p.springVel *= damping;
        p.springRotation += p.springVel;
        p.rotation = p.baseRotation + p.springRotation;

        // Music reactivity — particles near music section pulse
        if (musicY > 0 && audio.energy > 0.01) {
          const distToMusic = Math.abs(p.y - musicY);
          if (distToMusic < musicInfluenceRange) {
            const influence = 1 - distToMusic / musicInfluenceRange;
            const pulse = influence * audio.bass * 0.8;
            p.r = p.baseR + pulse * 3;
            p.alpha = p.baseAlpha + influence * audio.energy * 0.4;
            // Shake particles with music
            p.x += Math.sin(t * 8 + p.phase) * pulse * 2;
            p.y += Math.cos(t * 6 + p.phase) * pulse * 1.5;
          } else {
            p.r += (p.baseR - p.r) * 0.1;
            p.alpha += (p.baseAlpha - p.alpha) * 0.1;
          }
        } else {
          p.r += (p.baseR - p.r) * 0.1;
          p.alpha += (p.baseAlpha - p.alpha) * 0.1;
        }

        // Wrap horizontally
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        // Wrap vertically across full document
        const docH = document.documentElement.scrollHeight;
        if (p.y < -100) p.y = docH + 50;
        if (p.y > docH + 100) p.y = -50;
      }

      // Draw only visible particles and their connections
      const visible = particles.filter(p => p.y > viewTop && p.y < viewBottom);

      // Draw connections
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i],
            b = visible[j];
          const dx = a.x - b.x;
          const dy = a.y - scrollY - (b.y - scrollY);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
            // Music boost for lines near music section
            let lineOpacity = opacity;
            if (musicY > 0 && audio.energy > 0.01) {
              const midY = (a.y + b.y) / 2;
              const distToMusic = Math.abs(midY - musicY);
              if (distToMusic < musicInfluenceRange) {
                const influence = 1 - distToMusic / musicInfluenceRange;
                lineOpacity += influence * audio.energy * 0.15;
              }
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y - scrollY);
            ctx.lineTo(b.x, b.y - scrollY);
            ctx.strokeStyle = `rgba(${lineBaseColor[0]}, ${lineBaseColor[1]}, ${lineBaseColor[2]}, ${lineOpacity * lineAlphaScale})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with scroll streak trails
      const absVel = Math.abs(scrollVel);
      const streakLen = Math.min(absVel * 1.8, 60); // cap at 60px
      const streakDir = scrollVel > 0 ? 1 : -1; // streak trails behind scroll direction

      for (const p of visible) {
        const screenY = p.y - scrollY;
        const nodeLightness = isDark ? 65 : 45;
        const sat = isDark ? 60 : 50;
        const nodeColor = `hsla(${p.hue}, ${sat}%, ${nodeLightness}%, ${p.alpha * nodeAlphaScale})`;

        // Streak trail — drawn when scrolling
        if (streakLen > 1.5) {
          const trailEndY = screenY + streakLen * streakDir;
          const trailGrad = ctx.createLinearGradient(
            p.x,
            screenY,
            p.x,
            trailEndY
          );
          trailGrad.addColorStop(
            0,
            `hsla(${p.hue}, ${sat}%, ${nodeLightness}%, ${p.alpha * nodeAlphaScale * 0.6})`
          );
          trailGrad.addColorStop(
            1,
            `hsla(${p.hue}, ${sat}%, ${nodeLightness}%, 0)`
          );
          ctx.beginPath();
          ctx.moveTo(p.x, screenY);
          ctx.lineTo(p.x, trailEndY);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = p.r * 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Scroll-driven glow boost — shapes glow more when scrolling
        const scrollGlow = Math.min(absVel * 0.015, 0.4);
        const glowAlpha =
          (p.alpha + (p.shape !== 'circle' ? scrollGlow : scrollGlow * 0.3)) *
          nodeAlphaScale;

        // Draw shape
        ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${nodeLightness}%, ${glowAlpha})`;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, screenY, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'triangle') {
          drawPolygon(ctx, p.x, screenY, p.r * 1.3, 3, p.rotation);
          ctx.fill();
        } else if (p.shape === 'diamond') {
          drawDiamond(ctx, p.x, screenY, p.r * 1.2, p.rotation);
          ctx.fill();
        } else if (p.shape === 'pentagon') {
          drawPolygon(ctx, p.x, screenY, p.r * 1.3, 5, p.rotation);
          ctx.fill();
        } else if (p.shape === 'hexagon') {
          drawPolygon(ctx, p.x, screenY, p.r * 1.4, 6, p.rotation);
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(ctx, p.x, screenY, p.r * 1.8, p.r * 0.8, 5, p.rotation);
          ctx.fill();
        }

        // Glow for non-circle shapes or larger particles (skip on mobile for perf)
        if (!isMobile && (p.r > 2 || p.shape !== 'circle')) {
          const glowR = p.shape !== 'circle' ? p.r * 4 : p.r * 3;
          const glowSat = isDark ? 70 : 50;
          const glowL = isDark ? 70 : 50;
          const baseGlowA = p.shape !== 'circle' ? 0.35 : 0.3;
          const glowA =
            (baseGlowA + scrollGlow * 0.5) * p.alpha * nodeAlphaScale;
          ctx.beginPath();
          ctx.arc(p.x, screenY, glowR, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            p.x,
            screenY,
            0,
            p.x,
            screenY,
            glowR
          );
          grad.addColorStop(
            0,
            `hsla(${p.hue}, ${glowSat}%, ${glowL}%, ${glowA})`
          );
          grad.addColorStop(1, `hsla(${p.hue}, ${glowSat}%, ${glowL}%, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // Draw flowing curved paths (like the old HeroSvg paths) — subtle
      const pathAlpha = pathAlphaBase;
      for (let i = 0; i < 3; i++) {
        const yOff = -scrollY * (0.3 + i * 0.1);
        const baseY = vh * (0.2 + i * 0.3) + (yOff % vh);
        ctx.beginPath();
        ctx.moveTo(0, baseY + Math.sin(t * 0.3 + i) * 20);
        for (let x = 0; x <= w; x += 50) {
          const y =
            baseY +
            Math.sin(x * 0.003 + t * (0.4 + i * 0.15) + i * 2) * (25 + i * 10) +
            Math.sin(x * 0.007 + t * 0.2) * 10;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${lineBaseColor[0]}, ${lineBaseColor[1]}, ${lineBaseColor[2]}, ${pathAlpha})`;
        ctx.lineWidth = 0.6 + i * 0.2;
        ctx.stroke();
      }

      animId = requestAnimationFrame(tick);
    }

    resize();
    createParticles();
    animId = requestAnimationFrame(tick);

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particleNetwork"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100vh',
      }}
    />
  );
}
