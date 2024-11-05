import { ReactNode, useState } from "react";
import { UserProviderContext } from "../../functions/providerContext";
import { functions } from "../../functions/functions";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [didEnterName, setDidEnterName] = useState(false);
  const [name, setName] = useState("");
  const [gameboard, setGameboard] = useState(functions.getGameBoard());
  const [lastThreeO, setLastThreeO] = useState<number[]>([]);
  const [lastThreeX, setLastThreeX] = useState<number[]>([]);
  const [numTurns, setNumTurns] = useState(2);

  const x = "\uf00d";
  const o = "\u004f";

  const changeTile = (id: number) => {
    if (gameboard[id].owner !== "") {
      return;
    }
    const updatedGameboard = functions.changeGameboardArr(
      gameboard,
      x,
      o,
      id,
      numTurns
    );
  };

  return (
    <UserProviderContext.Provider
      value={{
        didEnterName,
        setDidEnterName,
        name,
        setName,
        gameboard,
        setGameboard,
        changeTile,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
