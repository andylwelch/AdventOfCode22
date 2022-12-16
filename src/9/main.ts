import { readFile } from "../utils";

function parseDataToMotions<T>(data: string) {
  const rows = data.trim().split('\n');

  // parse input
  return rows.map(row => {
    const [direction, d] = row.split(' ');
    return {
      direction,
      amount: parseInt(d),
    };
  });
}

function addTailPositon(tail: position, visitedByTail: { [key: string]: boolean }) {
  const key = `${tail.x},${tail.y}`;
  visitedByTail[key] = true;
}

function moveToKeepUp(head: position, tail: position, visitedByTail: { [key: string]: boolean }) {
  const distanceX = head.x - tail.x;
  const distanceY = head.y - tail.y;
  // move left/right
  if (Math.abs(distanceX) > 1 && head.y===tail.y) tail.x += Math.sign(distanceX);
  
  // move up/down
  else if (Math.abs(distanceY) > 1 && head.x===tail.x) tail.y += Math.sign(distanceY);

  // move diagonal
  else if (Math.abs(distanceX) > 1 || Math.abs(distanceY) > 1) {
    tail.x += Math.sign(distanceX);
    tail.y += Math.sign(distanceY);
  }
}

function interpretDirection(direction: string) {
  let coordinate: 'x' | 'y';
  let directionSign: -1 | 1;
  switch (direction) {
    case 'U': {
      coordinate = 'y';
      directionSign = 1;
      break;
    }
    case 'D': {
      coordinate = 'y';
      directionSign = -1;
      break;
    }
    case 'L': {
      coordinate = 'x';
      directionSign = -1;
      break;
    }
    case 'R': {
      coordinate = 'x';
      directionSign = 1;
      break;
    }
    default: {
      throw new Error(`Unknown direction: ${direction}`);
    }
  }
  return { coordinate, directionSign };
}

function moveHeadThenTail(knots: position[], motion: motion, visitedByTail: { [key: string]: boolean }) {
  const { direction, amount } = motion;
  const { coordinate, directionSign } = interpretDirection(direction);

  const [head] = knots;
  for (let i = 0; i < amount; i++) {
    head[coordinate] += directionSign;

    for (let j = 1; j < knots.length; j++) {
      const a = knots[j - 1];
      const b = knots[j];
      moveToKeepUp(a, b, visitedByTail);
    }

    const tail = knots[knots.length - 1];
    addTailPositon(tail, visitedByTail);
  }
}

type position = {
  x: number;
  y: number;
};

type motion = {
  direction: string;
  amount: number;
};

export function trackSnake(motions: motion[], length = 2) {
  const knots: position[] = [];
  for (let i = 0; i < length; i++) {
    knots.push({ x: 0, y: 0 });
  }

  const visitedByTail: { [key: string]: boolean} = {};
  motions.forEach(motion => {
    moveHeadThenTail(knots, motion, visitedByTail);
  });

  return Object.keys(visitedByTail).length;
}

export function part1(data: string) {
  const motions = parseDataToMotions(data);
  return trackSnake(motions, 2);
}

export function part2(data: string) {
  const motions = parseDataToMotions(data);
  return trackSnake(motions, 10);
}
