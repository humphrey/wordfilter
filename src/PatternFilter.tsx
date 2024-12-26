import cs from 'classnames';
import React from 'react';
import { Keyboard } from './Keyboard';


interface Props {
  length: number
  pattern: ReadonlyArray<string | null>
  onChange: (newPattern: ReadonlyArray<string | null>) => void
}

export const PatternFilter = (props: Props) => {

  const chars = Array.from({ length: props.length }).map((_, i) => props.pattern[i] ?? null) as ReadonlyArray<string | null>;
  const [selection, setSelection] = React.useState<number | null>(null)

  const setChar = (value: string | null) => {
    if (selection === null) return;
    props.onChange([...chars.slice(0, selection), value, ...chars.slice(selection + 1)])
  };

  return (
    <div>
      <div className='d-flex mb-3'>
        <div className='bg-light ms-auto rounded'>
          {chars.map((char, i) => (
            <button 
              key={i} 
              className={cs(
                'btn px-0', 
                selection === i ? 'btn-outline-primary' : 'btn-light',
                char !== null && 'fw-bold',
                selection !== i && char === null && 'text-muted',
              )} 
              onClick={() => setSelection(selection === i ? null : i)}
              style={{width: '30px'}}
            >
              {char ?? '?'}
            </button>
          ))}

        </div>
        <button 
          className={cs('btn btn-sm btn-light ms-3 me-auto')} 
          onClick={() => {
            props.onChange(chars.map(() => null));
            setSelection(0);
          }}
        >
          Clear
        </button>
      </div>
      {selection !== null &&
        <Keyboard 
          onKeyPress={(key) => {
            setChar(key);
            if (selection < props.length - 1) setSelection(selection + 1);
          }}
          onSpacebar={() => {
            setChar(null);
            if (selection < props.length - 1) setSelection(selection + 1);
          }}
          onBackspace={() => {
            const wasNull = (chars[selection] ?? null) === null;
            setChar(null)
            if (wasNull && selection > 0) setSelection(selection - 1);
          }}
        />
      }
    </div>
  )
}
