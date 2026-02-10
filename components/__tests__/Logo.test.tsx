import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Logo from '../Logo'

/**
 * Logo Component Tests
 *
 * Unit testing হলো component কে আলাদা আলাদা ভাবে test করা।
 * আমরা এখানে check করছি:
 * 1. Component properly render হয় কিনা
 * 2. Correct elements exist করে কিনা
 * 3. Correct classes apply হয়েছে কিনা
 */
describe('Logo Component', () => {
  it('should render the logo container with correct styling', () => {
    const { container } = render(<Logo />)

    // div element with bg-accent-600 class খুঁজছি
    const logoContainer = container.querySelector('.bg-accent-600')
    expect(logoContainer).toBeInTheDocument()
  })

  it('should render the Wrench icon', () => {
    const { container } = render(<Logo />)

    // Wrench icon SVG খুঁজছি - lucide-react icons render as SVG elements
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('lucide-wrench')
  })

  it('should have correct container classes', () => {
    const { container } = render(<Logo />)

    const logoContainer = container.querySelector('.bg-accent-600')
    expect(logoContainer).toHaveClass('p-4', 'rounded-2xl', 'shadow-lg')
  })
})
