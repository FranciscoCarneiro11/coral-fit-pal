import React, { useState } from "react";
import { AppShell, AppHeader, AppContent } from "@/components/layout/AppShell";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { Clock, Flame, ChevronRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekDay {
  day: number;
  label: string;
  completed: boolean;
  isToday: boolean;
}

interface MealItem {
  id: string;
  title: string;
  time: string;
  calories: number;
  items: string[];
  completed: boolean;
}

const Diet: React.FC = () => {
  const [weekDays] = useState<WeekDay[]>([
    { day: 1, label: "Seg", completed: true, isToday: false },
    { day: 2, label: "Ter", completed: true, isToday: false },
    { day: 3, label: "Qua", completed: false, isToday: true },
    { day: 4, label: "Qui", completed: false, isToday: false },
    { day: 5, label: "Sex", completed: false, isToday: false },
    { day: 6, label: "Sáb", completed: false, isToday: false },
    { day: 7, label: "Dom", completed: false, isToday: false },
  ]);

  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: "1",
      title: "Café da manhã",
      time: "07:30",
      calories: 420,
      items: ["Ovos mexidos", "Pão integral", "Café"],
      completed: true,
    },
    {
      id: "2",
      title: "Lanche da manhã",
      time: "10:00",
      calories: 180,
      items: ["Iogurte", "Granola"],
      completed: false,
    },
    {
      id: "3",
      title: "Almoço",
      time: "12:30",
      calories: 580,
      items: ["Frango grelhado", "Arroz integral", "Salada", "Feijão"],
      completed: false,
    },
    {
      id: "4",
      title: "Lanche da tarde",
      time: "16:00",
      calories: 150,
      items: ["Banana", "Castanhas"],
      completed: false,
    },
    {
      id: "5",
      title: "Jantar",
      time: "19:30",
      calories: 450,
      items: ["Salmão grelhado", "Legumes", "Batata doce"],
      completed: false,
    },
  ]);

  const completedCount = weekDays.filter(d => d.completed).length;
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const consumedCalories = meals.filter(m => m.completed).reduce((acc, meal) => acc + meal.calories, 0);

  const toggleMealComplete = (id: string) => {
    setMeals(prev => prev.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  return (
    <AppShell>
      <AppHeader title="Plano Alimentar" />

      <AppContent className="pb-28">
        <p className="text-muted-foreground mb-6">Semana 1 de 12</p>

        {/* Week Progress Card */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-foreground">Progresso da Semana</span>
            <span className="text-primary font-semibold">{completedCount}/7 dias</span>
          </div>
          
          <div className="flex justify-between">
            {weekDays.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                    day.completed
                      ? "bg-primary text-primary-foreground"
                      : day.isToday
                      ? "border-2 border-primary text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {day.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    day.day
                  )}
                </div>
                <span className={cn(
                  "text-xs",
                  day.isToday ? "text-primary font-semibold" : "text-muted-foreground"
                )}>
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-primary rounded-2xl p-5 shadow-card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-foreground/80 text-sm">Consumo de Hoje</span>
              <h3 className="text-2xl font-bold text-primary-foreground">
                {consumedCalories} <span className="text-lg font-normal">/ {totalCalories} kcal</span>
              </h3>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Flame className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(consumedCalories / totalCalories) * 100}%` }}
            />
          </div>
        </div>

        {/* Meals List */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Refeições de Hoje</h3>
          <button className="text-primary text-sm font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        
        <div className="space-y-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={cn(
                "bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-4 transition-opacity",
                meal.completed && "opacity-60"
              )}
            >
              <button
                onClick={() => toggleMealComplete(meal.id)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                  meal.completed 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-coral-light text-primary"
                )}
              >
                {meal.completed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Clock className="w-6 h-6" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={cn(
                    "font-semibold",
                    meal.completed ? "text-muted-foreground line-through" : "text-foreground"
                  )}>
                    {meal.title}
                  </h4>
                </div>
                <span className="text-sm text-muted-foreground">
                  {meal.time} · {meal.calories} kcal
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {meal.items.slice(0, 3).map((item, i) => (
                    <span key={i} className="text-xs text-muted-foreground">
                      {item}{i < Math.min(meal.items.length, 3) - 1 && ","}
                    </span>
                  ))}
                  {meal.items.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{meal.items.length - 3}</span>
                  )}
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </AppContent>

      <BottomNavigation />
    </AppShell>
  );
};

export default Diet;
