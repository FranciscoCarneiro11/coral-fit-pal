import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import maleFigure from "@/assets/male-figure.png";
import femaleFigure from "@/assets/female-figure.png";

type BodyZone = "arms" | "abs" | "glutes" | "legs" | "fullBody";

interface BodyZoneSelectorProps {
  gender: "male" | "female";
  selected: BodyZone[];
  onChange: (zones: BodyZone[]) => void;
  className?: string;
}

const bodyZones: { id: BodyZone; label: string }[] = [
  { id: "arms", label: "Braços" },
  { id: "abs", label: "Abdômen" },
  { id: "glutes", label: "Glúteos" },
  { id: "legs", label: "Pernas" },
  { id: "fullBody", label: "Corpo Inteiro" },
];

// Heatmap overlay positions for each body zone (percentage-based)
const maleHeatmapZones: Record<BodyZone, { areas: { top: string; left: string; width: string; height: string; rotate?: string }[] }> = {
  arms: {
    areas: [
      { top: "24%", left: "12%", width: "18%", height: "22%", rotate: "-8deg" },
      { top: "24%", left: "70%", width: "18%", height: "22%", rotate: "8deg" },
    ],
  },
  abs: {
    areas: [
      { top: "32%", left: "35%", width: "30%", height: "18%" },
    ],
  },
  glutes: {
    areas: [
      { top: "48%", left: "32%", width: "36%", height: "12%" },
    ],
  },
  legs: {
    areas: [
      { top: "58%", left: "28%", width: "20%", height: "32%" },
      { top: "58%", left: "52%", width: "20%", height: "32%" },
    ],
  },
  fullBody: {
    areas: [
      { top: "18%", left: "20%", width: "60%", height: "72%" },
    ],
  },
};

const femaleHeatmapZones: Record<BodyZone, { areas: { top: string; left: string; width: string; height: string; rotate?: string }[] }> = {
  arms: {
    areas: [
      { top: "22%", left: "8%", width: "16%", height: "20%", rotate: "-12deg" },
      { top: "22%", left: "76%", width: "16%", height: "20%", rotate: "12deg" },
    ],
  },
  abs: {
    areas: [
      { top: "30%", left: "33%", width: "34%", height: "16%" },
    ],
  },
  glutes: {
    areas: [
      { top: "44%", left: "30%", width: "40%", height: "12%" },
    ],
  },
  legs: {
    areas: [
      { top: "54%", left: "26%", width: "22%", height: "36%" },
      { top: "54%", left: "52%", width: "22%", height: "36%" },
    ],
  },
  fullBody: {
    areas: [
      { top: "16%", left: "18%", width: "64%", height: "76%" },
    ],
  },
};

export const BodyZoneSelector: React.FC<BodyZoneSelectorProps> = ({
  gender,
  selected,
  onChange,
  className,
}) => {
  const toggleZone = (zone: BodyZone) => {
    if (selected.includes(zone)) {
      onChange(selected.filter((z) => z !== zone));
    } else {
      onChange([...selected, zone]);
    }
  };

  const isMale = gender === "male";
  const heatmapZones = isMale ? maleHeatmapZones : femaleHeatmapZones;
  const figureImage = isMale ? maleFigure : femaleFigure;

  return (
    <div className={cn("flex flex-row items-center gap-3 sm:gap-6 lg:gap-10", className)}>
      {/* Left Column: Selection Buttons (35-40% width) */}
      <div className="w-[38%] flex-shrink-0 flex flex-col gap-1.5 sm:gap-2.5">
        {bodyZones.map((zone) => {
          const isSelected = selected.includes(zone.id);
          return (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className={cn(
                "relative flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300",
                "text-xs sm:text-sm font-medium min-h-[44px]",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              style={{
                boxShadow: isSelected 
                  ? "0 4px 16px hsl(var(--primary) / 0.35)" 
                  : undefined,
              }}
            >
              <div
                className={cn(
                  "w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                  isSelected
                    ? "border-primary-foreground/50 bg-primary-foreground/20"
                    : "border-muted-foreground/30 bg-transparent"
                )}
              >
                {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
              </div>
              <span className="truncate">{zone.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Column: Body Figure with Heatmap Overlays (60-65% width) */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[200px] sm:max-w-[260px] lg:max-w-[300px]">
          {/* Background Glow Effect */}
          <div 
            className={cn(
              "absolute inset-0 rounded-[60px] transition-all duration-500",
              selected.length > 0 ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />

          {/* Body Figure Container */}
          <div className="relative aspect-[3/5] w-full">
            {/* Base Body Image */}
            <img
              src={figureImage}
              alt={`${gender} body figure`}
              className="w-full h-full object-contain relative z-10"
              style={{
                filter: selected.length > 0 
                  ? "drop-shadow(0 0 15px hsl(var(--primary) / 0.3))" 
                  : "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
              }}
            />

            {/* Heatmap Overlays */}
            {selected.map((zone) => {
              const zoneData = heatmapZones[zone];
              return zoneData.areas.map((area, index) => (
                <div
                  key={`${zone}-${index}`}
                  className="absolute z-20 pointer-events-none"
                  style={{
                    top: area.top,
                    left: area.left,
                    width: area.width,
                    height: area.height,
                    transform: area.rotate ? `rotate(${area.rotate})` : undefined,
                  }}
                >
                  {/* Multi-layer glow effect for heatmap */}
                  <div
                    className="absolute inset-0 rounded-[50%] animate-pulse"
                    style={{
                      background: `radial-gradient(ellipse at center, 
                        hsl(var(--primary) / 0.8) 0%, 
                        hsl(var(--primary) / 0.5) 30%, 
                        hsl(var(--primary) / 0.2) 60%, 
                        transparent 100%)`,
                      filter: "blur(6px)",
                    }}
                  />
                  {/* Inner intense glow */}
                  <div
                    className="absolute inset-[20%] rounded-[50%]"
                    style={{
                      background: `radial-gradient(ellipse at center, 
                        hsl(var(--primary) / 0.9) 0%, 
                        hsl(var(--primary) / 0.4) 70%, 
                        transparent 100%)`,
                      filter: "blur(3px)",
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                </div>
              ));
            })}

            {/* Full body outline glow when selected */}
            {selected.includes("fullBody") && (
              <div
                className="absolute inset-0 z-5 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, 
                    hsl(var(--primary) / 0.25) 20%, 
                    hsl(var(--primary) / 0.1) 50%, 
                    transparent 80%)`,
                  filter: "blur(12px)",
                  animation: "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
