"use client";

//core
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput = ({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}: MessageInputProps) => {
  return (
    <div className="relative w-full ">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};
export default MessageInput;
