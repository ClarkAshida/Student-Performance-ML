import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  default: "bg-jade-100 text-jade-700 border-jade-200",
  secondary: "bg-gray-100 text-text-body border-gray-200",
  success: "bg-success/10 text-success-dark border-success/20",
  warning: "bg-warning/10 text-warning-dark border-warning/20",
  error: "bg-danger/10 text-danger-dark border-danger/20",
  info: "bg-text-primary/10 text-text-primary border-text-primary/20",
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-body font-medium rounded-full border",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
