import wordlist from './freq.words.json';



export interface WordFilter {
  length: number | null
  includes: ReadonlyArray<string>
  excludes: ReadonlyArray<string>
  pattern: ReadonlyArray<string | null>
}

export const defaultFilter: WordFilter = {
  length: null,
  excludes: [],
  includes: [],
  pattern: [],
}

export const useFilter = (filter: WordFilter) => {
  let matches = wordlist as ReadonlyArray<string>;
  let holes: null | number[] = null;
  if (filter.length !== null) {
    // Filter to only include words that match length
    matches = matches.filter(w => w.length == filter.length)

    // Filter to only include words that match the pattern
    holes = [];
    for (let i=0; i < filter.length ; i++) {
      const char = filter.pattern[i] ?? null;
      if (char !== null) {
        matches = matches.filter(w => char.toLowerCase() === w.substring(i, i+1).toLowerCase());
      }
      else {
        holes.push(i);
      }
    }

  }

  const getFilterableChars = holes === null 
    ? (word: string) => word
    : (word: string) => holes.map(h => word.substring(h, h+1)).filter(c => c.length > 0)

  // Filter out words that do not include all the included letters
  for (const char of filter.includes) {
    matches = matches.filter(w => getFilterableChars(w).includes(char))
  }
  // Filter out words that do include the excluded letters
  for (const char of filter.excludes) {
    matches = matches.filter(w => !getFilterableChars(w).includes(char))
  }

  return {
    matches, 
  }; 
}


