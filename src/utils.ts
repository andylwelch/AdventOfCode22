import { promises as fs } from 'fs';

// promised based file reading function
export function readFile(path: string) {
  return fs.readFile(path, 'utf8');
}
