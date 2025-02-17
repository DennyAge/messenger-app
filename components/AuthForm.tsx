"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthSocialButton from "@/components/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "SIGNIN" | "SIGNUP";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("SIGNIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "SIGNIN") {
      setVariant("SIGNUP");
    } else {
      setVariant("SIGNIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === "SIGNUP") {
    }
    if (variant === "SIGNIN") {
    }

    try {
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const socialActions = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "SIGNUP" && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "SIGNIN" ? "Sign in" : "Sign Up"}
            </Button>
          </div>
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialActions("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialActions("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "SIGNIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "SIGNIN" ? "Sign up" : "Sing in"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
