type SquareProp = {
  value: string | null
  highlight: boolean | null
  onSquareClick: () => void
}

export default function Square({ value, highlight, onSquareClick }: SquareProp) {
  return (
    <button
      className='square'
      onClick={onSquareClick}
      style={{
        color: highlight ? 'red' : ''
      }}
    >
      {value}
    </button>
  )
}
