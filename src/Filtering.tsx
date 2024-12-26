import wordlist from './freq.words.json';


export interface WordFilter {
  length: number | null
}

export const useFilter = (filter: WordFilter) => {
  let matches = wordlist as ReadonlyArray<string>;
  if (filter.length !== null) {
    matches = matches.filter(w => w.length == filter.length)
  }
  return {
    matches, 
  }; 
}