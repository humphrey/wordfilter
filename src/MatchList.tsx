import { useFilter, WordFilter } from "./Filtering";

interface Props {
  filter: WordFilter;
}

const MAX_WORDS = 200;

export const MatchList = (props: Props) => {
  const m = useFilter(props.filter);
  return (
    <div>
      <div className="small text-muted text-center my-2">
        {m.matches.length} Matches
      </div>
      <div className="d-flex flex-wrap pb-3">
        {m.matches.slice(0, MAX_WORDS).map((word) => (
          <div key={word} className="font-monospace fs-5 mx-3">
            {word}
          </div>
        ))}
      </div>
      {m.matches.length > MAX_WORDS && (
        <div className="text-center pb-3">
          Showing first {MAX_WORDS} of {m.matches.length} words.
        </div>
      )}
    </div>
  );
};
