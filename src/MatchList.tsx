
import { useFilter, WordFilter } from './Filtering';

interface Props {
  filter: WordFilter
}

export const MatchList = (props: Props) => {
  const m = useFilter(props.filter);
  return (
    <div>
      <div className='small text-muted'>{m.matches.length} Matches</div>
      {m.matches.slice(0, 200).map((word, index) => (
        <div key={word}  className="font-monospace fs-5">{word}</div>
      ))}
    </div>
  )
}