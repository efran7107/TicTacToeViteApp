import { gameTile } from "../types/types";
import { functions } from "./functions";

const setXTile = (
  id: number,
  turns: number,
  lastThreeX: Array<number>,
  setLastThreeX: (lastThreeX: number[]) => void
) => {
  if (turns < 6) {
    setLastThreeX([...lastThreeX, id]);
    return;
  }
  setLastThreeX([...lastThreeX, id].slice(-3));
};

const setOTile = (
  id: number,
  turns: number,
  lastThreeO: Array<number>,
  setLastThreeO: (lastThreeO: number[]) => void
) => {
  if (turns < 7) {
    setLastThreeO([...lastThreeO, id]);
    return;
  }
  setLastThreeO([...lastThreeO, id].slice(-3));
};

const cpuChoice = (
  updatedGameboard: Array<gameTile>,
  turns: number,
  x: string,
  o: string
): number => {
  const availableTiles = updatedGameboard.filter((tile) => tile.owner === "");

  if (turns < 4) {
    if (availableTiles.filter((tile) => tile.id === 4).length > 0) {
      return 4;
    }
    return availableTiles[Math.floor(Math.random() * availableTiles.length)].id;
  }

  const winningXCombinations = functions.winningCombinations(updatedGameboard).filter(
    (set) =>
      set.filter((tile) => tile.owner === x).length === 2 &&
      set.filter((tile) => tile.owner === o).length === 0
  );

  if (
    winningXCombinations.length > 0
  ) {
    return winningXCombinations[0]
      .filter((tile) => tile.owner === "")[0].id;
  }

  const winningOCombinations = functions.winningCombinations(updatedGameboard).filter(
    (set) =>
      set.filter((tile) => tile.owner === o).length === 2 &&
      set.filter((tile) => tile.owner === x).length === 0
  );
  if (
    winningOCombinations.length > 0
  ) {
    return winningOCombinations[0]
      .filter((tile) => tile.owner === "")[0].id;
  }

  return availableTiles[Math.floor(Math.random() * availableTiles.length)].id;
};



export const gameLogic = {
  setXTile,
  setOTile,
  cpuChoice,
};
