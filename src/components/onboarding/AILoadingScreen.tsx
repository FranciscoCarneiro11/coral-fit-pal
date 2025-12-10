import React, { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface AILoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Analisando biometria...",
  "Calculando TDEE e Macros...",
  "Construindo seu treino personalizado...",
  "Finalizando plano...",
];

export const AILoadingScreen: React.FC<AILoadingScreenProps> = ({ onComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageOpacity, setMessageOpacity] = useState(1);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageOpacity(0);
      
      setTimeout(() => {
        setCurrentMessageIndex((prev) => {
          const next = prev + 1;
          if (next >= loadingMessages.length) {
            clearInterval(messageInterval);
            // Start fade out after last message
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(onComplete, 500);
            }, 600);
            return prev;
          }
          return next;
        });
        setMessageOpacity(1);
      }, 200);
    }, 750);

    return () => clearInterval(messageInterval);
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Pulsing Coral Circle with Brain */}
      <div className="relative mb-12">
        {/* Outer glow rings */}
        <div className="absolute inset-0 w-32 h-32 -m-4 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-0 w-28 h-28 -m-2 rounded-full bg-primary/30 animate-pulse" />
        
        {/* Main circle */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-coral-dark flex items-center justify-center shadow-fab animate-pulse">
          <Brain className="w-12 h-12 text-primary-foreground" />
        </div>
      </div>

      {/* Dynamic loading text */}
      <div className="h-8 flex items-center justify-center">
        <p
          className={cn(
            "text-primary-foreground/90 text-lg font-medium text-center transition-opacity duration-200",
          )}
          style={{ opacity: messageOpacity }}
        >
          {loadingMessages[currentMessageIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {loadingMessages.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index <= currentMessageIndex ? "bg-primary scale-100" : "bg-muted-foreground/30 scale-75"
            )}
          />
        ))}
      </div>

      {/* Subtle subtitle */}
      <p className="text-muted-foreground/50 text-sm mt-6">
        Powered by AI
      </p>
    </div>
  );
};
