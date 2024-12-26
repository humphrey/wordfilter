import cs from 'classnames';


const ENTER_KEY = '⏎';
const BACKSPACE_KEY = '⌫';
const isSpecialKey = (char: string) => char === ENTER_KEY || char === BACKSPACE_KEY;

const keys = [
  'qwertyuiop',
  'asdfghjkl',
  ENTER_KEY + 'zxcvbnm' + BACKSPACE_KEY
]

interface Props {
  // value: number | null
  // onChange: (newValue: number | null) => void
}

export const Keyboard = (props: Props) => {
  return (

    <div>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className='my-1'>
          {(Array.from(row, char => char)).map(char => (
            <Key char={char}/>
          ))}
        </div>
      ))}
      {/* <button className={cs('btn btn-sm btn-light', props.value === null && 'active')} onClick={() => props.onChange(null)}>Any</button>
      {lengthOptions.map((n) => (
        <button key={n}  className={cs('btn btn-sm btn-light', props.value === n && 'active')} onClick={() => props.onChange(n)}>{n}</button>
      ))} */}
    </div>
  )
}

interface KeyProps {
  char: string
}

const Key = ({char}: KeyProps) => {
  return (
    <button 
      className={cs('btn btn-outline-dark me-1 px-0', isSpecialKey(char) && 'fw-bold')}
      style={{width: isSpecialKey(char)  ? '45px' : '30px'}}
    >
      {char}
    </button>
  )
}