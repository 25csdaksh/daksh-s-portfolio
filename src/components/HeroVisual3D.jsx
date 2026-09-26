import React from "react";
import { GalaxyScene } from "./galaxy/GalaxyScene";

/**
 * HeroVisual3D
 * Majestic 3D Milky Way Spiral Galaxy Hero Display.
 * Framed with subtle royal dark blue and celestial gold ambient lighting.
 */
export function HeroVisual3D() {
  return (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto flex items-center justify-center select-none">
      {/* Ambient background glow matching Royal Dark Blue & Gold theme */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 via-amber-500/15 to-indigo-900/30 rounded-full blur-[100px] -z-10" />

      {/* Cosmic Galaxy Container */}
      <div className="relative w-full h-full rounded-3xl border border-amber-400/30 bg-[#02040A] overflow-hidden shadow-2xl shadow-blue-950/70 group transition-all duration-500 hover:border-amber-400/50">
        {/* Procedural 3D Milky Way Spiral Galaxy Canvas */}
        <GalaxyScene className="w-full h-full" showControls={true} />
      </div>
    </div>
  );
}
