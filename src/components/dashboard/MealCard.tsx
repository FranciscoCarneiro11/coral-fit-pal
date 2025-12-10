import React, { useState } from "react";
import { Flame, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealCardProps {
  title: string;
  time: string;
  calories: number;
  items: string[];
  locked?: boolean;
  onComplete?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({ 
  title, 
  time, 
  calories, 
  items,
  locked = false,
  onComplete
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (locked) return;
    
    setIsAnimating(true);
    setIsCompleted(!isCompleted);
    
    setTimeout(() => {
      setIsAnimating(false);
      if (!isCompleted && onComplete) {
        onComplete();
      }
    }, 300);
  };

  return (
    <div 
      className={cn(
        "relative w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card transition-all duration-300",
        locked && "blur-[2px] opacity-60",
        isCompleted && "opacity-60 bg-muted"
      )}
    >
      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
        </div>
      )}

      {/* Complete button */}
      <button
        onClick={handleComplete}
        disabled={locked}
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          isCompleted 
            ? "bg-primary border-primary" 
            : "border-border hover:border-primary",
          isAnimating && "scale-125",
          locked && "pointer-events-none"
        )}
      >
        {isCompleted && (
          <Check 
            className={cn(
              "w-4 h-4 text-primary-foreground transition-transform duration-300",
              isAnimating && "scale-110"
            )} 
          />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn(
            "font-semibold text-foreground transition-all",
            isCompleted && "line-through text-muted-foreground"
          )}>
            {title}
          </h3>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {items.join(", ")}
        </p>
        <div className="flex items-center gap-1 mt-2 text-primary">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-medium">{calories} kcal</span>
        </div>
      </div>
      
      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </div>
  );
};
