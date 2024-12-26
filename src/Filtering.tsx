import wordlist from './freq.words.json';



export interface WordFilter {
  length: number | null
  includes: ReadonlyArray<string>
  excludes: ReadonlyArray<string>
  pattern: ReadonlyArray<string | null>
}

export const useFilter = (filter: WordFilter) => {
  let matches = wordlist as ReadonlyArray<string>;
  if (filter.length !== null) {
    // Filter to only include words that match length
    matches = matches.filter(w => w.length == filter.length)

    // Filter to only include words that match the pattern
    for (let i=0; i < filter.length ; i++) {
      const char = filter.pattern[i] ?? null;
      if (char !== null) {
        matches = matches.filter(w => char.toLowerCase() === w.substring(i, i+1).toLowerCase());
      }
    }
  }

  // Filter out words that do not include all the included letters
  
  // Filter out words that do include the excluded letters

  return {
    matches, 
  }; 
}