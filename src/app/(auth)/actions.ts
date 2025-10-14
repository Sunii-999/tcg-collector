'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

// ... existing login function remains unchanged ...

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Supabase Login Error:', error.message)
    // CRITICAL FIX: Redirect to an error page or the login page with a parameter
    // Here, we'll redirect back to a login page, perhaps /login?error=true
    redirect('/sign-in?error=true') 
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// ---------------------------------------------------

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string | null,
    avatar_url: formData.get('avatar_url') as string | null,
  }


const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
  email: data.email,
  password: data.password,
  // ADD THIS OPTIONS BLOCK to store username in metadata
  options: {
    data: {
      username: data.username,
      avatar_url: data.avatar_url,
    },
  },
})

// ... rest of the signup function ...

  if (signUpError) {
    console.error('Supabase Signup Error:', signUpError.message)
    redirect('/error')
  }

  // Check if a user was successfully created (sometimes data.user might be null if email confirmation is required)
  const user = signUpData.user || signUpData.session?.user

  if (user) {
    // 2. Insert user details into public.users table
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        username: data.username,
        avatar_url: data.avatar_url,
        created_at: new Date().toISOString(),

      })

    if (insertError) {
      console.error('Supabase Insert User Data Error:', insertError.message)
    }
  }

  // 3. Redirect and revalidate
  revalidatePath('/', 'layout')
  redirect('/')
}


export async function signout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Supabase Signout Error:', error.message)
    // You might choose to redirect to an error page or just continue
    // if the signout failed but you still want to treat the user as logged out locally.
  }

  // Clear any cached data and redirect the user to the home page (or login page)
  revalidatePath('/', 'layout')
  redirect('/') // Redirect to the public home page or your login route
}