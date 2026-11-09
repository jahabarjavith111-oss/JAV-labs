"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * JAV signature visual — the Orbital Globe.
 *
 * A dark digital sphere with a lat/long grid, glowing surface nodes
 * (worldwide clients), a fresnel atmosphere, and two tilted orbit rings
 * echoing the JAV logo swoosh, with a satellite tracing one ring.
 *
 * - Pointer parallax (subtle tilt toward the cursor)
 * - Auto-rotation, paused entirely for prefers-reduced-motion
 * - Responsive scale — fits its container on any screen
 * - Static CSS fallback when WebGL is unavailable
 */

const NODE_COLORS = ["#38d6ff", "#6aa5ff", "#2f7bff"];

/* ------------------------------------------------------------------ */
/*  Geometry builders                                                  */
/* ------------------------------------------------------------------ */

/** Lat/long wireframe as line segments (12 meridians · 9 parallels). */
function buildGridGeometry() {
  const pts: number[] = [];
  const SEG = 72;

  // Meridians
  for (let i = 0; i < 12; i++) {
    const phi = (i / 12) * Math.PI * 2;
    for (let j = 0; j < SEG; j++) {
      const t1 = (j / SEG) * Math.PI;
      const t2 = ((j + 1) / SEG) * Math.PI;
      pts.push(
        Math.sin(t1) * Math.cos(phi),
        Math.cos(t1),
        Math.sin(t1) * Math.sin(phi),
        Math.sin(t2) * Math.cos(phi),
        Math.cos(t2),
        Math.sin(t2) * Math.sin(phi),
      );
    }
  }

  // Parallels (skip poles)
  for (let i = 1; i <= 9; i++) {
    const theta = (i / 10) * Math.PI;
    const r = Math.sin(theta);
    const y = Math.cos(theta);
    for (let j = 0; j < SEG; j++) {
      const a1 = (j / SEG) * Math.PI * 2;
      const a2 = ((j + 1) / SEG) * Math.PI * 2;
      pts.push(r * Math.cos(a1), y, r * Math.sin(a1));
      pts.push(r * Math.cos(a2), y, r * Math.sin(a2));
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return geometry;
}

/** Fibonacci-sphere point cloud with per-point color variation. */
function buildDotGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  const c1 = new THREE.Color("#5aa9ff");
  const c2 = new THREE.Color("#38d6ff");

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * radius;

    const color = c1.clone().lerp(c2, (Math.sin(i * 12.9898) + 1) / 2);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

/** Fibonacci-sphere positions for the glowing hub nodes. */
function getNodePositions(count: number) {
  const positions: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    positions.push(
      new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius),
    );
  }
  return positions;
}

/* ------------------------------------------------------------------ */
/*  Atmosphere — fresnel glow shell                                    */
/* ------------------------------------------------------------------ */

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
    gl_FragColor = vec4(uColor, 1.0) * clamp(intensity, 0.0, 1.0);
  }
