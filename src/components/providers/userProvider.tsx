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
    if (lastThreeX.length === 3) {
      const newLastThreeX = [...lastThreeX, id].slice(-3);
      if (functions.validateWin(newLastThreeX)) {
        return;
      }
      setLastThreeX(newLastThreeX);
    } else {
      if (lastThreeX.length === 2) {
        const newLastThreeX = [...lastThreeX, id];
        if (functions.validateWin(newLastThreeX)) {
          return;
        }
      }
      setLastThreeX([...lastThreeX, id]);
    }

    const availableTiles = updatedGameboard.filter((tile) => tile.owner === "");
    let cpuChoice: number;

    if (numTurns + 1 < 4) {
      if (availableTiles.filter((tile) => tile.id === 4).length > 0) {
        cpuChoice = 4;
      } else {
        cpuChoice =
          availableTiles[Math.floor(Math.random() * availableTiles.length)].id;
      }
      setLastThreeO([...lastThreeO, cpuChoice]);
      setGameboard(
        functions.changeGameboardArr(
          updatedGameboard,
          x,
          o,
          cpuChoice,
          numTurns + 1
        )
      );
      setNumTurns(numTurns + 2);
      return;
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
