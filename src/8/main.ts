import { readFile } from "../utils";

function transpose(matrix: any[][]) {
  const rows = matrix.length, cols = matrix[0].length;
  const grid: any[][] = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  // console.log('transposing', matrix, grid);
  return grid;
}

function reverse(matrix: any[][]) {
  matrix.reverse();
  matrix.forEach(row => row.reverse());
}

function parseDataToMap<T>(data: string, value: T) {
  const rows = data.trim().split('\n');
  let grid: number[][] = [];
  let tracking: T[][] = [];

  // parse input
  rows.forEach(row => {
    const numbers = row.split('').map(row => parseInt(row));
    grid.push(numbers);
    tracking.push(Array(numbers.length).fill(value));
  });

  return { grid, tracking };
}

function getNumVisible(tracking: boolean[][]) {
  let numVisible = 0;
  tracking.forEach(row => {
    row.forEach(visible => {
      if (visible) numVisible += 1;
    });
  });

  return numVisible;
}

function checkVisible(grid: number[][], tracking: boolean[][]) {
  // console.log('checking visible', grid);
  for (var i = 0; i < grid.length; i++) {
    let max = -1;
    const row = grid[i];
    // console.log('checking', { row, len: grid.length });

    row.forEach((cell, j) => {
      if (cell > max) {
        tracking[i][j] = true;
        max = cell;
      }
    });
  }
}

export function part1(data: string) {
  let { grid, tracking } = parseDataToMap(data, false);
  // console.log({ grid });

  function rotateMapAndCheckVisible() {
    grid = transpose(grid);
    grid.reverse();

    // do the same for tracking map
    tracking = transpose(tracking);
    tracking.reverse();

    // check visible trees from this direction
    checkVisible(grid, tracking);
  }
  
  // calculate visible trees (from west)
  checkVisible(grid, tracking);

  // from north
  rotateMapAndCheckVisible();
  
  // from east
  rotateMapAndCheckVisible();
  
  // from south
  rotateMapAndCheckVisible();
  
  // count visible trees
  const numVisible = getNumVisible(tracking);
  // console.log({ numVisible });
  return numVisible;
}

function calculateSceneScore(grid: number[][], row: number, col: number) {
  const height = grid[row][col];

  if ([row, col].includes(0) || row===grid.length-1 || col===grid[row].length-1) {
    // edge case - must be zero
    return 0;
  }

  const d = {
    north: 0,
    west: 0,
    south: 0,
    east: 0,
  };

  // look south
  for (let y = row + 1; y < grid.length; y++) {
    d.south += 1;
    if (grid[y][col] >= height) break;
  }

  // look north
  for (let y = row - 1; y >= 0; y--) {
    d.north += 1;
    if (grid[y][col] >= height) break;
  }

  // look west
  for (let x = col - 1; x >= 0; x--) {
    d.west += 1;
    if (grid[row][x] >= height) break;
  }

  // look east
  for (let x = col + 1; x < grid[row].length; x++) {
    d.east += 1;
    if (grid[row][x] >= height) break;
  }

  return d.north * d.south * d.west * d.east;
}

// scenery score based on how far you can see in each direction
export function part2(data: string) {
  let { grid, tracking } = parseDataToMap(data, 0);
  // console.log({ grid });

  let max = 0;
  for (var row = 0; row < grid.length; row++) {
    const numCols = grid[row].length;
    for (var col = 0; col < numCols; col++) {
      const score = calculateSceneScore(grid, row, col);
      tracking[row][col] = score;
      if (score > max) {
        max = score;
      } 
    }
  }

  // console.log({ tracking });
  // console.log('max scenery score', max);
  return max;
}
