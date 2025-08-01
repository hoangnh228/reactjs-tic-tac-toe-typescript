import type { Squares } from './@types/Squares.type'
import Square from './Square'

type BoardProps = {
  squares: Squares
  xIsNext: boolean
  onPlay: (squares: Squares) => void
}

export default function Board({ squares, xIsNext, onPlay }: BoardProps) {
  const winner = calculateWinner(squares)

  const handleSquareClick = (i: number) => () => {
    if (squares[i] || winner) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner.winner}`
    }

    if (!squares.includes(null)) {
      return 'The result being a draw'
    }

    return `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div className='status'>{getStatus()}</div>
      {[0, 1, 2].map((row) => (
        <div className='board-row' key={row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col
            return (
              <Square
                key={col}
                value={squares[index]}
                highlight={winner?.line.includes(index) ?? false}
                onSquareClick={handleSquareClick(index)}
              />
            )
          })}
        </div>
      ))}
    </>
  )
}

type WinnerResult = {
  winner: string
  line: number[]
} | null

const calculateWinner = (squares: Squares): WinnerResult => {
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
        winner: squares[a]!,
        line: [a, b, c]
      }
    }
  }

  return null
}
