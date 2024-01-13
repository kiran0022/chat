import React from "react";
import { Button } from "./ui/button";

export default function ChatHeader() {
  return (
    <div className="h-20">
      <div className="flex justify-between items-center border-b p-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Type_chaT</h1>
          <div className=" flex items-center gap-2 ">
            <div className=" w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm">2 online</p>
          </div>
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}
