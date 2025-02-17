"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
  children: ReactNode;
}
const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
