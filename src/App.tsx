import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MatchList } from './MatchList'
import { LengthSelector } from './LengthSelector'
import { WordFilter } from './Filtering'
import { Keyboard } from './Keyboard'

function App() {
  const [filter, setFilter] = useState<WordFilter>({
    length: 5,
    excluded: [],
  })

  return (
    <> 
      <div className='small text-muted'>Word length</div>
      <div>
        <LengthSelector value={filter.length} onChange={length => setFilter({...filter, length})}/>
      </div>
      <div className='m-3'>
        <Keyboard/>
      </div>
      <br/>
      <div>
        <MatchList filter={filter}/>
      </div>
    </>
  )
}

export default App
