"use client";
import React from "react";
import { Button } from "./ui/button";
import SupabaseBrowserClient from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPressence from "./ChatPressence";
import { AtSignIcon, GithubIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatHeader({ user }: { user: User | undefined }) {
  const router = useRouter();

  const handleGithubLogin = async () => {
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

  const handleGoogleLogin = async () => {
    const supabase = SupabaseBrowserClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
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
        <div>
          <h1 className="text-2xl font-bold">
            Type <span className=" text-white/70">::</span> chat
          </h1>
          <ChatPressence />
        </div>

        {!user ? (
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className=" outline-none">
                <Button>Login</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-1">
                {/* <DropdownMenuLabel>Action</DropdownMenuLabel> */}
                <DropdownMenuItem
                  className="border text-sm"
                  onClick={handleGoogleLogin}
                >
                  <AtSignIcon className="p-1 mr-1" /> Login Google
                </DropdownMenuItem>{" "}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="border text-sm"
                  onClick={handleGithubLogin}
                >
                  <GithubIcon className="p-1 mr-1" /> Login Github
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button onClick={handleGithubLogin}></Button>
            <Button onClick={handleGoogleLogin}>
              <AtSignIcon className="mr-2" /> Login Google
            </Button> */}
          </div>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </div>
  );
}
