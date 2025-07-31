import type { Squares } from './@types/Squares.type'
import Square from './Square'

type BoardProp = {
  squares: Squares
  xIsNext: boolean
  onPlay: (squares: Squares) => void
}

export default function Board({ squares, xIsNext, onPlay }: BoardProp) {
  const winner = calculateWinner(squares)

  const handleSquareClick = (i: number) => () => {
    if (squares[i] || winner) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={handleSquareClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={handleSquareClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={handleSquareClick(8)} />
      </div>
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
      return squares[a]
    }
  }

  return null
}
