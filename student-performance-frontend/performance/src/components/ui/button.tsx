import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-body transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-jade-400",
  {
    variants: {
      variant: {
        default:
          "bg-jade-500 text-white shadow-soft hover:bg-jade-600 focus-visible:ring-jade-400",
        secondary:
          "bg-gray-100 text-text-body shadow-soft hover:bg-gray-200 focus-visible:ring-gray-300",
        success:
          "bg-success text-white shadow-soft hover:bg-success-dark focus-visible:ring-success-light",
        danger:
          "bg-danger text-white shadow-soft hover:bg-danger-dark focus-visible:ring-danger-light",
        warning:
          "bg-warning text-white shadow-soft hover:bg-warning-dark focus-visible:ring-warning-light",
        outline:
          "border border-gray-300 bg-surface-card text-text-body shadow-soft hover:bg-gray-50 focus-visible:ring-jade-400",
        ghost: "text-text-body hover:bg-gray-100 focus-visible:ring-jade-400",
        link: "text-jade-600 underline-offset-4 hover:underline hover:text-jade-700",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
