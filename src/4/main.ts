import { readFile } from "../utils";

function part1() {
  readFile('input.txt').then(data => {
    if (!data) return;
    const groups = data.trim().split('\n');
    let overlap = 0;
    
    const commons = groups.map(group => {
      const [first, second] = group.split(',');

      const [firstFrom, firstTo] = first.split('-').map(Number);
      const [secondFrom, secondTo] = second.split('-').map(Number);
  

      if ((firstFrom <= secondFrom && firstTo >= secondTo) || 
          (secondFrom <= firstFrom && secondTo >= firstTo)) {
        overlap += 1;
      }
    });
  
    console.log({ overlap })
  });
}

function part2() {
  readFile('input.txt').then(data => {
    if (!data) return;
    const groups = data.trim().split('\n');
    let overlap = 0;
    
    const commons = groups.map(group => {
      const [first, second] = group.split(',');

      const [a, b] = first.split('-').map(Number);
      const [x, y] = second.split('-').map(Number);

      if ([a, b].includes(x) || [a, b].includes(y)) {
        overlap += 1;
      } else if (a < x && b > x) {
        overlap += 1;
      } else if (x < a && y > a) {
        overlap += 1;
      }
    });
  
    console.log({ overlap })
  });
}

part2();