import { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import './App.css'
import { useExcludedLettersField, useIncludedLettersField } from './ExcludedList'
import { Field } from './Field'
import { defaultFilter, WordFilter } from './Filtering'
import { LengthBtnGroup } from './LengthSelector'
import { MatchList } from './MatchList'
import { usePatternFilter } from './PatternFilter'



function App() {
  const [filter, setFilter] = useState<WordFilter>(defaultFilter)
  const [focused, setFocused] = useState<null | 'length' | 'pattern' | 'includes' | 'excludes'>(null);
  const includesField = useIncludedLettersField({
    filter, 
    focus: focused === 'includes',
    onFocus: () => setFocused('includes'),
    onBlur: () => setFocused(null),
    onChange: newValue => setFilter({...filter, ...newValue})
  })
  const excludesField = useExcludedLettersField({
    filter, 
    focus: focused === 'excludes',
    onFocus: () => setFocused('excludes'),
    onBlur: () => setFocused(null),
    onChange: newValue => setFilter({...filter, ...newValue})
  })
  const patternField = usePatternFilter({
    pattern: filter.pattern, 
    length: filter.length,
    focus: focused === 'pattern',
    onFocus: () => setFocused('pattern'),
    onBlur: () => setFocused(null),
    onChange: pattern => setFilter({...filter, pattern})
  })
  const FieldKeyboard = includesField.Keyboard ?? excludesField.Keyboard ?? patternField.Keyboard;

  return (
    <div> 
    {/* <div className='d-flex bg-primary-subtle'> */}

      {/* <LengthSelect value={filter.length} onChange={length => setFilter({...filter, length})}/>

      {filter.length !== null &&
        <PatternFilter 
          length={filter.length} 
          pattern={filter.pattern}
          onChange={pattern => setFilter({...filter, pattern})}
        />
      } */}

      {/* <button className='btn btn-light btn-sm ms-auto' onClick={() => setFilter(defaultFilter)}> */}
        {/* <FontAwesomeIcon icon={faXmark}/> */}
        {/* Reset */}
      {/* </button> */}

    {/* </div> */}

    <div className='border-bottom shadow sticky-top bg-secondary-subtle'>

      <Field title="Length" >
        <LengthBtnGroup 
          value={filter.length} 
          onChange={length => setFilter({...filter, length})}
          onFocus={() => setFocused('length')}
          onBlur={() => setFocused(null)}
          focus={focused === 'length'}
        />
      </Field>

      <Field title="Pattern">
        <patternField.Field/>
      </Field>



      <div className='row'>
          <div className='col-6'>
            <Field title="Also encludes" /*onReset={includesField.onClear}*/>
              <includesField.Field/>
            </Field>
          </div>
          <div className='col-6'>
            <Field title="Also excludes" /*onReset={excludesField.onClear}*/>
              <excludesField.Field/>
            </Field>
          </div>
        </div>
      </div>
        

      {/* <div className='small text-muted'>Unknown letters</div>
      <div>
        <ExcludedList filter={filter} onChange={({includes, excludes}) => setFilter({...filter, includes, excludes})}/>
      </div> */}
      {/* <div className='m-3'> */}
        {/* <Keyboard/> */}
      {/* </div> */}
      <br/>
      
      <Offcanvas 
        show={FieldKeyboard !== null} 
        placement='bottom' backdrop={false} scroll={true} style={{height: '240px'}}
        onHide={() => setFocused(null)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{focused}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {FieldKeyboard && <FieldKeyboard/>}
        </Offcanvas.Body>
      </Offcanvas>

      <div>
        <MatchList filter={filter}/>
      </div>
    </div>
  )
}

export default App
