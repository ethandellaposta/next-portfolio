import { useRef } from 'react';
import { FloatingParticles } from '@components/SvgAnimations';
import { AMBIENT_LIGHTS } from '@data/constants';

export default function AmbientBackground() {
  const lightsRef = useRef(null);

  return (
    <div className="bgLayer" aria-hidden="true">
      <FloatingParticles />
      <div ref={lightsRef} className="ambientLights">
        {AMBIENT_LIGHTS.map((light, i) => (
          <span
            key={i}
            className="aLight"
            data-speed={light.speed}
            style={{
              '--ax': light.ax,
              '--ay': light.ay,
              '--asize': light.asize,
              '--acolor': light.acolor,
              '--ablur': light.ablur,
              '--aopacity': light.aopacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
