import React, { useMemo } from "react";
import { TrendingDown, TrendingUp, Minus, Scale } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface WeightProgressChartProps {
  currentWeight: number | null;
  targetWeight: number | null;
  startingWeight: number | null;
  className?: string;
}

export const WeightProgressChart: React.FC<WeightProgressChartProps> = ({
  currentWeight,
  targetWeight,
  startingWeight,
  className,
}) => {
  // Generate mock data for the last 30 days based on starting and current weight
  const chartData = useMemo(() => {
    const start = startingWeight || currentWeight || 70;
    const current = currentWeight || start;
    const days = 30;
    const data = [];

    for (let i = 0; i < days; i++) {
      const progress = i / (days - 1);
      const baseWeight = start + (current - start) * progress;
      // Add slight random variation
      const variation = (Math.random() - 0.5) * 0.6;
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      data.push({
        day: date.getDate(),
        weight: Math.round((baseWeight + variation) * 10) / 10,
        date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
      });
    }
    
    // Ensure last point is exactly current weight
    if (data.length > 0) {
      data[data.length - 1].weight = current;
    }

    return data;
  }, [currentWeight, startingWeight]);

  const weightChange = (currentWeight || 0) - (startingWeight || currentWeight || 0);
  const isLosing = weightChange < 0;
  const isGaining = weightChange > 0;

  const TrendIcon = isLosing ? TrendingDown : isGaining ? TrendingUp : Minus;
  const trendColor = isLosing ? "text-emerald-500" : isGaining ? "text-red-500" : "text-muted-foreground";

  if (!currentWeight) {
    return null;
  }

  return (
    <div className={cn("bg-card rounded-2xl p-5 border border-border/50", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Scale className="w-5 h-5 text-violet-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Progresso de Peso</h3>
            <span className="text-xs text-muted-foreground">Últimos 30 dias</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground">{currentWeight}</span>
            <span className="text-sm text-muted-foreground">kg</span>
          </div>
          {startingWeight && startingWeight !== currentWeight && (
            <div className={cn("flex items-center gap-0.5 text-xs", trendColor)}>
              <TrendIcon className="w-3 h-3" />
              <span>{Math.abs(weightChange).toFixed(1)}kg</span>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-32 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 1', 'dataMax + 1']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              width={35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value} kg`, "Peso"]}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.date;
                }
                return label;
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Target indicator */}
      {targetWeight && (
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Meta</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{targetWeight} kg</span>
            {currentWeight && (
              <span className="text-xs text-muted-foreground">
                ({Math.abs(currentWeight - targetWeight).toFixed(1)}kg restantes)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
