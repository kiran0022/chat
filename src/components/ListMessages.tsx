"use client";
import { Imessage, useMessage } from "@/lib/store/messages";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import DeleteAlert, { EditAlert } from "./MessageAction";
import SupabaseBrowserClient from "@/lib/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
import LoadmoreMessages from "./LoadmoreMessages";

export default function ListMessages() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [userScorlled, setuserScorlled] = useState(false);
  const [notification, setNotification] = useState(0);
  const {
    messages,
    addMessage,
    optimisticIds,
    optimisticDeleteMessage,
    optimisticUpdateMessage,
  } = useMessage((state) => state);
  const supabase = SupabaseBrowserClient();
  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.id)) {
            console.log("Change received!", payload);
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();

            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              console.log("newMessage", newMessage);
              addMessage(newMessage as Imessage);
            }
          }
          const scrollContainer = scrollRef.current;
          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            setNotification((current) => current + 1);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          console.log(payload);
          optimisticDeleteMessage(payload.old.id);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          optimisticUpdateMessage(payload.new as Imessage);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer && !userScorlled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;

      setuserScorlled(isScroll);

      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
      ) {
        setNotification(0);
      }
    }
  };

  const scrollDown = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  return (
    <>
      <div
        className=" flex-1 flex flex-col p-5 h-full overflow-y-auto "
        ref={scrollRef}
        onScroll={handleOnScroll}
      >
        <div className="flex-1 justify-center flex pb-5">
          <LoadmoreMessages />
        </div>
        <div className="space-y-7 ">
          {messages.map((text_content, _idx) => (
            <Message key={_idx} message={text_content} />
          ))}
        </div>

        <DeleteAlert />
        <EditAlert />
      </div>

      {userScorlled && (
        <div className=" absolute bottom-20 w-full">
          {notification ? (
            <div
              className=" w-36 items-center text-center mx-auto bg-violet-600 p-1 rounded-md cursor-pointer hover:scale-105"
              onClick={scrollDown}
            >
              <h1>{notification} new messages</h1>
            </div>
          ) : (
            <div
              className="w-10 h-10 bg-violet-700 rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
              onClick={scrollDown}
            >
              <ArrowDown />
            </div>
          )}
        </div>
      )}
    </>
  );
}
