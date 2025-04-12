"use client"

import supabase  from "@/app/lib/supabase";

export default function LoginButton(){
    async function signInWithGooogle() {
        const {error}=await supabase.auth.signInWithGooogle({
            provider:"google",
        });
        if (error) console.error("Login error:",error);
        }
        return(
            <button
            onClick={signInWithGooogle}
            className="p-2 bg-blue-500 text-white rounded-lg"
            >
                Sign In WithGooogle
            </button>
        );
        
}
