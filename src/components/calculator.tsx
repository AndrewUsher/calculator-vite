import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [input, setInput] = useState('')
  const [total, setTotal] = useState(null)

  const handleClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0')
      setInput('')
      setTotal(null)
    } else if (value === '=') {
      try {
        const result = eval(input.replace('x', '*').replace('÷', '/'))
        setDisplay(result.toString())
        setTotal(result)
        setInput(result.toString())
      } catch (error) {
        console.error(error)
        setDisplay('Error')
      }
    } else if (value === '+/-') {
      setDisplay((prev) => (parseFloat(prev) * -1).toString())
      setInput((prev) => (parseFloat(prev) * -1).toString())
    } else if (value === '%') {
      setDisplay((prev) => (parseFloat(prev) / 100).toString())
      setInput((prev) => `(${prev})/100`)
    } else {
      setDisplay((prev) => (prev === '0' ? value : prev + value))
      setInput((prev) => prev + value)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-4 rounded-lg">
      <div className="mb-4">
        {import.meta.env.DEV && (
          <div className="text-sm text-gray-600">
            <div>Inputs: [{input}]</div>
            <div>Conversion: [{input}]</div>
            <div>Total: {total !== null ? `"${total}"` : ''}</div>
          </div>
        )}
        <div className="text-4xl font-bold mt-2">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          'C',
          '+/-',
          '%',
          '÷',
          '7',
          '8',
          '9',
          'x',
          '4',
          '5',
          '6',
          '-',
          '1',
          '2',
          '3',
          '+',
          '0',
          '.',
          '='
        ].map((btn) => (
          <Button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`h-16 text-xl font-bold rounded-full ${
              ['÷', 'x', '-', '+', '='].includes(btn)
                ? 'bg-orange-400 hover:bg-orange-500 text-white'
                : ['C', '+/-', '%'].includes(btn)
                ? 'bg-gray-300 hover:bg-gray-400 text-black'
                : 'bg-gray-700 hover:bg-gray-800 text-white'
            } ${btn === '0' ? 'col-span-2' : ''}`}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  )
}
