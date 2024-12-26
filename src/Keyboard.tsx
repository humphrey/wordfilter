import cs from 'classnames';


const ENTER_KEY = '⏎';
const BACKSPACE_KEY = '⌫';
const isSpecialKey = (char: string) => char === ENTER_KEY || char === BACKSPACE_KEY;

const keys = [
  'qwertyuiop',
  'asdfghjkl',
  // ENTER_KEY + 
  'zxcvbnm' + BACKSPACE_KEY
]

interface Props {
  // value: number | null
  // onChange: (newValue: number | null) => void
  onKeyPress: (key: string) => void
  onBackspace?: () => void
}

export const Keyboard = (props: Props) => {

  const chars = keys.map(row => (Array.from(row, char => char)).filter(char => {
    if (char === BACKSPACE_KEY) {
      return props.onBackspace !== undefined;
    }
    return true;
  }));

  return (

    <div>
      {chars.map((row, rowIndex) => (
        <div key={rowIndex} className='my-1'>
          {row.map(char => (
            <Key char={char} onClick={() => {
              if (props.onBackspace && char === BACKSPACE_KEY) props.onBackspace();
              else props.onKeyPress(char)
            }}/>
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
  onClick: () => void
}

const Key = ({char, onClick}: KeyProps) => {
  return (
    <button 
      className={cs('btn btn-outline-dark me-1 px-0', isSpecialKey(char) && 'fw-bold')}
      style={{width: isSpecialKey(char)  ? '45px' : '30px'}}
      onClick={onClick}
    >
      {char}
    </button>
  )
}