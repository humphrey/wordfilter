import cs from 'classnames';

interface Props {
  value: number | null
  onChange: (newValue: number | null) => void
}

const lengthOptions = [2,3,4,5,6,7,8,9,10];

export const LengthSelector = (props: Props) => {
  return (
    <div>

      <div className='btn-group'>
        {lengthOptions.map((n) => (
          <button key={n}  className={cs('btn btn-sm btn-light', props.value === n && 'active')} onClick={() => props.onChange(n)}>{n}</button>
        ))}
      </div>

      <button className={cs('btn btn-sm btn-light ms-3', props.value === null && 'active')} onClick={() => props.onChange(null)}>Any</button>
    </div>
  )
}
