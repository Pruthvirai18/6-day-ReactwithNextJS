import {createClient} from '@supabase/supabase-js';

const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export async function signInWithGoogle(){
    const {user,error}=await supabase.auth.signInWithOAuth({provider:'googe'});
    if(error) throw error;
    return user;
}
export async function signOut() {
    await supabase.auth.signOut();
    
}