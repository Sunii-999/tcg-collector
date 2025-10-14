import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export default async function MyCollection() {
    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.getUser()

    if (authError || !authData?.user) {
        redirect('/sign-in')
    }

    const userId = authData.user.id
    let username: string | null = null
    
const { data: profileDataArray, error: profileError } = await supabase
        .from('users') // Assumes your public table is named 'users'
        .select('username')
        .eq('id', userId)

    

    if (profileError) {
    console.error('Error fetching public user profile:', profileError.message)
} else if (profileDataArray && profileDataArray.length > 0) {
    username = profileDataArray[0].username
}
    
    if (username === null)  {
        return <p>Hello</p>
    } else {
        return <p>Hello  {username}</p>
    }
}