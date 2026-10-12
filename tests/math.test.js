import { describe, expect, it } from 'vitest'

import { add, multiply, subtract } from '../src/math.js'

describe('math', () => {
  it('adds', () => {
    expect(add(1, 1)).toBe(2)
  })

  it('subtracts', () => {
    expect(subtract(2, 1)).toBe(1)
  })

  it('multiplies (legacy)', () => {
    expect(multiply(2, 3)).toBe(6)
  })
})
