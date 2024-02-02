import React from "react";

export default function ChatAbout() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="font-bold text-3xl">Welcome to Type chat</h1>
        <p className=" w-96">
          Chat application with supabase realtime db. <br />
          Login to send message
        </p>
      </div>{" "}
    </div>
  );
}
