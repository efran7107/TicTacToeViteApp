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

const changeGameboardArr = (
  gameboard: Array<gameTile>,
  x: string,
  o: string,
  id: number,
  turns: number
) => {
  return gameboard.map((tile) => {
    if (tile.id === id) {
      return { ...tile, owner: turns % 2 === 0 ? x : o };
    } else {
      return tile;
    }
  });
};

export const functions = {
  getGameBoard,
  changeGameboardArr,
};
