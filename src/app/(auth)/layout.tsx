"use client";

import { ReactNode } from "react";
import PromotionalContent from "@/components/auth/promotional-content";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 overflow-x-hidden">
      {/* Left side - Auth Form */}
      <div className="flex flex-col bg-background">
        <div className="p-4 md:p-6 pb-0">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={180}
            className="w-32 md:w-48 lg:w-56"
          />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-8 md:py-0">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>

      <PromotionalContent />
    </div>
  );
};

export default AuthLayout;
