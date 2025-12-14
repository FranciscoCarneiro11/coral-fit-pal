import React from "react";
import { cn } from "@/lib/utils";
import femaleFigure from "@/assets/female-figure.png";
import maleFigure from "@/assets/male-figure.png";

interface GenderCardProps {
  gender: "male" | "female";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const GenderCard: React.FC<GenderCardProps> = ({
  gender,
  selected = false,
  onClick,
  className,
}) => {
  const isMale = gender === "male";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border-2 transition-all duration-300 w-full aspect-[3/4]",
        selected
          ? "border-primary bg-primary/10 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
          : "border-muted bg-secondary hover:border-primary/50",
        className
      )}
    >
      {/* Body Figure */}
      <div className="flex-1 flex items-center justify-center w-full">
        {isMale ? (
          <img
            src={maleFigure}
            alt="Homem"
            className={cn(
              "h-48 w-auto object-contain transition-all duration-300",
              selected ? "brightness-100" : "brightness-75 grayscale"
            )}
            style={{
              filter: selected ? "drop-shadow(0 4px 20px hsl(var(--primary) / 0.5))" : "none"
            }}
          />
        ) : (
          <img
            src={femaleFigure}
            alt="Mulher"
            className={cn(
              "h-48 w-auto object-contain transition-all duration-300",
              selected ? "brightness-100" : "brightness-75 grayscale"
            )}
            style={{
              filter: selected ? "drop-shadow(0 4px 20px hsl(var(--primary) / 0.5))" : "none"
            }}
          />
        )}
      </div>

      {/* Label */}
      <span className={cn(
        "text-xl font-semibold transition-all duration-300",
        selected ? "text-primary font-bold" : "text-muted-foreground"
      )}>
        {isMale ? "Homem" : "Mulher"}
      </span>

      {/* Selection Checkmark */}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-scale-in">
          <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};
