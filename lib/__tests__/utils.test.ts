import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

/**
 * Utility Function Tests
 *
 * Pure function test করা সবচেয়ে সহজ।
 * আমরা input দিয়ে output check করি।
 *
 * cn() function হলো clsx এবং tailwind-merge এর combination
 * যা conditional classes merge করে।
 */
describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'removed-class')
    expect(result).toContain('base-class')
    expect(result).toContain('conditional-class')
    expect(result).not.toContain('removed-class')
  })

  it('should handle undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'another-class')
    expect(result).toContain('base-class')
    expect(result).toContain('another-class')
  })

  it('should merge conflicting tailwind classes', () => {
    // tailwind-merge পরে দেওয়া class কে priority দেয়
    const result = cn('text-red-500 text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
    expect(result).toContain('class3')
  })

  it('should handle object with conditional classes', () => {
    const result = cn({
      'class-1': true,
      'class-2': false,
      'class-3': true,
    })
    expect(result).toContain('class-1')
    expect(result).not.toContain('class-2')
    expect(result).toContain('class-3')
  })
})
