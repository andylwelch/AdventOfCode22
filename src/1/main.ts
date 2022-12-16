import { readFile } from "../utils";

readFile('input.txt').then(data => {
  if (!data) return;
  const groups = data.split('\n\n');
  // console.log(groups);
  
  const totals = groups.map((group, index) => {
    const values = group.split('\n');
    const numbers = values.map(value => value === '' ? 0 : parseInt(value));
    const sum = numbers.reduce((a, b) => a + b, 0);
    // console.log({sum, index});

    let j = 0;

    return sum;
  });

  const copy = [...totals];
  const ordered = copy.sort((a, b) => b - a);

  const max = ordered[0];
  const elf = totals.indexOf(max);

  const [a, b, c] = ordered;
  const top3 = a + b + c;
  console.log({ max, elf, top3 })
});
