import cs from 'classnames';
import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { WordFilter } from './Filtering';
import { Keyboard } from './Keyboard';


interface Props {
  filter: WordFilter
  onChange: (newPattern: ReadonlyArray<string | null>) => void
}


const notEnabledMsg = 'Requires a specified word length'


const getPatternChars = (flt: WordFilter) => Array.from({ length: flt.length ?? 0 }).map((_, i) => flt.pattern[i] ?? null) as ReadonlyArray<string | null>;



export const MiniPatternField = (props: {filter: WordFilter}) => {
  const chars = getPatternChars(props.filter);

  if (chars.length === 0) return <small className='text-muted'>N/A</small>;
  return (
    <div className='font-monospace'>
      {chars.map((char, i) => (
        <span 
          key={i} 
          className={cs(
            'px-0', 
            char !== null && 'fw-bold',
          )}
          style={{width: '30px'}}
        >
          {char ?? '?'}
        </span>
      ))}

    </div>
  );
};



export const PatternFilterButtons = (props: {filter: WordFilter, selected: number | null, onSelect: (index: number) => void}) => {
  const chars = getPatternChars(props.filter)
  if (chars.length > 0) return (
    <div className='bg-light ms-auto rounded'>
      {chars.map((char, i) => (
        <button 
          key={i} 
          className={cs(
            'btn px-0', 
            props.selected === i ? 'btn-outline-primary' : 'btn-light',
            char !== null && 'fw-bold',
            props.selected !== i && char === null && 'text-muted',
          )} 
          onClick={() => props.onSelect(i)}
          style={{width: '30px'}}
        >
          {char ?? '?'}
        </button>
      ))}
      {chars.length === 0 && 
        <button 
          disabled
          className={cs(
            'btn btn-light text-muted', 
          )}
        >
          <small>{notEnabledMsg}</small>
        </button>}
    </div>
  );

}

export const PatternFilterOffCanvas = (props: Props) => {

  const chars = getPatternChars(props.filter)
  const [selection, setSelection] = React.useState<number | null>(0)
  const len = props.filter.length;
  
  const setChar = (value: string | null) => {
    if (selection === null) return;
    props.onChange([...chars.slice(0, selection), value, ...chars.slice(selection + 1)])
  };


  return (
    <>
      <Offcanvas.Header closeButton>
        {/* <Offcanvas.Title> */}
          <PatternFilterButtons 
            {...props} 
            selected={selection}
            onSelect={index => setSelection(index)}
          />
        {/* </Offcanvas.Title> */}
      </Offcanvas.Header>
      <Offcanvas.Body>
        {selection !== null && len !== null && 
          <Keyboard 
            onKeyPress={(key) => {
              console.log('onKeyPress', key)
              setChar(key);
              if (selection < len - 1) setSelection(selection + 1);
            }}
            onSpacebar={() => {
              console.log('onSpacebar')
              setChar(null);
              if (selection < len - 1) setSelection(selection + 1);
            }}
            onBackspace={() => {
              console.log('onBackspace')
              const wasNull = (chars[selection] ?? null) === null;
              setChar(null)
              if (wasNull && selection > 0) setSelection(selection - 1);
            }}
          />
        }
      </Offcanvas.Body>
    </>
  )
}
