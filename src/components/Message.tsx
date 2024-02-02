import { Imessage, useMessage } from "@/lib/store/messages";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";

export default function Message({ message }: { message: Imessage }) {
  const user = useUser((state) => state.user);
  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users?.avatar_url!}
          alt={message.users?.display_name!}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold">{message.users?.display_name}</h2>
            <h4 className="text-gray-400 text-sm ">
              {new Date(message.created_at).toLocaleTimeString()}
            </h4>
            {message.is_edit && (
              <h1 className="text-sm text-gray-400">(Edited)</h1>
            )}
          </div>
          {message.users?.id === user?.id && <MessageMenu message={message} />}
        </div>
        <p className="text-gray-300 pr-4">{message.text}</p>
      </div>
    </div>
  );
}

const MessageMenu = ({ message }: { message: Imessage }) => {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-delete")?.click();
            setActionMessage(message);
          }}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-edit")?.click();
            setActionMessage(message);
          }}
        >
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
