import { readFile } from "../utils";

function getCharCodes(commons: string[]) {
  return commons.map((common) => {
    const code = common?.charCodeAt(0);
    if (code <= 90) return code - 64 + 26;

    return code - 96;
  });
}

function part1() {
  readFile('input.txt').then(data => {
    if (!data) return;
    const groups = data.trim().split('\n');
  
    const commons = groups.map(group => {
      const half = group.length / 2;
      const first = group.slice(0, half);
      const second = group.slice(half);
  
      for (let i = 0; i < first.length; i++) {
        const a = first[i];
        if (second.includes(a)) return a;
      }
      return '';
    });
  
    console.log({ commons })
  
    const values = getCharCodes(commons);
    const sum = values.reduce((a, b) => a + b, 0);
  
    console.log({ values, sum })
  });
}

function part2() {
  readFile('input.txt').then(data => {
    if (!data) return;
    const groups = data.trim().split('\n');

    const commons: string[] = [];

    while (groups.length) {
      const first = groups.shift();
      const second = groups.shift();
      const third = groups.shift();

      if (!first || !second || !third) break;

      for (let i = 0; i < first.length; i++) {
        const a = first[i];
        if (second.includes(a) && third.includes(a)) {
          commons.push(a);
          break;
        }
      }
    }
  
    console.log({ commons })
  
    const values = getCharCodes(commons);
    const sum = values.reduce((a, b) => a + b, 0);
  
    console.log({ values, sum })
  });
}

part2();