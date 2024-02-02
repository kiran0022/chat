"use client";
import React from "react";
import { Button } from "./ui/button";
import SupabaseBrowserClient from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPressence from "./ChatPressence";

export default function ChatHeader({ user }: { user: User | undefined }) {
  const router = useRouter();

  const handleLogin = async () => {
    const supabase = SupabaseBrowserClient();

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
        //below is example for next config url for custom ui page after login
        // redirectTo: location.origin + "/auth/callback?next=/thankyou",
      },
    });
  };

  const handleLogout = async () => {
    const supabase = SupabaseBrowserClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="h-20">
      <div className="flex justify-between items-center border-b p-5 h-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            Type <span className=" text-white/70">::</span> chat
          </h1>
          <ChatPressence />
        </div>
        <div>
          {!user ? (
            <Button onClick={handleLogin}>Login</Button>
          ) : (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </div>
      </div>
    </div>
  );
}
