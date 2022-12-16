import { test, describe, expect } from "@jest/globals";

import { readFile } from "../utils";
import { part1 } from "./main";

function getFile(path: string) {
  return readFile(`${__dirname}/${path}`);
}

describe('Day 10 - signal strengths', () => {
  test('part 1 - strengths of example cycles add to 13140', async () => {
    const data = await getFile('example.txt')
    const answer = part1(data);
    expect(answer).toBe(13140);
  });
  
  test('part 1 - strengths of real cycles add to 13440', async () => {
      const data = await getFile('input.txt')
    const answer = part1(data);
    expect(answer).toBe(13440);
  });

  // part 2 - crt screen output
  // ##..##..##..##..##..##..##..##..##..##..
  // ###...###...###...###...###...###...###.
  // ####....####....####....####....####....
  // #####.....#####.....#####.....#####.....
  // ######......######......######......####
  // #######.......#######.......#######.....

  // part 2 - real cycles
  // ###..###..####..##..###...##..####..##..
  // #..#.#..#....#.#..#.#..#.#..#....#.#..#.
  // #..#.###....#..#....#..#.#..#...#..#..#.
  // ###..#..#..#...#.##.###..####..#...####.
  // #....#..#.#....#..#.#.#..#..#.#....#..#.
  // #....###..####..###.#..#.#..#.####.#..#.
  
  // PBZGRAZA
});
