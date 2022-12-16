import { readFile } from "../utils";

function part1And2() {
  readFile('input.txt').then(data => {
    if (!data) return;
    
    // let pwd = '/';
    let pwd = '/';
    const stats = {};

    const commandsWithOutput = data.split('$ ');
    commandsWithOutput.forEach(raw => {
      const rows = raw.split('\n');
      const commandRow = rows.shift();
      if (!commandRow) return;

      const [command, arg] = commandRow.split(' ');
      switch (command) {
        case 'cd': {
          switch (arg) {
            case '..': {
              const parts = pwd.split('/');
              parts.pop();
              pwd = parts.join('/');
              break;
            }
            case '/': {
              pwd = '/';
              break;
            }
            default : {
              const parts = pwd.split('/');
              parts.push(arg);
              pwd = parts.join('/');
              break;
            }
          }
          break;
        }

        case 'ls': {
          const paths = pwd.split('/');
          let current = stats;
          paths.forEach(folder => {
            if (folder) current = current[folder];
          });

          rows.forEach(row => {
            if (!row) return;
            const [size, name] = row.split(' ');
            if (size==='dir') {
              current[name] = current[name] || {};
            } else {
              current = current || {};
              current[name] = Number(size);
            }
          });

          break;
        }

        default: {
          console.warn('Unknown command', { command, arg });
          break;
        }
      }
    });

    console.log({ stats });
    calcSizeOfDir(stats);

    console.log({ sizeOfEachDir });

    // part 1
    const applicable = sizeOfEachDir.filter(size => size <= 100000);
    const sum = applicable.reduce((acc, size) => acc + size, 0);
    console.log({ applicable, sum });

    // part 2
    const spaceAvailable = 70000000;
    const spaceReq = 30000000;

    // root dir was last
    const spaceUsed = sizeOfEachDir.pop();
    if (!spaceUsed) return console.warn('No space used?');

    const needToDel = spaceUsed - spaceAvailable + spaceReq;
    console.log({ needToDel });

    const couldDelete = sizeOfEachDir.filter(size => size >= needToDel);
    const sorted = couldDelete.sort((a, b) => b - a);
    console.log({ couldDelete, sorted });
    const bestToDelete = sorted.pop();
    console.log({ bestToDelete });
  });
}

const sizeOfEachDir: number[] = [];
function calcSizeOfDir(dir) {
  let size = 0;
  Object.keys(dir).forEach(key => {
    const value = dir[key];

    switch (typeof value) {
      case 'number': {
        size += value;
        break;
      }
      case 'object': {
        size += calcSizeOfDir(value);
        break;
      }
      default: {
        console.warn('Unknown type', { key, value });
        break;
      }
    }
  });

  sizeOfEachDir.push(size);

  return size;
}

part1And2();