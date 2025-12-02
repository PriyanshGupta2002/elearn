"use client";
import { createContext, useState } from "react";

type userContext = {
  userDetail: userDetail | undefined;
  setUserDetail: React.Dispatch<React.SetStateAction<userDetail | undefined>>;
};

export const UserContext = createContext<userContext>({
  userDetail: undefined,
  setUserDetail: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userDetail, setUserDetail] = useState<userDetail>();

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};
