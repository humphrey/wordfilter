
import { WordFilter } from './Filtering';
import React from 'react';
import cs from 'classnames';
import { Keyboard } from './Keyboard';

interface Props {
  focus: boolean
  onFocus: () => void
  onBlur: () => void
  filter: WordFilter
  onChange: (newValue: {
    includes: ReadonlyArray<string>
    excludes: ReadonlyArray<string>
  }) => void
}


export const useIncludedLettersField = (props: Props) => {
  const {includes, excludes} = props.filter;
  return {

    onClear: () => {
      props.onChange({includes: [], excludes: []});
      props.onBlur();
    },

    Field: () => (
      <button 
        className={cs('btn d-block', props.focus ? 'btn-outline-primary': 'btn-light')}
        onClick={() => props.onFocus()}
      >
        {props.filter.includes.map(char => <span key={char} className='fw-bold text-warning me-1'>{char}</span>)}
        {props.filter.includes.length === 0 && <small className='text-muted'>&mdash;</small>}
      </button>
    ),

    Keyboard: !props.focus ? null : () => (
      <Keyboard
        includes={includes}
        eliminated={excludes}
        onKeyPress={(key) => {
          if (includes.includes(key)) 
            props.onChange({includes: includes.filter(c => c !== key), excludes});
          else
            props.onChange({includes: [...includes, key].sort(), excludes: excludes.filter(c => c !== key)});
        }}
      />
    )
  }
}


export const useExcludedLettersField = (props: Props) => {
  const {includes, excludes} = props.filter;
  return {

    onClear: () => {
      props.onChange({includes: [], excludes: []});
      props.onBlur();
    },

    Field: () => (
      <button 
        className={cs('btn d-block', props.focus ? 'btn-outline-primary': 'btn-light')}
        onClick={() => props.onFocus()}
      >
        {props.filter.excludes.map(char => <span key={char} className='fw-bold text-secondary me-1'>{char}</span>)}
        {props.filter.excludes.length === 0 && <small className='text-muted'>&mdash;</small>}
      </button>
    ),

    Keyboard: !props.focus ? null : () => (
      <Keyboard
        includes={includes}
        eliminated={excludes}
        onKeyPress={(key) => {
          if (excludes.includes(key)) 
            props.onChange({excludes: excludes.filter(c => c !== key), includes});
          else
            props.onChange({excludes: [...excludes, key].sort(), includes: includes.filter(c => c !== key)});
        }}
      />
    )
  }
}

