"use client";

//core
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
//helpers
import { cn } from "@/lib/utils";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-700 mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={cn(
          `
            form-input
            block
            w-full
            rounded-md 
            border-0
            py-2
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-primary
            sm:text-sm
            sm:leading-6
          `,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default",
        )}
      />
    </div>
  );
};
export default Input;
