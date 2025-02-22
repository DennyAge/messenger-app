//core
import Image from "next/image";
//components
import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <div
      className="flex min-h-full flex-col
      justify-center py-12 sm:px-6 lg:px-8 bg-gray-100"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="logo"
          width="50"
          height="50"
          className="mx-auto w-auto"
        />
        <h3 className="mt-4 text-center text-3xl font-bold text-gray-800 tracking-tight">
          Sing in to your account
        </h3>
      </div>
      <AuthForm />
    </div>
  );
}
