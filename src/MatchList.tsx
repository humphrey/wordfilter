import { filterWordList, WordFilter } from "./Filtering";
import cs from "classnames";

export type ResultSort = "alpha" | "popularity";

interface Props {
  filter: WordFilter;
  sort: ResultSort;
  onWordTap: (word: string) => void;
}

const MAX_WORDS = 200;

export const MatchList = (props: Props) => {
  const m = filterWordList(props.filter);
  const words = Array.from(m.matches) as string[];
  if (props.sort === "alpha") {
    words.sort();
  }
  return (
    <div>
      <div className="small text-muted text-center my-2">
        {words.length} Matches
      </div>
      <div className="d-flex flex-wrap pb-3">
        {words.slice(0, MAX_WORDS).map((word) => (
          <div
            key={word}
            className={cs(
              "font-monospace fs-5 mx-3",
              props.filter.strikeout.includes(word) &&
                "text-decoration-line-through text-muted"
            )}
            onClick={() => props.onWordTap(word)}
            style={{ cursor: "pointer" }}
          >
            {word}
          </div>
        ))}
      </div>
      {words.length > MAX_WORDS && (
        <div className="text-center pb-3">
          Showing first {MAX_WORDS} of {words.length} words.
        </div>
      )}
    </div>
  );
};
