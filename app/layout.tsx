import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Messenger",
  description: "Create by @Denny_Age",
  icons: {
    icon: "/images/logo.png",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
};

export default RootLayout;
