import * as THREE from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { TimelineMax } from 'gsap';

import SEO from '../components/seo';

function Cube() {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      const interval = setInterval(
        () =>
          new TimelineMax().to(groupRef.current.rotation, 0.5, {
            x: groupRef.current.rotation.x + Math.PI / 2,
            y: groupRef.current.rotation.y + Math.PI / 2,
          }),
        2000
      );

      return () => clearInterval(interval);
    }
  }, [groupRef.current]);

  function onClick(event) {
    console.log(event, groupRef.current);

    new TimelineMax().to(groupRef.current.position, 1, { x: groupRef.current.position.x + 1 });
  }

  return (
    <group ref={groupRef}>
      <mesh onClick={onClick} onPointerOver={() => console.log('hover')} onPointerOut={() => console.log('unhover')}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial attach="material" color="#2f262d" />
      </mesh>
    </group>
  );
}

function IndexPage() {
  return (
    <>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Canvas style={{ display: 'block', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
        <Cube />
      </Canvas>
    </>
  );
}

export default IndexPage;
