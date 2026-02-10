import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../button'

/**
 * Button Component Tests
 *
 * এখানে আমরা শিখবো:
 * 1. Component prop অনুযায়ী render হয় কিনা
 * 2. Click event কাজ করে কিনা
 * 3. Different variants and sizes apply হয় কিনা
 * 4. Disabled state কাজ করে কিনা
 */
describe('Button Component', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
  })

  it('should render with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)

    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toHaveClass('bg-destructive')
  })

  it('should render with outline variant', () => {
    render(<Button variant="outline">Cancel</Button>)

    const button = screen.getByRole('button', { name: 'Cancel' })
    expect(button).toHaveClass('border', 'bg-background')
  })

  it('should render with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)

    const button = screen.getByRole('button', { name: 'Ghost' })
    expect(button).toHaveClass('hover:bg-accent')
  })

  it('should render with primary variant', () => {
    render(<Button variant="primary">Primary</Button>)

    const button = screen.getByRole('button', { name: 'Primary' })
    expect(button).toHaveClass('bg-accent-500')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10')
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not handle click when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Disabled' })
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
  })

  it('should render as child when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should render icon with correct size', () => {
    render(<Button size="icon"><span>Icon</span></Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('size-9')
  })
})
