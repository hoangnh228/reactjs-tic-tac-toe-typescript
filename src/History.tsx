import { useState } from 'react'
import type { Sort } from './@types/Sort.type'
import type { Squares } from './@types/Squares.type'

type HistoryProp = {
  history: Squares[]
  currentMove: number
  jumpTo: (index: number) => void
}

export default function History({ history, currentMove, jumpTo }: HistoryProp) {
  const [sort, setSort] = useState<Sort>('ascending')

  const handleChangeSort = () => {
    setSort(sort === 'ascending' ? 'descending' : 'ascending')
  }

  const moves = history.map((squares, index) => {
    console.log(squares)
    let description
    if (index > 0) {
      description = `Go to move #${index}`
    } else {
      description = 'Go to game start'
    }

    return (
      <li key={index}>
        {index === currentMove ? (
          <span>You are at {index === 0 ? 'game start' : `move #${currentMove}`}</span>
        ) : (
          <button onClick={() => jumpTo(index)}>{description}</button>
        )}
      </li>
    )
  })

  const moveSorted = sort === 'ascending' ? moves : moves.slice().reverse()

  return (
    <>
      <ol>{moveSorted}</ol>
      <p>Moves history is being sorted by {sort}</p>
      <button onClick={handleChangeSort}>Change to {sort === 'ascending' ? 'descending' : 'ascending'}</button>
    </>
  )
}
