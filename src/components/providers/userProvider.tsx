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
    const userTile = gameboard[id].id;
    const newLastThreeX = [...lastThreeX, userTile];
    const afterXturn = functions.changeGameboardArr(
      gameboard,
      x,
      o,
      userTile,
      numTurns
    );
    const availableTiles = afterXturn.filter((tile) => tile.owner === "");
    let cpuChoice: number;
    const oTurnNumb = numTurns + 1;
    if (oTurnNumb < 5) {
      if (availableTiles.filter((tile) => tile.id === 4).length > 0) {
        cpuChoice = 4;
        setLastThreeO([...lastThreeO, cpuChoice]);
        const cpuTurnArr = functions.changeGameboardArr(
          afterXturn,
          x,
          o,
          cpuChoice,
          oTurnNumb
        );
        setGameboard(cpuTurnArr);
        setNumTurns(oTurnNumb + 1);
        return;
      }
      cpuChoice =
        availableTiles[Math.floor(Math.random() * availableTiles.length)].id;

      setLastThreeO([...lastThreeO, cpuChoice]);
      const cpuTurnArr = functions.changeGameboardArr(
        afterXturn,
        x,
        o,
        cpuChoice,
        oTurnNumb
      );
      setGameboard(cpuTurnArr);
      setNumTurns(oTurnNumb + 1);
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
