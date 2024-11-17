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

  const [isGameOver, setIsGameOver] = useState(false)

  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)

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

    if(lastThreeX.length > 1) {
      if (functions.validateWin([...lastThreeX, id].slice(-3))) {
        setGameboard(functions.setWinningTiles(updatedGameboard, [...lastThreeX, id].slice(-3)))
        setXWins(xWins + 1)
        setIsGameOver(true)
        return
      }
    }

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

    if(lastThreeO.length > 1) {
      if (functions.validateWin([...lastThreeO, cpuId].slice(-3))) {
        setGameboard(
          functions.setWinningTiles(
            functions.changeGameboardArr(
              updatedGameboard,
              x,
              o,
              cpuId,
              numTurns + 1,
              eliminatedO
        ), [...lastThreeO, cpuId].slice(-3)))
        setOWins(oWins + 1)
        setIsGameOver(true)
        return
      }
    }
    setNumTurns(numTurns + 2);
  };

  const restart = () => {
    setGameboard(functions.getGameBoard());
    setLastThreeX([]);
    setLastThreeO([]);
    setNumTurns(2);
    setIsGameOver(false);
  }

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
        x,
        o,
        isGameOver,
        xWins,
        oWins,
        restart
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
