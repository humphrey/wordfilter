import cs from 'classnames';

interface Props {
  value: number | null
  onChange: (newValue: number | null) => void
}

const lengthOptions = Array.from({ length: 10 }, (_, i) => i + 1);;

export const LengthSelector = (props: Props) => {
  return (
    <div className='btn-group'>
      <button className={cs('btn btn-sm btn-light', props.value === null && 'active')} onClick={() => props.onChange(null)}>Any</button>
      {lengthOptions.map((n) => (
        <button key={n}  className={cs('btn btn-sm btn-light', props.value === n && 'active')} onClick={() => props.onChange(n)}>{n}</button>
      ))}
    </div>
  )
}
