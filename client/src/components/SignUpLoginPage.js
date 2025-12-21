import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const SignUpLoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
          {/* Portfolio Banner */}
          <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 shadow-lg z-50">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm sm:text-base font-medium">
                  Portfolio Project by{" "}
                  <a
                    href="https://kavenkim.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-green-200 transition-colors font-semibold"
                  >
                    Kaven Kim
                  </a>
                </span>
              </div>
              <a
                href="https://kavenkim.com/projects/project-crm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
              >
                <span>Learn More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="max-w-md w-full mt-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="mt-2 text-gray-600">Join our CRM platform today</p>
              </div>

              <SignUp />
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">Already have an account?</p>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Sign In Instead
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SignUpLoginPage;
