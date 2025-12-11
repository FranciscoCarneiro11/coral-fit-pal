import React, { useState } from "react";
import { AppShell, AppHeader, AppContent } from "@/components/layout/AppShell";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { Clock, Flame, Play, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekDay {
  day: number;
  label: string;
  completed: boolean;
  isToday: boolean;
}

interface WorkoutItem {
  id: string;
  title: string;
  dayLabel: string;
  exercises: number;
  duration: string;
  calories: number;
  isToday: boolean;
}

const Workout: React.FC = () => {
  const [weekDays] = useState<WeekDay[]>([
    { day: 1, label: "Seg", completed: true, isToday: false },
    { day: 2, label: "Ter", completed: true, isToday: false },
    { day: 3, label: "Qua", completed: false, isToday: true },
    { day: 4, label: "Qui", completed: false, isToday: false },
    { day: 5, label: "Sex", completed: false, isToday: false },
    { day: 6, label: "Sáb", completed: false, isToday: false },
    { day: 7, label: "Dom", completed: false, isToday: false },
  ]);

  const todayWorkout = {
    title: "Pernas & Glúteos",
    duration: "55 min",
    calories: 400,
  };

  const allWorkouts: WorkoutItem[] = [
    { id: "1", title: "Peito & Tríceps", dayLabel: "Se", exercises: 6, duration: "45 min", calories: 320, isToday: false },
    { id: "2", title: "Costas & Bíceps", dayLabel: "Te", exercises: 7, duration: "50 min", calories: 350, isToday: false },
    { id: "3", title: "Pernas & Glúteos", dayLabel: "Qu", exercises: 8, duration: "55 min", calories: 400, isToday: true },
    { id: "4", title: "Ombros & Core", dayLabel: "Qu", exercises: 6, duration: "40 min", calories: 280, isToday: false },
    { id: "5", title: "Treino Full Body", dayLabel: "Se", exercises: 10, duration: "60 min", calories: 450, isToday: false },
    { id: "6", title: "Cardio & HIIT", dayLabel: "Sá", exercises: 5, duration: "30 min", calories: 300, isToday: false },
    { id: "7", title: "Descanso Ativo", dayLabel: "Do", exercises: 3, duration: "20 min", calories: 100, isToday: false },
  ];

  const completedCount = weekDays.filter(d => d.completed).length;

  return (
    <AppShell>
      <AppHeader title="Plano de Treino" />

      <AppContent className="pb-28">
        <p className="text-muted-foreground mb-6">Semana 1 de 12</p>

        {/* Week Progress Card */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-foreground">Progresso da Semana</span>
            <span className="text-primary font-semibold">{completedCount}/7 treinos</span>
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

        {/* Today's Workout Highlight */}
        <div className="bg-primary rounded-2xl p-5 shadow-card mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Play className="w-7 h-7 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="flex-1">
              <span className="text-primary-foreground/80 text-sm">Treino de Hoje</span>
              <h3 className="text-xl font-bold text-primary-foreground">{todayWorkout.title}</h3>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-primary-foreground/80">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{todayWorkout.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-primary-foreground/80">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm">{todayWorkout.calories} kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Workouts List */}
        <h3 className="font-semibold text-foreground mb-4">Todos os Treinos</h3>
        
        <div className="space-y-3">
          {allWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-4"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center font-semibold",
                workout.isToday ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {workout.dayLabel}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">{workout.title}</h4>
                  {workout.isToday && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Hoje
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {workout.exercises} exercícios · {workout.duration}
                </span>
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

export default Workout;
