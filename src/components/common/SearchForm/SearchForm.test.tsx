import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchForm } from './index'

describe('SearchForm', () => {
  it('should render input with placeholder', () => {
    render(
      <SearchForm
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    const input = screen.getByPlaceholderText('Search GitHub users...')
    expect(input).toBeInTheDocument()
  })

  it('should call onSubmit when form is submitted', () => {
    const mockOnSubmit = vi.fn()
    render(
      <SearchForm
        value="test"
        onChange={vi.fn()}
        onSubmit={mockOnSubmit}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('should call onChange when input value changes', () => {
    const mockOnChange = vi.fn()
    render(
      <SearchForm
        value=""
        onChange={mockOnChange}
        onSubmit={vi.fn()}
      />
    )

    const input = screen.getByPlaceholderText('Search GitHub users...')
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(mockOnChange).toHaveBeenCalledWith('new value')
  })

  it('should show loading state when isLoading is true', () => {
    render(
      <SearchForm
        value="test"
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        isLoading={true}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})