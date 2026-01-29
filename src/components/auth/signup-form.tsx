"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";

import { useAuth } from "@/hooks/use-auth";
import { GoogleLogin } from "@react-oauth/google";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, register, isRegistering, googleLogin } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(ROUTES.CHAT.ROOT);
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    register({
      username,
      email,
      password,
      password_confirm: passwordConfirm,
      first_name: firstName,
      last_name: lastName,
    });
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
          <CardContent className="space-y-4 p-6 md:p-8">
            {/* Logo and Header */}
            <motion.div
              className="space-y-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-primary-foreground tracking-tight md:text-4xl">
                  Sign Up
                </span>
              </div>
              <p className="text-primary-foreground text-sm">
                Create an account to start analyzing your data with AI.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                  <Label
                    htmlFor="firstName"
                    className="text-primary-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 bg-primary-foreground border-muted-foreground/10 transition-all"
                  />
                </motion.div>
                {/* Last Name */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                  <Label htmlFor="lastName" className="text-primary-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 bg-primary-foreground border-muted-foreground/10 transition-all"
                  />
                </motion.div>
              </div>

              {/* Username Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}>
                <Label htmlFor="username" className="text-primary-foreground">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" />
                  <Input
                    id="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 h-11 bg-primary-foreground border-muted-foreground/10 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}>
                <Label htmlFor="email" className="text-primary-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
                <Label htmlFor="password" className="text-primary-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              {/* Password Confirm Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
                <Label
                  htmlFor="passwordConfirm"
                  className="text-primary-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="passwordConfirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="pl-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Button
                  variant="destructive"
                  type="submit"
                  className="w-full font-bold"
                  disabled={isRegistering}>
                  {isRegistering ? "Creating account..." : "Sign up"}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}>
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
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
              className="flex justify-center w-full">
              {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? (
                <div className="w-full [&_iframe]:w-full! [&_iframe]:min-w-full!">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        googleLogin(credentialResponse.credential);
                      }
                    }}
                    onError={() => {
                      toast.error("Google Signup failed");
                    }}
                    theme="filled_black"
                    shape="pill"
                    width="100%"
                  />
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 rounded-full bg-[#131314] hover:bg-[#202124] text-white border-none flex items-center justify-center gap-3 transition-colors px-4"
                  onClick={() =>
                    toast.error(
                      "Google Signup is not configured. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your environment.",
                    )
                  }>
                  <div className="bg-white p-1 rounded-full flex items-center justify-center w-5 h-5">
                    <Image
                      src="/logos/common/google.svg"
                      alt="Google"
                      width={14}
                      height={14}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    Sign up with Google
                  </span>
                </Button>
              )}
            </motion.div>

            <motion.p
              className="text-center text-sm text-destructive pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}>
              Already have an account?{" "}
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-primary-foreground font-bold hover:underline transition-all">
                Login
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
