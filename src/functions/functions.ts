import { gameTile } from "../types/types";

const getGameBoard = (): Array<gameTile> => {
  const tiles = [];
  for (let i = 0; i < 9; i++) {
    tiles.push({
      id: i,
      value: i,
      owner: "",
    });
  }
  return tiles;
};

export const functions = {
  getGameBoard,
};
