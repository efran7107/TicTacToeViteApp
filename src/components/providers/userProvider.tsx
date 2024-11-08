import { ReactNode, useState } from "react";
import { UserProviderContext } from "../../functions/providerContext";
import { functions } from "../../functions/functions";
import { gameLogic } from "../../functions/gameLogic";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [didEnterName, setDidEnterName] = useState(false);
  const [name, setName] = useState("");
  const [gameboard, setGameboard] = useState(functions.getGameBoard());
  const [lastThreeO, setLastThreeO] = useState<number[]>([]);
  const [lastThreeX, setLastThreeX] = useState<number[]>([]);
  const [numTurns, setNumTurns] = useState(2);

  const { setXTile, setOTile, cpuChoice } = gameLogic;

  const x = "\uf00d";
  const o = "\u004f";

  const changeTile = (id: number) => {
    if (gameboard[id].owner !== "") {
      return;
    }

    const eliminatedX = lastThreeX[0];
    const eliminatedO = lastThreeO[0];

    setXTile(id, numTurns, lastThreeX, setLastThreeX);

    const updatedGameboard = functions.changeGameboardArr(
      gameboard,
      x,
      o,
      id,
      numTurns,
      eliminatedX
    );

    const cpuId = cpuChoice(updatedGameboard, numTurns + 1, x, o)!;
    setOTile(cpuId, numTurns, lastThreeO, setLastThreeO);

    setGameboard(
      functions.changeGameboardArr(
        updatedGameboard,
        x,
        o,
        cpuId,
        numTurns + 1,
        eliminatedO
      )
    );
    setNumTurns(numTurns + 2);
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
