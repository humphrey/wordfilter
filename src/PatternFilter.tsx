import cs from 'classnames';
import React from 'react';
import { Keyboard } from './Keyboard';
import { BaseFieldProps } from './Field';


interface Props extends BaseFieldProps {
  length: number | null
  pattern: ReadonlyArray<string | null>
  onChange: (newPattern: ReadonlyArray<string | null>) => void
}

export const usePatternFilter = (props: Props) => {

  const chars = Array.from({ length: props.length ?? 0 }).map((_, i) => props.pattern[i] ?? null) as ReadonlyArray<string | null>;
  const [selection, setSelection] = React.useState<number | null>(null)
  const selectionOrZero = selection ?? 0;
  console.log('chars', chars,props.length)
  const setChar = (value: string | null) => {
    if (selection === null) return;
    props.onChange([...chars.slice(0, selection), value, ...chars.slice(selection + 1)])
  };

  // const Field = (
  //   <div>
  //     <div className='d-flex mb-3'>
  //       <div className='bg-light ms-auto rounded'>
  //         {chars.map((char, i) => (
  //           <button 
  //             key={i} 
  //             className={cs(
  //               'btn px-0', 
  //               selection === i ? 'btn-outline-primary' : 'btn-light',
  //               char !== null && 'fw-bold',
  //               selection !== i && char === null && 'text-muted',
  //             )} 
  //             onClick={() => setSelection(selection === i ? null : i)}
  //             style={{width: '30px'}}
  //           >
  //             {char ?? '?'}
  //           </button>
  //         ))}

  //       </div>
  //       <button 
  //         className={cs('btn btn-sm btn-light ms-3 me-auto')} 
  //         onClick={() => {
  //           props.onChange(chars.map(() => null));
  //           setSelection(0);
  //         }}
  //       >
  //         Clear
  //       </button>
  //     </div>
  //     {selection !== null &&
  //       <Keyboard 
  //         onKeyPress={(key) => {
  //           setChar(key);
  //           if (selection < props.length - 1) setSelection(selection + 1);
  //         }}
  //         onSpacebar={() => {
  //           setChar(null);
  //           if (selection < props.length - 1) setSelection(selection + 1);
  //         }}
  //         onBackspace={() => {
  //           const wasNull = (chars[selection] ?? null) === null;
  //           setChar(null)
  //           if (wasNull && selection > 0) setSelection(selection - 1);
  //         }}
  //       />
  //     }
  //   </div>
  // );

  

  const handleClear = () => {
    props.onChange(chars.map(() => null));
    setSelection(0);
    props.onBlur();
  };

  return {
    Field: () => (
      <div>
        <div className='d-flex mb-3'>
          {chars.length > 0 &&
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
                  onClick={() => {
                    setSelection(selection === i ? null : i);
                    props.onFocus();
                  }}
                  style={{width: '30px'}}
                >
                  {char ?? '?'}
                </button>
              ))}

            </div>
          }
          {chars.length === 0 && <small className='text-muted'>Select a length to specify a pattern</small>}
          <button 
            className={cs('btn btn-sm btn-light ms-3 me-auto')} 
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    ),


    onClear: handleClear,

    Keyboard: (props.focus && selection !== null) ? () => (
      <Keyboard 
        onKeyPress={(key) => {
          setChar(key);
          if (selectionOrZero < props.length - 1) setSelection(selectionOrZero + 1);
        }}
        onSpacebar={() => {
          setChar(null);
          if (selectionOrZero < props.length - 1) setSelection(selectionOrZero + 1);
        }}
        onBackspace={() => {
          const wasNull = (chars[selectionOrZero] ?? null) === null;
          setChar(null)
          if (wasNull && selectionOrZero > 0) setSelection(selectionOrZero - 1);
        }}
      />
    ) : null,

  }
}
