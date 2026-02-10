import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Auth from '../page'

// Mock the actions
vi.mock('@/app/actions', () => ({
  credentialLogin: vi.fn(),
}))

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    }
  },
}))

/**
 * Auth Page Integration Tests
 *
 * এখানে আমরা test করছি:
 * 1. Form elements সঠিকভাবে render হয় কিনা
 * 2. Password visibility toggle কাজ করে কিনা
 * 3. Form input handling
 * 4. Successful login flow
 * 5. Failed login with error message
 * 6. Loading state during submission
 */
describe('Auth Page Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all form elements correctly', () => {
    const { container } = render(<Auth />)

    // Check heading
    expect(screen.getByText('Peace Home Empire')).toBeInTheDocument()
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()

    // Check form labels
    expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()

    // Check submit button
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()

    // Check Logo component (Wrench icon)
    expect(container.querySelector('svg.lucide-wrench')).toBeInTheDocument()
  })

  it('should toggle password visibility', async () => {
    const user = userEvent.setup()
    render(<Auth />)

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: '' }).parentElement?.querySelector('button[type="button"]') as HTMLButtonElement

    // Initially password should be hidden
    expect(passwordInput.type).toBe('password')

    // Click to show password
    await user.click(toggleButton)
    expect(passwordInput.type).toBe('text')

    // Click to hide password again
    await user.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })

  it('should handle phone number input correctly (max 11 digits)', async () => {
    const user = userEvent.setup()
    render(<Auth />)

    const phoneInput = screen.getByLabelText('Mobile Number')

    // Should allow typing numbers
    await user.type(phoneInput, '01234567890')
    expect(phoneInput).toHaveValue('01234567890')

    // Should not allow more than 11 digits
    await user.type(phoneInput, '1')
    expect(phoneInput).toHaveValue('01234567890')
  })

  it('should not allow non-numeric characters in phone number', async () => {
    const user = userEvent.setup()
    render(<Auth />)

    const phoneInput = screen.getByLabelText('Mobile Number')

    // Try to type letters
    await user.type(phoneInput, 'abcd')
    expect(phoneInput).toHaveValue('')
  })

  it('should handle password input', async () => {
    const user = userEvent.setup()
    render(<Auth />)

    const passwordInput = screen.getByLabelText('Password')

    await user.type(passwordInput, 'mypassword123')
    expect(passwordInput).toHaveValue('mypassword123')
  })

  it('should show error when login fails', async () => {
    const user = userEvent.setup()
    const { credentialLogin } = await import('@/app/actions')

    // Mock failed login
    vi.mocked(credentialLogin).mockResolvedValue({
      success: false,
      msg: 'Invalid credentials',
    })

    render(<Auth />)

    // Fill form
    await user.type(screen.getByLabelText('Mobile Number'), '01234567890')
    await user.type(screen.getByLabelText('Password'), 'wrongpassword')

    // Submit form
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('should redirect on successful login', async () => {
    const user = userEvent.setup()
    const { credentialLogin } = await import('@/app/actions')

    // Mock successful login
    vi.mocked(credentialLogin).mockResolvedValue({
      success: true,
      data: { user: { id: '1', name: 'Test User' } },
    })

    render(<Auth />)

    // Fill form
    await user.type(screen.getByLabelText('Mobile Number'), '01234567890')
    await user.type(screen.getByLabelText('Password'), 'correctpassword')

    // Submit form
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('should show loading state during submission', async () => {
    const user = userEvent.setup()
    const { credentialLogin } = await import('@/app/actions')

    // Mock slow login
    vi.mocked(credentialLogin).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                success: true,
                data: {},
              }),
            100
          )
        })
    )

    render(<Auth />)

    // Fill form
    await user.type(screen.getByLabelText('Mobile Number'), '01234567890')
    await user.type(screen.getByLabelText('Password'), 'password')

    // Submit form
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    // Check button shows loading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Signing In...' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Signing In...' })).toBeDisabled()
    })
  })

  it('should handle unexpected errors gracefully', async () => {
    const user = userEvent.setup()
    const { credentialLogin } = await import('@/app/actions')

    // Mock error
    vi.mocked(credentialLogin).mockRejectedValue(new Error('Network error'))

    render(<Auth />)

    // Fill form
    await user.type(screen.getByLabelText('Mobile Number'), '01234567890')
    await user.type(screen.getByLabelText('Password'), 'password')

    // Submit form
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })

  it('should show icon color change on focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<Auth />)

    const phoneInput = screen.getByLabelText('Mobile Number')

    // Icon should be gray initially
    const phoneIcon = container.querySelector('svg.lucide-smartphone')
    expect(phoneIcon).toHaveClass('text-slate-400')

    // Focus on input
    await user.click(phoneInput)

    // Icon should change to blue on focus
    await waitFor(() => {
      expect(phoneIcon).toHaveClass('text-blue-600')
    })
  })

  it('should require all fields', async () => {
    const user = userEvent.setup()
    render(<Auth />)

    const phoneInput = screen.getByLabelText('Mobile Number')
    const passwordInput = screen.getByLabelText('Password')

    // Both fields should be required
    expect(phoneInput).toBeRequired()
    expect(passwordInput).toBeRequired()

    // Try to submit without filling
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)

    // HTML5 validation should prevent submission
    expect(phoneInput).toBeInvalid()
  })
})
