import { readFile } from "../utils";

function part1() {
  readFile('input.txt').then(data => {
    if (!data) return;
    
    const chars = data.split('');

    let pos = -1;
    let duplicate = true;
    while (duplicate && pos < chars.length) {
      pos += 1;
      const [first, second, third, forth] = chars.slice(pos, pos + 4);
      console.log(pos, { first, second, third, forth });
      duplicate = [first, second, third].includes(forth) || [first, second].includes(third) || first === second;
    }

    console.log(pos + 4);

  });
}

function part2() {
  const lengthOfMarker = 14;
  readFile('input.txt').then(data => {
    if (!data) return;
    
    const chars = data.split('');

    let pos = -1;
    let duplicate = true;
    while (duplicate && pos < chars.length) {
      pos += 1;
      const charsToInspect = chars.slice(pos, pos + lengthOfMarker);
      
      let obj = {};
      let found = false;
      for (let i = 0; i < charsToInspect.length; i++) {
        const char = charsToInspect[i];
        const firstDupAt = obj[char];
        if (typeof firstDupAt==='number') {
          pos += firstDupAt;
          break;
        }

        // keep track of current char
        obj[char] = i;    
      }

      duplicate = Object.keys(obj).length !== lengthOfMarker;
    }

    console.log(pos + lengthOfMarker);
  });
}

part2();