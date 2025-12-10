import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Camera, Flame, Beef, Wheat, Droplet, Plus } from "lucide-react";
import { AppShell, AppHeader, AppContent } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { HydrationTracker } from "@/components/dashboard/HydrationTracker";
import { MealCard } from "@/components/dashboard/MealCard";
import { DaySection } from "@/components/dashboard/DaySection";
import { useConfetti } from "@/hooks/useConfetti";
import { cn } from "@/lib/utils";

interface MacroCardProps {
  icon: React.ReactNode;
  label: string;
  current: number;
  goal: number;
  unit: string;
  colorClass: string;
  bgClass: string;
}

const MacroCard: React.FC<MacroCardProps> = ({
  icon,
  label,
  current,
  goal,
  unit,
  colorClass,
  bgClass,
}) => {
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div className="flex flex-col items-center p-3 bg-card rounded-2xl shadow-card">
      <div className={cn("p-2 rounded-xl mb-2", bgClass)}>{icon}</div>
      <span className="text-xs text-muted-foreground mb-1">{label}</span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-lg font-bold text-foreground">{current}</span>
        <span className="text-xs text-muted-foreground">/{goal}{unit}</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", colorClass)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

interface StreakBadgeProps {
  count: number;
}

const StreakBadge: React.FC<StreakBadgeProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full shadow-sm">
      <Flame className="w-4 h-4" />
      <span className="text-sm font-bold">{count}</span>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { triggerConfetti } = useConfetti();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [streak] = useState(3);

  // Check if this is the first load after onboarding
  useEffect(() => {
    const isFirstLoad = location.state?.firstLoad;
    if (isFirstLoad && !hasTriggeredConfetti) {
      // Trigger confetti after a short delay
      setTimeout(() => {
        triggerConfetti();
        setHasTriggeredConfetti(true);
      }, 500);
    }
  }, [location.state, triggerConfetti, hasTriggeredConfetti]);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const todayMeals = [
    {
      title: "Café da manhã",
      time: "07:30",
      calories: 420,
      items: ["Ovos mexidos", "Pão integral", "Café"],
    },
    {
      title: "Almoço",
      time: "12:30",
      calories: 580,
      items: ["Frango grelhado", "Arroz", "Salada"],
    },
    {
      title: "Jantar",
      time: "19:00",
      calories: 240,
      items: ["Salmão", "Legumes", "Batata doce"],
    },
  ];

  const tomorrowMeals = [
    {
      title: "Café da manhã",
      time: "07:30",
      calories: 380,
      items: ["Iogurte", "Granola", "Frutas"],
    },
    {
      title: "Almoço",
      time: "12:30",
      calories: 620,
      items: ["Carne moída", "Purê", "Brócolis"],
    },
  ];

  const day3Meals = [
    {
      title: "Café da manhã",
      time: "07:30",
      calories: 450,
      items: ["Panquecas", "Mel", "Banana"],
    },
  ];

  return (
    <AppShell>
      <AppHeader 
        title="Hoje"
        rightAction={<StreakBadge count={streak} />}
      />

      <AppContent className="pb-36">
        {/* Date */}
        <p className="text-sm text-muted-foreground capitalize mb-6">{today}</p>

        {/* Macro Cards */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <MacroCard
            icon={<Flame className="w-5 h-5 text-primary" />}
            label="Calorias"
            current={1240}
            goal={2000}
            unit=""
            colorClass="bg-primary"
            bgClass="bg-coral-light"
          />
          <MacroCard
            icon={<Beef className="w-5 h-5 text-red-500" />}
            label="Proteína"
            current={45}
            goal={120}
            unit="g"
            colorClass="bg-red-500"
            bgClass="bg-red-100"
          />
          <MacroCard
            icon={<Wheat className="w-5 h-5 text-amber-500" />}
            label="Carbos"
            current={130}
            goal={250}
            unit="g"
            colorClass="bg-amber-500"
            bgClass="bg-amber-100"
          />
          <MacroCard
            icon={<Droplet className="w-5 h-5 text-hydration-foreground" />}
            label="Gordura"
            current={35}
            goal={65}
            unit="g"
            colorClass="bg-hydration-foreground"
            bgClass="bg-hydration"
          />
        </div>

        {/* Hydration Tracker */}
        <HydrationTracker className="mb-8" />

        {/* Today's Meals */}
        <DaySection title="Hoje">
          <div className="flex items-center justify-between mb-4 -mt-2">
            <span className="text-sm text-muted-foreground">Suas refeições</span>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
          {todayMeals.map((meal, index) => (
            <MealCard
              key={index}
              title={meal.title}
              time={meal.time}
              calories={meal.calories}
              items={meal.items}
            />
          ))}
        </DaySection>

        {/* Tomorrow's Meals (Locked) */}
        <DaySection title="Amanhã" locked className="mt-8">
          {tomorrowMeals.map((meal, index) => (
            <MealCard
              key={index}
              title={meal.title}
              time={meal.time}
              calories={meal.calories}
              items={meal.items}
              locked
            />
          ))}
        </DaySection>

        {/* Day 3 Meals (Locked) */}
        <DaySection title="Dia 3" locked className="mt-8">
          {day3Meals.map((meal, index) => (
            <MealCard
              key={index}
              title={meal.title}
              time={meal.time}
              calories={meal.calories}
              items={meal.items}
              locked
            />
          ))}
        </DaySection>
      </AppContent>

      {/* Prominent Floating Scan Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-md mx-auto px-6 pb-8 flex flex-col items-center pointer-events-auto">
          {/* Glow Effect */}
          <div className="absolute bottom-6 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-glow-pulse" />
          
          {/* Main FAB */}
          <Button 
            variant="coral" 
            className="relative h-20 w-20 rounded-full shadow-fab hover:scale-105 transition-transform"
          >
            <Camera className="w-8 h-8" />
          </Button>
          
          {/* Label */}
          <span className="mt-2 text-sm font-medium text-foreground">
            Escanear comida
          </span>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
