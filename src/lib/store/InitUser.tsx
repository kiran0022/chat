"use client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";

export default function InitUser({ user }: { user: User | undefined }) {
  const initState = useRef(false);
  useEffect(() => {
    if (!initState.current) {
      useUser.setState({ user });
      // console.log(useUser.getState());
    }

    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
