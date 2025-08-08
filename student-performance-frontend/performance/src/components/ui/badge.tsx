import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  default: "bg-gray-100 text-gray-700 border-gray-200",
  success: "bg-success/10 text-success-dark border-success/20",
  warning: "bg-warning/10 text-warning-dark border-warning/20",
  error: "bg-error/10 text-error-dark border-error/20",
  info: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
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
