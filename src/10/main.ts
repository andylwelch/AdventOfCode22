import { readFile } from "../utils";

function parseDataToInstructions<T>(data: string) {
  const rows = data.trim().split('\n');

  // parse input
  return rows.map(row => {
    const [operation, d] = row.split(' ');
    return {
      operation,
      value: parseInt(d),
    };
  });
}


export function part1(data: string) {
  const instructions = parseDataToInstructions(data);
  // console.log({ instructions });

  let x = 1;
  let cycles = 0;

  const frequencyToSave = 40;
  const offset = 20;
  const strengths: number[] = [];
  const crt: string[] = [];
  const spriteWidth = 3;
  const spriteBound = (spriteWidth - 1) / 2;

  function increaseCycles(by: number) {
    for (let i = 0; i < by; i++) {
      let pos = cycles % 40;

      // work out if the sprite and current position overlap
      const overlap = (x - spriteBound) <= pos && pos <= (x + spriteBound);
      // crt displays on or off based on overlap
      crt.push(overlap ? '#' : '.');
      
      cycles += 1;
      if ((cycles + offset) % frequencyToSave === 0) {
        // console.log({ x, cycles, strength: x * cycles })
        strengths.push(x * cycles);
      }
    }
  }

  instructions.forEach(instruction => {
    const { operation, value } = instruction;
    switch (operation) {
      case 'noop': {
        increaseCycles(1);
        break;
      }
      case 'addx': {
        increaseCycles(2);
        x += value;
        break;
      }
    }
  });

  // log the CRT screen output so we can see what's going on
  const rows = crt.join('').match(/.{40}/g);
  if (rows) {
    // console.log('screen output', rows);
    console.log(rows.join('\n'));
  }

  // console.log({ strengths });

  const sum = strengths.reduce((a, b) => a + b, 0);
  // console.log({ sum });
  return sum;
}
