import React from "react";
import wordlist from "./freq.words.json";

export interface WordFilter {
  id: number;
  length: number | null;
  includes: ReadonlyArray<string>;
  excludes: ReadonlyArray<string>;
  pattern: ReadonlyArray<string | null>;
  strikeout: ReadonlyArray<string>;
}

export const filterWordList = (filter: WordFilter) => {
  let matches = wordlist as ReadonlyArray<string>;
  let holes: null | number[] = null;
  if (filter.length !== null) {
    // Filter to only include words that match length
    matches = matches.filter((w) => w.length == filter.length);

    // Filter to only include words that match the pattern
    holes = [];
    for (let i = 0; i < filter.length; i++) {
      const char = filter.pattern[i] ?? null;
      if (char !== null) {
        matches = matches.filter(
          (w) => char.toLowerCase() === w.substring(i, i + 1).toLowerCase()
        );
      } else {
        holes.push(i);
      }
    }
  }

  const getFilterableChars =
    holes === null
      ? (word: string) => word
      : (word: string) =>
          holes
            .map((h) => word.substring(h, h + 1))
            .filter((c) => c.length > 0);

  // Filter out words that do not include all the included letters
  for (const char of filter.includes) {
    matches = matches.filter((w) => getFilterableChars(w).includes(char));
  }
  // Filter out words that do include the excluded letters
  for (const char of filter.excludes) {
    matches = matches.filter((w) => !getFilterableChars(w).includes(char));
  }

  return {
    matches,
  };
};

const filterDefaults: Omit<WordFilter, "id" | "length"> = {
  excludes: [],
  includes: [],
  pattern: [],
  strikeout: [],
};

export const useFilterHistory = () => {
  const [nextId, setNextId] = React.useState(1);
  const [filters, setFilters] = React.useState<ReadonlyArray<WordFilter>>([]);
  const newId = () => {
    const id = nextId;
    setNextId(nextId + 1);
    return id;
  };
  return {
    filters,
    clear: () => setFilters([]),
    add: (filter: WordFilter) => {
      // Add while ensuring that it isn't added twice (if it was already added)
      setFilters([filter, ...filters.filter((f) => f.id !== filter.id)]);
    },
    new: (length: number | null): WordFilter => {
      return {
        ...filterDefaults,
        id: newId(),
        length: length,
      };
    },
  };
};

export const filterIsBlank = (filter: WordFilter) =>
  filter.pattern.filter((c) => c === null).length === 0 &&
  filter.includes.length === 0 &&
  filter.excludes.length === 0;

export const useFilters = () => {
  const history = useFilterHistory();
  const [filter, setFilter] = React.useState<WordFilter>({
    ...filterDefaults,
    id: 0,
    length: null,
  });
  const [dirty, setDirty] = React.useState(false);

  // Since WordFilter has an id, it needs to be initialised only the first time ever
  React.useEffect(() => {
    setFilter(history.new(null));
  }, []);

  const addToHistory = () => {
    // if (!filterIsBlank(filter)) {
    if (dirty) {
      history.add(filter);
    }
  };

  return {
    filter,
    setFilter,
    history,
    new: (length: number | null) => {
      addToHistory();
      setFilter({ ...history.new(length) });
      setDirty(false);
    },
    update: (newValues: Partial<Omit<WordFilter, "id" | "length">>) => {
      setFilter({ ...filter, ...newValues });
      setDirty(true);
    },
    restore: (id: number) => {
      addToHistory();
      let newFilter = { ...history.new(null) };
      const historicFilter = history.filters.filter((f) => f.id === id)[0];
      if (historicFilter) {
        newFilter = { ...historicFilter, id: newFilter.id };
      }
      setFilter(newFilter);
      setDirty(false);
    },
    toggleStrikeout: (word: string) => {
      const strikeout = filter.strikeout.includes(word)
        ? filter.strikeout.filter((w) => w !== word)
        : [...filter.strikeout, word];
      setFilter({
        ...filter,
        strikeout,
      });
      setDirty(true);
    },
  };
};
