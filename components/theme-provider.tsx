/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserDetailContext";
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { user } = useUser();
  const { setUserDetail } = useContext(UserContext);

  const createUser = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/user", {});
      setUserDetail(data);
    } catch (error: any) {
      console.log("Error", error);
    }
  }, [setUserDetail]);

  useEffect(() => {
    if (user) {
      createUser();
    }
  }, [createUser, user]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
