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
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// ---------------------------------------------------

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    // Add optional fields, which we'll assume might be in the form data
    username: formData.get('username') as string | null,
    avatar_url: formData.get('avatar_url') as string | null,
  }

  // 1. Sign up the user in auth.users
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

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