import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MatchList } from './MatchList'
import { LengthSelector } from './LengthSelector'
import { WordFilter } from './Filtering'
import { Keyboard } from './Keyboard'
import { PatternFilter } from './PatternFilter'

function App() {
  const [filter, setFilter] = useState<WordFilter>({
    length: 5,
    excluded: [],
    pattern: [null, null, null, null, null],
  })

  return (
    <> 
      <div className='small text-muted'>Word length</div>
      <div>
        <LengthSelector value={filter.length} onChange={length => setFilter({...filter, length})}/>
      </div>
      <div className='small text-muted'>Pattern</div>
      <div>
        {filter.length === null 
          ? '-' 
          : <PatternFilter 
              length={filter.length} 
              pattern={filter.pattern}
              onChange={pattern => setFilter({...filter, pattern})}
            />}
      </div>
      {/* <div className='m-3'> */}
        {/* <Keyboard/> */}
      {/* </div> */}
      <br/>
      <div>
        <MatchList filter={filter}/>
      </div>
    </>
  )
}

export default App
