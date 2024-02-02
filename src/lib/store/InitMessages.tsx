"use client";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";
import { Imessage, useMessage } from "./messages";
import { LIMIT_MESSAGE } from "../constant";

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGE;
  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
      // console.log(useUser.getState());
    }

    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
