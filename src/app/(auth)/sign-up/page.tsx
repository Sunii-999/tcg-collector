'use client'

import { signup } from '../actions' // Your Supabase server action
import { useState, useRef } from 'react'
import { useFormStatus } from 'react-dom' 

function SignInButton() {
  // useFormStatus is a Next.js/React hook to read the submission status of the parent <form>
  const { pending } = useFormStatus() 

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={`
        w-full py-3 mt-6 rounded-lg font-semibold text-lg transition-colors duration-200
        ${pending 
          ? 'bg-indigo-400 cursor-not-allowed' 
          : 'bg-[#351ED5] hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/50 hover:cursor-pointer'
        }
      `}
    >
      {pending ? 'Creating account ...' : 'Create account'}
    </button>
  )
}

export default function SignUp() {

  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSignUp = async (formData: FormData) => {
  setError(null)
  
  try {
    await signup(formData)
  } catch (e: unknown) {
    let errorMessage = 'An unknown sign-up error occurred.'

    if (e instanceof Error) {
      errorMessage = e.message
    } 
    else if (typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string') {
        errorMessage = e.message
    }
    
    setError(errorMessage)
  }
}

  
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-xl shadow-2xl border border-zinc-700">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create an account
        </h2>

        {/* Display Error Message */}
        {error && (
          <div 
            role="alert" 
            className="p-3 mb-4 text-sm text-red-100 bg-red-600 rounded-lg shadow-md"
          >
            {error}
          </div>
        )}

        <form ref={formRef} action={handleSignUp} className="space-y-4">
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              required
              autoComplete="username"
              placeholder="cardCollector"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />

            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>

          {/* Password Input Group */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>
          
          {/* Submission Button with Loading State */}
          <SignInButton />

          {/* Forgot Password Link */}
          <div className="text-center pt-2">
            <a href="/sign-up" className="text-sm text-indigo-400 hover:text-indigo-300">
              Don&apos;t have an account? Sign up here
            </a>
          </div>
          
        </form>
      </div>
    </div>
  )
}