`;

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color("#2f8dff") } },
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  return (
    <mesh scale={1.22} material={material}>
      <sphereGeometry args={[1, 48, 48]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Globe scene                                                        */
/* ------------------------------------------------------------------ */

type SceneProps = { reduced: boolean };

function GlobeScene({ reduced }: SceneProps) {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const halosRef = useRef<THREE.Group>(null);
  const lastScroll = useRef(0);

  const gridGeometry = useMemo(() => buildGridGeometry(), []);
  const dotGeometry = useMemo(() => buildDotGeometry(620), []);
  const nodes = useMemo(() => getNodePositions(7), []);
  const { viewport } = useThree();
  // Scale the whole system to its container — never oversized.
  const scale = THREE.MathUtils.clamp(viewport.width / 4.6, 0.66, 1.04);

  // Cleanup geometries when the scene unmounts.
  useEffect(() => {
    return () => {
      gridGeometry.dispose();
      dotGeometry.dispose();
    };
  }, [gridGeometry, dotGeometry]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Scroll linkage — the globe and rings respond to page scroll,
    // tying the 3D scene to the storytelling (skipped for reduced motion).
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScroll.current;
    lastScroll.current = scrollY;

    if (!reduced && Math.abs(scrollDelta) > 0.5) {
      if (spinRef.current) spinRef.current.rotation.y += scrollDelta * 0.00055;
      if (ringsRef.current) ringsRef.current.rotation.y -= scrollDelta * 0.00028;
    }

    if (!reduced) {
      if (spinRef.current) spinRef.current.rotation.y += delta * 0.11;
      if (ringsRef.current) ringsRef.current.rotation.y -= delta * 0.045;
      // Node halos breathe
      if (halosRef.current) {
        halosRef.current.children.forEach((child, i) => {
          const pulse = 1 + Math.sin(t * 1.8 + i * 1.7) * 0.28;
          child.scale.setScalar(pulse);
        });
      }
    }

    // Pointer parallax — eased tilt toward the cursor.
    if (tiltRef.current && !reduced) {
      const targetX = state.pointer.y * 0.16;
      const targetY = state.pointer.x * 0.26;
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltRef.current.rotation.x,
        targetX,
        0.05,
      );
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(
        tiltRef.current.rotation.y,
        targetY,
        0.05,
      );
    }
  });

  return (
    <group ref={tiltRef} scale={scale}>
      {/* Lights — key + cyan rim for depth */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 3, 4]} intensity={1.7} />
      <directionalLight position={[-5, -2, -4]} intensity={1.1} color="#2f8dff" />
      <pointLight position={[0, 0, 3]} intensity={12} color="#38d6ff" />

      {/* Spinning globe: core · grid · nodes */}
      <group ref={spinRef}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#0c1a30"
            roughness={0.55}
            metalness={0.35}
            emissive="#071526"
            emissiveIntensity={0.75}
          />
        </mesh>

        {/* Lat/long grid */}
        <lineSegments geometry={gridGeometry}>
          <lineBasicMaterial
            color="#4f8fe0"
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </lineSegments>

        {/* Digital surface dots */}
        <points geometry={dotGeometry}>
          <pointsMaterial
            size={0.014}
            vertexColors
            transparent
            opacity={0.85}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Glowing hub nodes — worldwide clients */}
        <group ref={halosRef}>
          {nodes.map((position, i) => (
            <group key={i} position={position.clone().multiplyScalar(1.01)}>
              <mesh>
                <sphereGeometry args={[0.018, 12, 12]} />
                <meshBasicMaterial color={NODE_COLORS[i % NODE_COLORS.length]} />
              </mesh>
              <mesh scale={3.4}>
                <sphereGeometry args={[0.018, 12, 12]} />
                <meshBasicMaterial
                  color={NODE_COLORS[i % NODE_COLORS.length]}
                  transparent
                  opacity={0.16}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Orbit rings — the JAV swoosh, with a satellite in transit */}
      <group ref={ringsRef} rotation={[1.18, 0, 0.32]}>
        <mesh>
          <torusGeometry args={[1.46, 0.0075, 8, 220]} />
          <meshBasicMaterial
            color="#38d6ff"
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[1.46, 0, 0]}>
          <sphereGeometry args={[0.028, 14, 14]} />
          <meshBasicMaterial color="#eaf6ff" />
        </mesh>
        <mesh position={[1.46, 0, 0]} scale={3}>
          <sphereGeometry args={[0.028, 14, 14]} />
          <meshBasicMaterial
            color="#38d6ff"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
      <group rotation={[1.42, 0, -0.55]}>
        <mesh>
          <torusGeometry args={[1.64, 0.005, 8, 220]} />
          <meshBasicMaterial
            color="#2f7bff"
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      </group>

      <Atmosphere />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Wrapper — WebGL detection, reduced motion, canvas host             */
/* ------------------------------------------------------------------ */

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function Globe() {
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    queueMicrotask(() => {
      setReduced(query.matches);
      setWebgl(supportsWebGL());
    });
    function onChange(event: MediaQueryListEvent) {
      setReduced(event.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Pause rendering entirely once the globe scrolls out of view —
  // zero GPU/CPU cost below the fold, resumes instantly on return.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? true),
      { threshold: 0 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Static branded fallback while detecting or when WebGL is missing.
  if (webgl === false) {
    return (
      <div
        aria-hidden="true"
        className="relative h-full w-full"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(47,123,255,0.5) 0%, rgba(47,123,255,0.16) 30%, rgba(56,214,255,0.07) 45%, transparent 62%)",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[64%] max-w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-bright/40"
          style={{ aspectRatio: "1" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[84%] max-w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/25"
          style={{ aspectRatio: "1", transform: "translate(-50%, -50%) rotate(-18deg) scaleY(0.42)" }}
        />
      </div>
    );
  }

  return (
    <div ref={hostRef} aria-hidden="true" className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={reduced || !visible ? "demand" : "always"}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Stars
            radius={70}
            depth={45}
            count={1400}
            factor={3.4}
            saturation={0}
            fade
            speed={reduced ? 0 : 0.5}
          />
          <GlobeScene reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
