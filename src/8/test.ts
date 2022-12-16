import { test, describe, expect } from "@jest/globals";

import { readFile } from "../utils";
import { part1, part2 } from "./main";

function getFile(path: string) {
  return readFile(`${__dirname}/${path}`);
}

describe('Day 8 - map of visible trees', () => {
  test('part 1 - number of visible trees in example is 21', async () => {
    const data = await getFile('example.txt')
    const answer = part1(data);
    expect(answer).toBe(21);
  });
  
  test('part 1 - number of visible trees in real data is 1782', async () => {
    const data = await getFile('input.txt');
    const answer = part1(data);
    expect(answer).toBe(1782);
  });

  test('part 2 - scenerary score - example data returns 4', async () => {
    const data = await getFile(`example.txt`)
    const answer = part2(data);
    expect(answer).toBe(8);
  });

  test('part 2 - scenerary score - real data returns 474606', async () => {
    const data = await getFile(`input.txt`)
    const answer = part2(data);
    expect(answer).toBe(474606);
  });
});
