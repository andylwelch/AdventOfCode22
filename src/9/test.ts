import { test, describe, expect } from "@jest/globals";

import { readFile } from "../utils";
import { part1, part2 } from "./main";

function getFile(path: string) {
  return readFile(`${__dirname}/${path}`);
}

describe('Day 9 - moving rope', () => {
  test('part 1 - example number of positions the tail visits is 13', async () => {
    const data = await getFile('example.txt')
    const answer = part1(data);
    expect(answer).toBe(13);
  });
  
  test('part 1 - real number of positions the tail visits is 6314', async () => {
    const data = await getFile('input.txt')
    const answer = part1(data);
    expect(answer).toBe(6314);
  });

  test('part 2 - example number of positions the tail (10) visits is 1', async () => {
    const data = await getFile('example.txt')
    const answer = part2(data);
    expect(answer).toBe(1);
  });

  test('part 2 - example number of positions the tail (10) visits is 36', async () => {
    const data = await getFile('example2.txt')
    const answer = part2(data);
    expect(answer).toBe(36);
  });

  test('part 2 - real number of positions the tail (10) visits is 36', async () => {
    const data = await getFile('input.txt')
    const answer = part2(data);
    expect(answer).toBe(2504);
  });
});
