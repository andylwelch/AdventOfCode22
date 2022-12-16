import { test, describe, expect } from "@jest/globals";

import { readFile } from "../utils";
import { part1, part2 } from "./main";

function getFile(path: string) {
  return readFile(`${__dirname}/${path}`);
}

describe('Day 11 - monkey business', () => {
  test('part 1 - example monkey business is 10605', async () => {
    const data = await getFile('example.txt')
    const answer = part1(data);
    expect(answer).toBe(10605);
  });
  
  test('part 1 - monkey business is 56120', async () => {
      const data = await getFile('input.txt')
    const answer = part1(data);
    expect(answer).toBe(56120);
  });
  
  test('part 2 - example monkey business after 10,000 rounds is 2713310158', async () => {
      const data = await getFile('example.txt')
    const answer = part2(data);
    expect(answer).toBe(2713310158);
  });
  
  test('part 2 - monkey business after 10,000 rounds is 24389045529', async () => {
      const data = await getFile('input.txt')
    const answer = part2(data);
    expect(answer).toBe(24389045529);
  });

 
});
