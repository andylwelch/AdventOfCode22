import { readFile } from "../utils";

function interpretStack(stackStr: string) {
  const stackRows = stackStr.split('\n');
  if (!stackRows) return;
  
  const lastStackRow = stackRows.pop();
  if (!lastStackRow) return;

  const stackSize = lastStackRow.split('   ').length;

  const stack = Array(stackSize);

  // reverse so we can work up the stacks from the bottom
  stackRows.reverse();
  stackRows.forEach((row, r) => {
    const columns = row.match(/.{3,4}/g);
    if (!columns) return;

    // for each column in this row, get the 
    columns.forEach((column, c) => {
      const match = column.match(/\[([A-Z])\]\s?/);
      if (match) {
        const [_, crate] = match;
        stack[c] = stack[c] || [];
        stack[c].push(crate);
      }
    });
  });

  return stack;
}

function interpretInstructions(instructionStr: string) {
  const instructions = instructionStr.split('\n');
  return instructions.map(row => {
    const match = row.match(/move (\d+) from (\d+) to (\d+)/);
    if (match) {
      const [_, amount, from, to] = match;
      return { amount: Number(amount), from: Number(from), to: Number(to) };
    }
  });
}

function logTopLetters(stack: string[][]) {
  const top = stack.map(stack => stack.pop());
  console.log({ top, letters: top.join('') });
}

function moveOneAtATime(stack: any[], instruction?: { amount: number, from: number, to: number }) {
  if (instruction) {
    const { amount, from, to } = instruction;
    for (let i = 0; i < amount; i++) {
      const crate = stack[from-1].pop();
      stack[to-1].push(crate);
    }
  }
}

function moveManyAtATime(stack: any[], instruction?: { amount: number, from: number, to: number }) {
  if (instruction) {
    const { amount, from, to } = instruction;

    const crates = stack[from-1].splice(stack[from-1].length - amount, amount);
    console.log('moving', { crates });
    stack[to-1].push(...crates);
  }
}

function part1() {
  readFile('input.txt').then(data => {
    if (!data) return;
    const [stackStr, instructionStr] = data.split('\n\n');    
    const stack = interpretStack(stackStr);
    if (!stack) return;

    console.log('before instructions', { stack });

    const instructions = interpretInstructions(instructionStr);
    instructions.forEach((instruction) => moveOneAtATime(stack, instruction));

    console.log('after instructions', { stack });
    logTopLetters(stack);
  });
}

function part2() {
  readFile('input.txt').then(data => {
    if (!data) return;
    const [stackStr, instructionStr] = data.split('\n\n');    
    const stack = interpretStack(stackStr);
    if (!stack) return;

    console.log('before instructions', { stack });

    const instructions = interpretInstructions(instructionStr);
    instructions.forEach((instruction) => moveManyAtATime(stack, instruction));

    console.log('after instructions', { stack });
    logTopLetters(stack);
  });
}

part2();