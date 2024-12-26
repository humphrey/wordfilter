
import { useFilter, WordFilter } from './Filtering';

interface Props {
  filter: WordFilter
}

export const ExcludedList = (props: Props) => {
  const m = useFilter(props.filter);
  return (
    <div>
      {m.matches.slice(0, 200).map((word, index) => (
        <div key={word}  className="font-monospace fs-5">{word}</div>
      ))}
    </div>
  )
}