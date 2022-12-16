import { readFile } from "../utils";

function getScore(them, me) {
  switch (them) {
    // ROCK
    case 'A': {
      switch(me) {
        case 'X': return 3; // draw
        case 'Y': return 6; // win, paper covers rock
        case 'Z': return 0; // loss, rock breaks scissors
      }
    }
    // PAPER
    case 'B': {
      switch(me) {
        case 'X': return 0; // loss, paper covers rock
        case 'Y': return 3; // draw
        case 'Z': return 6; // win, scissors cut rock
      }
    }
    // SCISSORS
    case 'C': {
      switch(me) {
        case 'X': return 6; // win, rock breaks scissors
        case 'Y': return 0; // loss, scissors cut paper
        case 'Z': return 3; // draw
      }
    }
  }

  console.error('Invalid input', them, me);
  return 0;
}

function getMyThrow(them, outcome) {
  if (outcome === 'Y') return them;

  switch (them) {
    // ROCK
    case 'A': {
      switch(outcome) {
        // loss, must throw scissors
        case 'X': return 'C';
        // win, must throw paper
        case 'Z': return 'B';
      }
    }
    // PAPER
    case 'B': {
      switch(outcome) {
        // loss, must throw rock
        case 'X': return 'A'
        // win, must throw scissors
        case 'Z': return 'C';
      }
    }
    // SCISSORS
    case 'C': {
      switch(outcome) {
        // lost, must throw paper
        case 'X': return 'B';
        // win, must throw rock
        case 'Z': return 'A';
      }
    }
  }

  console.error('Invalid input', them, outcome);
  return 0;
}

// readFile('input.txt').then(data => {
//   if (!data) return;
//   const groups = data.trim().split('\n');
  
//   const values = groups.map((group, index) => {
//     const [them, me] = group.split(' ');

//     const throwValue = ['X', 'Y', 'Z'].indexOf(me) + 1;
//     const score = getScore(them, me);

//     const total = throwValue + score;
//     console.log({index, them, me, throwValue, score, total});
//     return total;
//   });

//   const sum = values.reduce((a, b) => a + b, 0);
//   console.log({ sum  })
// });

readFile('input.txt').then(data => {
  if (!data) return;
  const groups = data.trim().split('\n');
  
  const values = groups.map((group, index) => {
    const [them, outcome] = group.split(' ');

    const me = getMyThrow(them, outcome);
    const throwValue = ['A', 'B', 'C'].indexOf(me) + 1;
    const mappedMe = ['X', 'Y', 'Z'][throwValue - 1];
    const score = getScore(them, mappedMe);

    const total = throwValue + score;
    console.log({index, them, me, mappedMe, throwValue, score, total});
    return total;
  });

  const sum = values.reduce((a, b) => a + b, 0);
  console.log({ sum  })
});
