"use client";
//core
import { ReactNode } from "react";
//helpers
import { cn } from "@/lib/utils";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
        flex justify-center rounded-md px-3 py-2 text-sm font-semibold
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border hover:shadow-md transition
      `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-primary hover:bg-primary/90 focus-visible:outline-primary/90",
      )}
    >
      {children}
    </button>
  );
};
export default Button;
