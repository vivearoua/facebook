import Image from 'next/image'
import React from 'react'

const OAuthSide = () => {
  return (
   <div className="flex-1 p-12 flex flex-col justify-center relative">
          <div className="absolute top-8 left-8">
            <h1 className="text-2xl font-bold text-white">SocialApp</h1>
          </div>

          <div className="max-w-md">
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Join Our Community
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Create your account and start connecting with friends, sharing
                your journey, and exploring amazing communities in our
                innovative social platform.
              </p>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center p-4 rounded-2xl bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg font-medium">
                <div className="relative w-6 h-6 mr-3">
                  <Image
                    src="/google-icon.png"
                    alt="Google"
                    fill
                    className="object-contain"
                  />
                </div>
                Sign up with Google
              </button>

              <button className="w-full flex items-center justify-center p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg font-medium">
                <div className="relative w-6 h-6 mr-3">
                  <Image
                    src="/Facebook_Logo_(2019).png"
                    alt="Facebook"
                    fill
                    className="object-contain"
                  />
                </div>
                Sign up with Facebook
              </button>

              <button className="w-full flex items-center justify-center p-4 rounded-2xl bg-gray-800 text-white hover:bg-gray-900 border-2 border-gray-800 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg font-medium">
                <div className="relative w-6 h-6 mr-3">
                  <Image
                    src="/github_PNG40.png"
                    alt="GitHub"
                    fill
                    className="object-contain"
                  />
                </div>
                Sign up with GitHub
              </button>
            </div>

            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-gray-400 text-sm">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
          </div>
        </div>
  )
}

export default OAuthSide