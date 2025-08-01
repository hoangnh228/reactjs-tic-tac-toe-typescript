import { useMemo, useState } from 'react'
import type { Sort } from './@types/Sort.type'
import type { Squares } from './@types/Squares.type'

type HistoryProps = {
  history: Squares[]
  currentMove: number
  jumpTo: (index: number) => void
}

export default function History({ history, currentMove, jumpTo }: HistoryProps) {
  const [sort, setSort] = useState<Sort>('ascending')

  const handleChangeSort = () => {
    setSort((prev) => (prev === 'ascending' ? 'descending' : 'ascending'))
  }

  // use useMemo to calculate only when the value of `history`, `currentMove` or `jumpTo` changed
  const moves = useMemo(() => {
    return history.map((_, index) => {
      const description = index > 0 ? `Go to move #${index}` : 'Go to game start'
      const isCurrentMove = index === currentMove

      return (
        <li key={index}>
          {isCurrentMove ? (
            <span>You are at {index === 0 ? 'game start' : `move #${currentMove}`}</span>
          ) : (
            <button onClick={() => jumpTo(index)}>{description}</button>
          )}
        </li>
      )
    })
  }, [history, currentMove, jumpTo])

  // use useMemo to calculate only when the `value` of moves or `sort` changed
  const sortedMoves = useMemo(() => {
    return sort === 'ascending' ? moves : moves.slice().reverse()
  }, [moves, sort])

  return (
    <>
      <ol>{sortedMoves}</ol>
      <p>Moves history is being sorted by {sort}</p>
      <button onClick={handleChangeSort}>Change to {sort === 'ascending' ? 'descending' : 'ascending'}</button>
    </>
  )
}
