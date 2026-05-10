"use client"

import { useState } from "react"

interface CounterProps {
  initialCount?: number
  label?: string
}

export default function Counter({
  initialCount = 0,
  label = "Count",
}: CounterProps) {
  const [count, setCount] = useState(initialCount)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(initialCount)

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold">{label}</h2>
      <p data-testid="count-value" className="text-4xl font-bold">
        {count}
      </p>
      <div className="flex gap-2">
        <button
          data-testid="decrement-button"
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <button
          data-testid="reset-button"
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          data-testid="increment-button"
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  )
}
