"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { ROUTES } from "@/constants/routes";

import { useAuth } from "@/hooks/use-auth";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, isLoggingIn, googleLogin, isGoogleLoggingIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(ROUTES.CHAT.ROOT);
    }
  }, [user, router]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };



  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
        <Card className="border-border/70 bg-card/80 w-full shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Logo and Header */}
              <motion.div
                className="space-y-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl text-primary-foreground font-bold tracking-tight md:text-4xl">
                    Login
                  </span>
                </div>
                <p className="text-primary-foreground text-sm">
                  Log in to your account to start analyzing your data.
                </p>
              </motion.div>
              {/* Username/Email Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                <Label htmlFor="username" className="text-primary-foreground">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}>
                <Label htmlFor="password" className="text-primary-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>
              {/* Forgot Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
                <Link
                  href={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="flex justify-end text-xs text-destructive font-bold hover:underline">
                  Forgot password?
                </Link>
              </motion.div>
              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Button variant="destructive" className="w-full" type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </form>
            {/* Divider */}
            <motion.div
              className="relative my-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="border-primary-foreground w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-destructive text-primary-foreground px-2">
                  OR
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              className="flex justify-center w-full"
            >
              <div className="w-full [&_iframe]:w-full! [&_iframe]:min-w-full!">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      googleLogin(credentialResponse.credential);
                    }
                  }}
                  onError={() => {
                    toast.error("Google Login failed");
                  }}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                  width="100%"
                />
              </div>
            </motion.div>

            {/* Footer Links */}
            <motion.p
              className="text-center text-sm text-destructive pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}>
              Don't have an account?{" "}
              <Link
                href={ROUTES.AUTH.SIGNUP}
                className="text-primary-foreground font-bold hover:underline transition-all">
                Sign up
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
