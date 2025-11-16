"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import handleSignup from "@/api/handleSignup";
import { useRouter } from "next/navigation";
import OAuthSide from "@/components/sign-up/OAuthSide";
import { Key, User } from "lucide-react";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSignup(
      formData.fullName,
      formData.email,
      formData.password,
      router
    );
    setIsLoading(false);
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center 
    justify-center overflow-hidden bg-gradient-to-br
     from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-400/20 animate-slow-spin left-10 bottom-10 blur-xl"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-700/20 to-cyan-400/20 animate-slow-spin reverse right-10 top-10 blur-xl"></div>
        <div className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 animate-pulse left-1/4 top-1/4 blur-2xl"></div>
      </div>

      <div
        className="w-[90%] max-w-6xl h-[90%] bg-white/5 
      backdrop-blur-2xl shadow-2xl rounded-3xl flex overflow-hidden
       border border-white/10 relative"
      >
        <OAuthSide />


          <div className="flex-1 bg-white/10 backdrop-blur-lg p-12 flex flex-col justify-center border-l border-white/10">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-300">Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-slate-200 mb-3 text-sm font-semibold">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full py-4 px-5 text-gray-800 rounded-2xl bg-white/95 focus:bg-white border border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none shadow-lg transition-all duration-200 placeholder-gray-500"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400"><User/></span>
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-200 mb-3 text-sm font-semibold">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full py-4 px-5 text-gray-800 rounded-2xl bg-white/95 focus:bg-white border border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none shadow-lg transition-all duration-200 placeholder-gray-500"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">@</span>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-200 mb-3 text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full py-4 px-5 text-gray-800 rounded-2xl bg-white/95 focus:bg-white border border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none shadow-lg transition-all duration-200 placeholder-gray-500"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400"><Key /></span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link
              href="/logIn"
              className="text-blue-300 hover:text-blue-200 font-semibold underline underline-offset-4 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Terms Notice */}
        <p className="text-center text-gray-400 text-xs mt-4">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
        
      </div>
    </div>
  );
};

export default SignUpPage;
