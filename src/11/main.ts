import { readFile } from "../utils";

function getOperationFunc(operationStr: string) {
  const [bodmas, valueStr] = operationStr.split(' ');
  
  return (old: number): number => {
    const value = valueStr==='old' ? old : Number(valueStr);
    switch (bodmas) {
      case '+': return old + value;
      case '-': return old - value;
      case '*': return old * value;
      case '/': return old / value;
    }
    throw new Error('Invalid operation');
  };
}

function parseDataToInstructions<T>(data: string): instruction[] {
  const monkeys = data.trim().split('\n\n');
  // console.log({ monkeys });

  // parse input
  return monkeys.map(data => {
    const rows = data.trim().split('\n');
    const monkey = rows.shift()?.trim().match(/Monkey (\d+):/)?.[1];
    const itemsStr = rows.shift()?.trim().match(/Starting items: ([\d, ]+)/)?.[1];
    const operationStr = rows.shift()?.trim().match(/Operation: new = old (.+)/)?.[1];
    const testStr = rows.shift()?.trim().match(/Test: divisible by (\d+)/)?.[1];
    const ifTrue = rows.shift()?.trim().match(/If true: throw to monkey (\d+)/)?.[1];
    const ifFalse = rows.shift()?.trim().match(/If false: throw to monkey (\d+)/)?.[1];
    // console.log({ monkey, itemsStr, operationStr, testStr, ifTrue, ifFalse });

    if (!monkey || !itemsStr || !operationStr || !testStr || !ifTrue || !ifFalse) throw new Error('Invalid data');

    return {
      monkey: parseInt(monkey),
      items: itemsStr.split(', ').map(i => parseInt(i)),
      operationFunc: getOperationFunc(operationStr),
      divBy: parseInt(testStr),
      ifTrue: parseInt(ifTrue),
      ifFalse: parseInt(ifFalse),
    }
  });
}

interface instruction {
  monkey: number;
  items: number[];
  operationFunc: (old: number) => number;
  divBy: number;
  ifTrue: number;
  ifFalse: number;
}

function monkeyBusiness(data: string, rounds: number, worryDivBy?: number) {
  const instructions = parseDataToInstructions(data);
  // console.log({ instructions });

  const monkeys: instruction[] = Array(instructions.length);
  instructions.forEach(instruction => {
    monkeys[instruction.monkey] = instruction;
  });
  
  const inspections: number[] = Array(instructions.length).fill(0);

  // work out a common denominator
  let common = 1;
  instructions.forEach(instruction => {
    common *= instruction.divBy;
  });

  // console.log({ monkeys });

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey: instruction) => {
      let worry: number | undefined;
      while (worry = monkey.items.shift()) {
        inspections[monkey.monkey] += 1;
        let newValue = monkey.operationFunc(worry);
        // console.log({ monkey: monkey.monkey, worry, newValue });
        
        newValue = worryDivBy ? Math.floor(newValue / worryDivBy) : newValue % common;

        // console.log('after inspection', { monkey: monkey.monkey, worry, newValue });
        
        const nextMonkey = (newValue % monkey.divBy === 0) ? monkey.ifTrue : monkey.ifFalse;
        // console.log({ monkey: monkey.monkey, nextMonkey });
        monkeys[nextMonkey].items.push(newValue);
      }
    });

    // if ([1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].includes(i+1)) {
    //   console.log('after round', i+1);
    //   // monkeys.forEach(({ items }, i) => console.log('Monkey ', i, items));
    //   console.log({ inspections });
    // }
  }
  
  // console.log('end', { inspections });

  const totals = inspections.sort((a, b) => b - a);
  const [x,y] = totals;
  const monkeyBusiness = x * y;
  // console.log({ totals, monkeyBusiness });
  return monkeyBusiness;
}

export function part1(data: string) {
  return monkeyBusiness(data, 20, 3);
}

export function part2(data: string) {
  return monkeyBusiness(data, 10000);
}
