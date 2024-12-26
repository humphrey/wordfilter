
import { WordFilter } from './Filtering';
import React from 'react';
import cs from 'classnames';
import { Keyboard } from './Keyboard';

interface Props {
  filter: WordFilter
  onChange: (newValue: {
    includes: ReadonlyArray<string>
    excludes: ReadonlyArray<string>
  }) => void
}

export const ExcludedList = (props: Props) => {
  const [active, setActive] = React.useState<null | 'includes' | 'excludes'>(null);
  const {includes, excludes} = props.filter;
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <button 
          className={cs('btn mx-3', active === 'includes' ? 'btn-outline-primary': 'btn-light')}
          onClick={() => setActive(active == 'includes' ? null : 'includes')}
        >
          <small className='text-muted'>Includes</small>
          <div>
            {props.filter.includes.map(char => <span key={char} className='fw-bold text-warning me-1'>{char}</span>)}
          </div>
          {props.filter.includes.length === 0 && <small className='text-muted'>&mdash;</small>}
        </button>

        <button 
          className={cs('btn', active === 'excludes' ? 'btn-outline-primary': 'btn-light')}
          onClick={() => setActive(active == 'excludes' ? null : 'excludes')}
        >
          <small className='text-muted'>Excludes</small>
          <div>
            {props.filter.excludes.map(char => <span key={char} className='fw-bold text-secondary me-1'>{char}</span>)}
          </div>
          {props.filter.excludes.length === 0 && <small className='text-muted'>&mdash;</small>}
        </button>

        <button
          className={cs('btn btn-sm btn-light ms-3')}
          onClick={() => {
            setActive(null);
            props.onChange({includes: [], excludes: []});
          }}
        >
          Clear
        </button>
      </div>

      {active !== null &&
        <Keyboard
          includes={includes}
          eliminated={excludes}
          onKeyPress={(key) => {
            if (active === 'includes') {
              if (includes.includes(key)) 
                props.onChange({includes: includes.filter(c => c !== key), excludes})
              else
                props.onChange({includes: [...includes, key].sort(), excludes: excludes.filter(c => c !== key)})
            }
            if (active === 'excludes') {
              if (excludes.includes(key)) 
                props.onChange({excludes: excludes.filter(c => c !== key), includes})
              else
                props.onChange({excludes: [...excludes, key].sort(), includes: includes.filter(c => c !== key)})
            }
          }}
        />
      }
    </div>
  )
}