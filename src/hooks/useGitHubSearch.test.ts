import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGitHubSearch } from './useGitHubSearch'

// Mock the GitHub API service
vi.mock('@services/githubApi', () => ({
  default: class {
    searchUsers = vi.fn()
  },
}))

describe('useGitHubSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGitHubSearch())

    expect(result.current.username).toBe('')
    expect(result.current.results).toEqual([])
    expect(result.current.page).toBe(1)
    expect(result.current.totalResults).toBe(0)
    expect(result.current.hasNextPage).toBe(false)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should update username when setUsername is called', async () => {
    const { result } = renderHook(() => useGitHubSearch())

    act(() => {
      result.current.setUsername('testuser')
    })

    expect(result.current.username).toBe('testuser')
    expect(result.current.page).toBe(1)
  })

  it('should update page when setPage is called', async () => {
    const { result } = renderHook(() => useGitHubSearch())

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)
  })

  it('should reset search when resetSearch is called', async () => {
    const { result } = renderHook(() => useGitHubSearch())

    // Set some state first
    act(() => {
      result.current.setUsername('testuser')
      result.current.setPage(2)
    })

    // Reset
    act(() => {
      result.current.resetSearch()
    })

    expect(result.current.username).toBe('')
    expect(result.current.results).toEqual([])
    expect(result.current.page).toBe(1)
    expect(result.current.totalResults).toBe(0)
    expect(result.current.hasNextPage).toBe(false)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })
})