import type { Squares } from './@types/Squares.type'
import Square from './Square'

type BoardProp = {
  squares: Squares
  xIsNext: boolean
  onPlay: (squares: Squares) => void
}

export default function Board({ squares, xIsNext, onPlay }: BoardProp) {
  const finish = calculateWinner(squares)

  const handleSquareClick = (i: number) => () => {
    if (squares[i] || finish) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  let status
  if (finish) {
    status = `Winner: ${finish.winner}`
  } else {
    if (!squares.includes(null)) {
      status = 'The result being a draw'
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }
  }

  return (
    <>
      <div className='status'>{status}</div>
      {[0, 1, 2].map((i) => (
        <div className='board-row' key={i}>
          {[0, 1, 2].map((j) => {
            const index = i * 3 + j
            return (
              <Square
                key={j}
                value={squares[index]}
                highlight={finish && finish.line.includes(index)}
                onSquareClick={handleSquareClick(index)}
              />
            )
          })}
        </div>
      ))}
    </>
  )
}

const calculateWinner = (squares: Squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      }
    }
  }

  return null
}
