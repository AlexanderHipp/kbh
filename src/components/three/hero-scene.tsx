"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import type { Mesh } from "three";
import * as THREE from "three";

// Store for sharing drag state between React and Three.js
const dragState = {
  isDragging: false,
  position: { x: 0, y: 0 },
};

function AbstractShape() {
  const meshRef = useRef<Mesh>(null);
  const { resolvedTheme } = useTheme();
  const { pointer, viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);

  // Smoothed position
  const smoothPosition = useRef({ x: 0, y: 0 });

  // Sync with external drag state
  useFrame((state) => {
    const dragging = dragState.isDragging;
    if (dragging !== isDragging) {
      setIsDragging(dragging);
    }

    if (meshRef.current) {
      if (dragging) {
        // Follow drag position
        smoothPosition.current.x = THREE.MathUtils.lerp(
          smoothPosition.current.x,
          dragState.position.x,
          0.15
        );
        smoothPosition.current.y = THREE.MathUtils.lerp(
          smoothPosition.current.y,
          dragState.position.y,
          0.15
        );
      } else {
        // Follow mouse with subtle movement
        const targetX = pointer.x * viewport.width * 0.15;
        const targetY = pointer.y * viewport.height * 0.15;

        smoothPosition.current.x = THREE.MathUtils.lerp(
          smoothPosition.current.x,
          targetX,
          0.03
        );
        smoothPosition.current.y = THREE.MathUtils.lerp(
          smoothPosition.current.y,
          targetY,
          0.03
        );
      }

      meshRef.current.position.x = smoothPosition.current.x;
      meshRef.current.position.y = smoothPosition.current.y;

      // Rotation
      const rotationSpeed = dragging ? 0.3 : 0.1;
      meshRef.current.rotation.x =
        state.clock.elapsedTime * rotationSpeed + pointer.y * 0.5;
      meshRef.current.rotation.y =
        state.clock.elapsedTime * (rotationSpeed * 1.5) + pointer.x * 0.5;
    }
  });

  const color = resolvedTheme === "dark" ? "#666666" : "#999999";

  return (
    <Float
      speed={isDragging ? 0 : 1.5}
      rotationIntensity={isDragging ? 0 : 0.3}
      floatIntensity={isDragging ? 0 : 0.5}
    >
      <mesh ref={meshRef} scale={isDragging ? 2 : 1.8}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.4}
          metalness={0.8}
          distort={isDragging ? 0.5 : 0.3}
          speed={isDragging ? 3 : 1.5}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dragState.isDragging = true;
      updatePosition(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging) {
        updatePosition(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragState.isDragging = false;
    };

    const updatePosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Convert to normalized coordinates (-1 to 1) then to Three.js units
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      dragState.position = { x: x * 2.5, y: y * 2.5 };
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      dragState.isDragging = true;
      updateTouchPosition(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (dragState.isDragging) {
        updateTouchPosition(e);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      dragState.isDragging = false;
    };

    const updateTouchPosition = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      dragState.position = { x: x * 2.5, y: y * 2.5 };
    };

    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-10 opacity-60 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
