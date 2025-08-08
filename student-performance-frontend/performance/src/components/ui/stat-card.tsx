import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "default" | "success" | "warning" | "error" | "primary";
  className?: string;
}

const colorClasses = {
  default: {
    icon: "text-gray-500",
    accent: "text-gray-700",
  },
  success: {
    icon: "text-success",
    accent: "text-success-dark",
  },
  warning: {
    icon: "text-warning",
    accent: "text-warning-dark",
  },
  error: {
    icon: "text-error",
    accent: "text-error-dark",
  },
  primary: {
    icon: "text-brand-primary",
    accent: "text-brand-primary",
  },
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "default",
  className,
}) => {
  const colors = colorClasses[color];

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-body font-medium text-gray-600">{title}</h3>
        {Icon && <Icon className={cn("h-5 w-5", colors.icon)} />}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span
              className={cn("text-3xl font-heading font-bold", colors.accent)}
            >
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium px-2 py-1 rounded-full",
                  trend.isPositive
                    ? "text-success bg-success/10"
                    : "text-error bg-error/10"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
