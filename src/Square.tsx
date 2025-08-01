type SquareProps = {
  value: string | null
  highlight: boolean
  onSquareClick: () => void
}

export default function Square({ value, highlight, onSquareClick }: SquareProps) {
  return (
    <button
      className='square'
      onClick={onSquareClick}
      style={{
        color: highlight ? 'red' : 'inherit'
      }}
    >
      {value}
    </button>
  )
}
