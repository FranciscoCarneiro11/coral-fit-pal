import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DaySectionProps {
  title: string;
  locked?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const DaySection: React.FC<DaySectionProps> = ({
  title,
  locked = false,
  children,
  className
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-2 mb-4">
        <h2 className={cn(
          "text-lg font-bold",
          locked ? "text-muted-foreground" : "text-foreground"
        )}>
          {title}
        </h2>
        {locked && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            <span>Bloqueado</span>
          </div>
        )}
      </div>
      
      <div className={cn(
        "space-y-3 transition-all duration-300",
        locked && "pointer-events-none"
      )}>
        {children}
      </div>
    </div>
  );
};
