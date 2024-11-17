import { gameTile } from "../types/types";

const getGameBoard = (): Array<gameTile> => {
  const tiles = [];
  for (let i = 0; i < 9; i++) {
    tiles.push({
      id: i,
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
  turns: number,
  eliminatedId: number
): gameTile[] => {
  if (turns < 8) {
    return gameboard.map((tile) => {
      if (tile.id === id) {
        return { ...tile, owner: turns % 2 === 0 ? x : o };
      } else {
        return tile;
      }
    });
  }

  return gameboard.map((tile) => {
    if (tile.id === id) {
      return { ...tile, owner: turns % 2 === 0 ? x : o };
    } else if (tile.id === eliminatedId) {
      return { ...tile, owner: "" };
    } else {
      return tile;
    }
  });
};

const validateWin = (playedTiles: number[]): boolean => {
  const sortedTiles = playedTiles.sort((a, b) => a - b);
  const [a, b, c] = sortedTiles;
  if (
    (a === 0 && b === 1 && c === 2) ||
    (a === 3 && b === 4 && c === 5) ||
    (a === 6 && b === 7 && c === 8) ||
    (a === 0 && b === 3 && c === 6) ||
    (a === 1 && b === 4 && c === 7) ||
    (a === 2 && b === 5 && c === 8) ||
    (a === 0 && b === 4 && c === 8) ||
    (a === 2 && b === 4 && c === 6)
  ) {
    return true;
  } else {
    return false;
  }
};

const winningCombinations = (gameboard: Array<gameTile>): Array<gameTile[]> => {
  return [
    gameboard.filter((tile) => tile.id === 0 || tile.id === 1 || tile.id === 2),
    gameboard.filter((tile) => tile.id === 3 || tile.id === 4 || tile.id === 5),
    gameboard.filter((tile) => tile.id === 6 || tile.id === 7 || tile.id === 8),
    gameboard.filter((tile) => tile.id === 0 || tile.id === 3 || tile.id === 6),
    gameboard.filter((tile) => tile.id === 1 || tile.id === 4 || tile.id === 7),
    gameboard.filter((tile) => tile.id === 2 || tile.id === 5 || tile.id === 8),
    gameboard.filter((tile) => tile.id === 0 || tile.id === 4 || tile.id === 8),
    gameboard.filter((tile) => tile.id === 2 || tile.id === 4 || tile.id === 6),
  ];
};

const buttonClass = (tileOwner: string, x: string, o: string): string => {
  if(tileOwner === x){
    return 'x-owner'
  }else if(tileOwner === o){
    return 'o-owner'
  }
  return ''
}

export const functions = {
  getGameBoard,
  changeGameboardArr,
  validateWin,
  winningCombinations,
  buttonClass
};
