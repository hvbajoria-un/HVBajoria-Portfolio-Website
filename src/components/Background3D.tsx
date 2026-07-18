import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uScroll;

varying vec2 vUv;

// 2D Simplex Noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  
  // Aspect ratio correction for circular mouse dist
  vec2 aspectSt = st;
  aspectSt.x *= uResolution.x / uResolution.y;
  vec2 aspectMouse = uMouse;
  aspectMouse.x *= uResolution.x / uResolution.y;

  float dist = distance(aspectSt, aspectMouse);
  float mouseEffect = smoothstep(0.4, 0.0, dist);
  
  vec2 pos = vUv * 2.5;
  
  pos.x += uTime * 0.05;
  pos.y += uTime * 0.08 - uScroll * 0.8; // Scroll moves the noise
  pos += mouseEffect * 0.15; // Mouse displaces the noise slightly
  
  float n = snoise(pos);
  float n2 = snoise(pos * 2.0 - uTime * 0.1);
  
  float combinedNoise = (n + n2 * 0.5) * 0.5 + 0.5;
  
  // Dynamic color mix
  vec3 finalColor = mix(uColor1, uColor2, combinedNoise);
  
  // Add a subtle glow where the mouse is
  finalColor += vec3(0.1, 0.15, 0.2) * mouseEffect * 0.8;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const FlowShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
    uColor1: new THREE.Color('#030305'),
    uColor2: new THREE.Color('#1f1f3a'),
    uScroll: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ FlowShaderMaterial });

function Scene() {
  const materialRef = useRef<any>(null);
  const { viewport, size } = useThree();
  const [scroll, setScroll] = useState(0);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScroll(scrollY / maxScroll);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uResolution.set(size.width, size.height);
      
      materialRef.current.uScroll += (scroll - materialRef.current.uScroll) * 5 * delta;
      
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 5 * delta;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 5 * delta;
      materialRef.current.uMouse.copy(mouse.current);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-expect-error flowShaderMaterial is added via extend */}
      <flowShaderMaterial ref={materialRef} />
    </mesh>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
