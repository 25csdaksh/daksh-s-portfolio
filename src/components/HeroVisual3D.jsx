import React from "react";
import { GalaxyScene } from "./galaxy/GalaxyScene";

export function HeroVisual3D() {
  return (
    <div className="relative w-full aspect-square max-w-[580px] mx-auto flex items-center justify-center select-none">
      {/* Ambient background glow matching 60:30:10 Royal Dark Blue & Gold */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-amber-500/20 to-indigo-900/40 rounded-full blur-[90px] -z-10" />

      {/* Galaxy Container Frame */}
      <div className="relative w-full h-full rounded-3xl border border-amber-400/40 bg-[#070E20] overflow-hidden shadow-2xl shadow-blue-950/80 group">
        {/* Procedural 3D Spiral Galaxy Canvas */}
        <GalaxyScene className="w-full h-full" showControls={true} />
      </div>
    </div>
  );
}
