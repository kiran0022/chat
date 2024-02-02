"use client";
import { useUser } from "@/lib/store/user";
import SupabaseBrowserClient from "@/lib/supabase/browser";
import React, { useEffect, useState } from "react";

export default function ChatPressence() {
  const user = useUser((state) => state.user);
  const [onlineUser, setonlineUser] = useState(0);
  const supabase = SupabaseBrowserClient();
  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setonlineUser([...new Set(userIds)].length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);
  if (!user) {
    return <div className=" h-3 w-1"></div>;
  }
  return (
    <div className=" flex items-center gap-2 ">
      <div className=" w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
      <p className="text-sm">{onlineUser} online</p>
    </div>
  );
}
