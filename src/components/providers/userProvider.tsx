import { ReactNode, useState } from "react";
import { UserProviderContext } from "../../functions/providerContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [didEnterName, setDidEnterName] = useState(false);
  const [name, setName] = useState("");
  return (
    <UserProviderContext.Provider
      value={{
        didEnterName,
        setDidEnterName,
        name,
        setName,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
