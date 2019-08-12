import * as THREE from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { TimelineMax } from 'gsap';

import SEO from '../components/seo';

const cubes = [];

function rotateElement(node) {
  new TimelineMax().to(node.rotation, 0.5, {
    x: node.rotation.x + Math.PI / 2,
    y: node.rotation.y + Math.PI / 2,
  });
  new TimelineMax().to(node.scale, 0.25, { x: 0.875, y: 0.875, z: 0.875 }).to(node.scale, 0.25, { x: 1, y: 1, z: 1 });
}

function Plane() {
  // Register plane as a physics body with zero mass
  return (
    <mesh position={[0, 0, -10]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#5994a7" />
    </mesh>
  );
}

function Cube({ position }) {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      // register cube
      const index = cubes.push(groupRef.current);

      return () => cubes.splice(index, 1);
    }

    return () => {};
  }, [groupRef.current]);

  return (
    <group ref={groupRef} position={position} receiveShadow>
      <mesh
        onClick={() => rotateElement(groupRef.current)}
        onPointerOver={({ object }) =>
          new TimelineMax()
            .to(object.material.color, 0.5, { r: 189, g: 66, b: 114 })
            .to(object.material.color, 0.5, { r: 1, g: 1, b: 1 })
        }
        receiveShadow
        castShadow
      >
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial attach="material" color="#ffffff" opacity={0.7} />
      </mesh>
    </group>
  );
}

function IndexPage() {
  useEffect(() => {
    const interval = setInterval(() => {
      const stagger = {
        grid: [15, 7],
        from: 'center',
        amount: 1.25,
      };

      new TimelineMax().staggerTo(
        cubes.map(({ scale }) => scale),
        0.5,
        { x: 0.875, y: 0.875, z: 0.875, stagger },
        0.01
      );
      new TimelineMax().delay(1).staggerTo(cubes.map(({ scale }) => scale), 0.5, { x: 1, y: 1, z: 1, stagger }, 0.01);
    }, 3000);

    return () => clearInterval(interval);
  }, [cubes]);

  return (
    <>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ display: 'block', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
      >
        <Plane />
        <ambientLight intensity={1} />
        {/* <spotLight intensity={0.2} position={[100, 30, 50]} angle={0.1} penumbra={1} castShadow /> */}
        {/* <pointLight intensity={0.05} position={[0, 0, 50]} penumbra={1} castShadow /> */}
        <pointLight intensity={1} position={[0, 0, -10]} penumbra={1} castShadow color="0x5994a7" />
        {new Array(7)
          .fill()
          .map((_, rowIndex) =>
            new Array(15).fill().map((_, colIndex) => <Cube position={[-14 + colIndex * 2, 6 - rowIndex * 2, -5]} />)
          )}
      </Canvas>
    </>
  );
}

export default IndexPage;
