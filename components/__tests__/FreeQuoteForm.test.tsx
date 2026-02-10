import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FreeQuoteForm from '../FreeQuoteForm'

// Mock the API client
vi.mock('@/lib/api-client/free-quote', () => ({
  addFreeQuote: vi.fn(() => Promise.resolve('Quote submitted successfully')),
}))

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock the cities constant
vi.mock('@/consttant/selangorCities', () => ({
  selangorCities: ['Shah Alam', 'Petaling Jaya', 'Subang Jaya'],
}))

/**
 * Integration Test for FreeQuoteForm
 *
 * Integration test এ আমরা পুরো component এর user interaction test করি:
 * 1. User input কীভাবে handle হয়
 * 2. Form submission সঠিকভাবে কাজ করে কিনা
 * 3. API call হচ্ছে কিনা
 * 4. Success/Error message show হচ্ছে কিনা
 */
describe('FreeQuoteForm Integration Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
  })

  it('should render all form fields', () => {
    const { container } = render(<FreeQuoteForm />)

    // Check all input fields exist
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    // Phone input - find by id since label doesn't match
    expect(container.querySelector('#phone_number')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Describe Your Problem/i)).toBeInTheDocument()

    // Check submit button
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('should allow user to type in input fields', async () => {
    const user = userEvent.setup()
    const { container } = render(<FreeQuoteForm />)

    const nameInput = screen.getByLabelText(/First Name/i)
    const emailInput = screen.getByLabelText(/Email/i)
    // Find phone input by id (type="tel" is not a textbox role)
    const phoneInput = container.querySelector('#phone_number') as HTMLInputElement

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(phoneInput, '0123456789')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(phoneInput).toHaveValue('0123456789')
  })

  it('should allow user to select a city', async () => {
    const user = userEvent.setup()
    render(<FreeQuoteForm />)

    const citySelect = screen.getByLabelText('City')

    await user.selectOptions(citySelect, 'Shah Alam')

    expect(citySelect).toHaveValue('Shah Alam')
  })

  it('should show required validation for empty fields', async () => {
    const user = userEvent.setup()
    render(<FreeQuoteForm />)

    const submitButton = screen.getByRole('button', { name: /Submit/i })

    // Try to submit without filling required fields
    await user.click(submitButton)

    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText(/First Name/i)
    expect(nameInput).toBeInvalid()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    const { addFreeQuote } = await import('@/lib/api-client/free-quote')
    const { toast } = await import('react-toastify')
    const { container } = render(<FreeQuoteForm />)

    // Fill in the form
    await user.type(screen.getByLabelText(/First Name/i), 'John Doe')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(container.querySelector('#phone_number')!, '0123456789')
    await user.selectOptions(screen.getByLabelText('City'), 'Shah Alam')
    await user.type(screen.getByLabelText(/Address/i), '123 Main Street')
    await user.type(
      screen.getByLabelText(/Describe Your Problem/i),
      'Need plumbing repair'
    )

    // Submit the form
    await user.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(addFreeQuote).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith('Quote submitted successfully')
    })
  })

  it('should show loading state during submission', async () => {
    const user = userEvent.setup()
    const { addFreeQuote } = await import('@/lib/api-client/free-quote')

    // Make API call take longer
    vi.mocked(addFreeQuote).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve('Quote submitted successfully'), 100)
        })
    )

    const { container } = render(<FreeQuoteForm />)

    // Fill required fields
    await user.type(screen.getByLabelText(/First Name/i), 'John Doe')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(container.querySelector('#phone_number')!, '0123456789')
    await user.selectOptions(screen.getByLabelText('City'), 'Shah Alam')
    await user.type(
      screen.getByLabelText(/Describe Your Problem/i),
      'Need repair'
    )

    // Submit form
    await user.click(screen.getByRole('button', { name: /Submit/i }))

    // Check for loading spinner icon (Loader component renders as SVG)
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Submit/i })
      // The button should contain a loader/spinner when submitting
      expect(submitButton.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('should handle API error gracefully', async () => {
    const user = userEvent.setup()
    const { addFreeQuote } = await import('@/lib/api-client/free-quote')
    const { toast } = await import('react-toastify')

    // Mock API failure
    vi.mocked(addFreeQuote).mockRejectedValue(new Error('Network error'))

    const { container } = render(<FreeQuoteForm />)

    // Fill required fields
    await user.type(screen.getByLabelText(/First Name/i), 'John Doe')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(container.querySelector('#phone_number')!, '0123456789')
    await user.selectOptions(screen.getByLabelText('City'), 'Shah Alam')
    await user.type(
      screen.getByLabelText(/Describe Your Problem/i),
      'Need repair'
    )

    // Submit form
    await user.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to submit quote. Please try again.'
      )
    })
  })
})
