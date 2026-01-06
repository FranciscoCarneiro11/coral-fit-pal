import React from "react";
import { Dumbbell, Play, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface WorkoutPlan {
  days?: Array<{
    day: string;
    focus: string;
    exercises?: Array<{
      name: string;
      sets?: number;
      reps?: string;
    }>;
  }>;
}

interface TodayWorkoutCardProps {
  workoutPlan: WorkoutPlan | null;
  className?: string;
}

const getDayName = () => {
  const days = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  return days[new Date().getDay()];
};

export const TodayWorkoutCard: React.FC<TodayWorkoutCardProps> = ({
  workoutPlan,
  className,
}) => {
  const navigate = useNavigate();
  const todayName = getDayName();

  // Find today's workout
  const todayWorkout = workoutPlan?.days?.find(
    (d) => d.day.toLowerCase().includes(todayName) || 
           d.day.toLowerCase() === todayName
  );

  const handleStartWorkout = () => {
    navigate("/workout");
  };

  if (!workoutPlan || !todayWorkout) {
    return (
      <div className={cn("bg-card rounded-2xl p-5 border border-border/50", className)}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-emerald-500/10">
            <Dumbbell className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="font-semibold text-foreground">Treino de Hoje</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Nenhum treino agendado para hoje. Gere seu plano na aba Treino.
        </p>
        <button
          onClick={handleStartWorkout}
          className="w-full py-2.5 bg-muted text-foreground rounded-xl font-medium text-sm hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
        >
          <Dumbbell className="w-4 h-4" />
          Ver Treinos
        </button>
      </div>
    );
  }

  const isRestDay = todayWorkout.focus.toLowerCase().includes("descanso") || 
                    todayWorkout.focus.toLowerCase().includes("rest");

  return (
    <div className={cn("bg-card rounded-2xl p-5 border border-border/50 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10">
            <Dumbbell className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Treino de Hoje</h3>
            <span className="text-xs text-muted-foreground capitalize">{todayName}</span>
          </div>
        </div>
        <button
          onClick={handleStartWorkout}
          className="text-emerald-500 text-sm font-medium flex items-center gap-0.5 hover:underline"
        >
          Ver plano
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className={cn(
        "rounded-xl p-4",
        isRestDay ? "bg-muted/30" : "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Foco</span>
            <h4 className="font-semibold text-foreground text-lg">{todayWorkout.focus}</h4>
          </div>
          {!isRestDay && todayWorkout.exercises && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {todayWorkout.exercises.length} exercícios
            </span>
          )}
        </div>

        {!isRestDay && todayWorkout.exercises && todayWorkout.exercises.length > 0 && (
          <div className="space-y-1 mb-4">
            {todayWorkout.exercises.slice(0, 3).map((ex, i) => (
              <p key={i} className="text-xs text-muted-foreground">
                • {ex.name} {ex.sets && ex.reps ? `(${ex.sets}x${ex.reps})` : ""}
              </p>
            ))}
            {todayWorkout.exercises.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{todayWorkout.exercises.length - 3} mais...
              </p>
            )}
          </div>
        )}

        {!isRestDay ? (
          <button
            onClick={handleStartWorkout}
            className="w-full py-2.5 bg-emerald-500 text-white rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Iniciar Treino
          </button>
        ) : (
          <p className="text-sm text-center text-muted-foreground py-2">
            💤 Dia de recuperação - descanse bem!
          </p>
        )}
      </div>
    </div>
  );
};
