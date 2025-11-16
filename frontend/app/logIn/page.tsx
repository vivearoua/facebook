"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SocialButton from "@/components/SocialButton";
import { useRouter } from "next/navigation";
import handleLogin from "@/api/handleLogin";
import { Key } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLogin(email, password, router);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-400/20 animate-slow-spin left-10 bottom-10 blur-xl"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-700/20 to-cyan-400/20 animate-slow-spin reverse right-10 top-10 blur-xl"></div>
        <div className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 animate-pulse left-1/4 top-1/4 blur-2xl"></div>
      </div>

      {/* Main Container */}
      <div className="w-[90%] max-w-6xl h-[85%] bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl flex overflow-hidden border border-white/10 relative">
        {/* Left Section - Brand & Social Login */}
        <div className="flex-1 p-12 flex flex-col justify-center relative">
          <div className="absolute top-8 left-8">
            <h1 className="text-2xl  font-bold text-white">SocialApp</h1>
          </div>

          <div className="max-w-md mt-4">
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Welcome Back
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Connect with friends, share your journey, and explore
                communities in our innovative social platform designed for
                meaningful interactions.
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-4">
              <SocialButton
                iconSrc="/google-icon.png"
                alt="Google"
                text="Continue with Google"
                variant="google"
              />
              <SocialButton
                iconSrc="/Facebook_Logo_(2019).png"
                alt="Facebook"
                text="Continue with Facebook"
                variant="facebook"
              />
              <SocialButton
                iconSrc="/github_PNG40.png"
                alt="Github"
                text="Continue with Github"
                variant="github"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-gray-400 text-sm">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg p-12 flex flex-col justify-center border-l border-white/10">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-300">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-slate-200 mb-3 text-sm font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full py-4 px-5 text-gray-800 rounded-2xl bg-white/95 focus:bg-white border border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none shadow-lg transition-all duration-200 placeholder-gray-500"
                    aria-label="Email"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400">@</span>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-slate-200 mb-3 text-sm font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full py-4 px-5 text-gray-800 rounded-2xl bg-white/95 focus:bg-white border border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none shadow-lg transition-all duration-200 placeholder-gray-500"
                    aria-label="Password"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400">
                      <Key />
                    </span>
                  </div>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <Link
                  href="/signUp"
                  className="text-blue-300 hover:text-blue-200 font-semibold underline underline-offset-4 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
