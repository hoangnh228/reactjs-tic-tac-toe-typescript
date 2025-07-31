type SquareProp = {
  value: string | null
  onSquareClick: () => void
}

export default function Square({ value, onSquareClick }: SquareProp) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}
