import { ReactNode, useState } from "react";
import { UserProviderContext } from "../../functions/providerContext";
import { functions } from "../../functions/functions";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [didEnterName, setDidEnterName] = useState(false);
  const [name, setName] = useState("");
  const [gameboard, setGameboard] = useState(functions.getGameBoard());
  const [lastThree, setLastThree] = useState([]);
  const [numTurns, setNumTurns] = useState(1);

  const x = "\uf00d";
  const o = "\u004f";

  const changeTile = (id: number) => {
    if (numTurns < 4) {
      const userTile = gameboard[id].id;
      const availableTiles = gameboard.filter((tile) => tile.id !== id);

      const cpuChoice =
        availableTiles[Math.floor(Math.random() * availableTiles.length)].id;
    }
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
