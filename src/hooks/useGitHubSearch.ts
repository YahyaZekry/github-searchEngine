import { useState, useCallback, useEffect } from 'react'
import { GitHubUser } from '@/utils/types'
import { RESULTS_PER_PAGE } from '@/utils/constants'
import GitHubApiService from '@/services/githubApi'

const apiService = new GitHubApiService()

export const useGitHubSearch = () => {
  const [username, setUsername] = useState('')
  const [results, setResults] = useState<GitHubUser[]>([])
  const [page, setPage] = useState(1)

  // Add logging to track page changes
  const logPageChange = useCallback((newPage: number, source: string) => {
    console.log(`[DEBUG] Page change from ${page} to ${newPage} (source: ${source})`)
  }, [page])
  const [totalResults, setTotalResults] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setLoadingState = useCallback((loading: boolean) => {
    setLoading(loading)
  }, [])

  const setErrorState = useCallback((error: string | null) => {
    setError(error)
    setLoadingState(false)
  }, [])

  const searchUsers = useCallback(async () => {
    // Debug logging to identify the issue
    console.log('[DEBUG] searchUsers called:', { username, page })
    
    // Validate username - ensure it's not empty, just whitespace, and meets minimum length
    if (!username || !username.trim()) {
      setResults([])
      setTotalResults(0)
      setHasNextPage(false)
      setErrorState('Please enter a username to search.')
      return
    }
    
    // Add minimum length requirement for usernames (GitHub usernames are at least 1 character)
    if (username.trim().length < 1) {
      setResults([])
      setTotalResults(0)
      setHasNextPage(false)
      setErrorState('Username must be at least 1 character long.')
      return
    }

    setLoadingState(true)
    setErrorState(null)

    try {
      const response = await apiService.searchUsers(username, page)
      const totalPages = Math.ceil(response.totalCount / RESULTS_PER_PAGE)

      setResults(response.users)
      setTotalResults(response.totalCount)
      setHasNextPage(page < totalPages)
      setLoadingState(false)
    } catch (error) {
      console.error('Search error:', error)
      setErrorState(error instanceof Error ? error.message : 'An error occurred')
    }
  }, [username, page])

  // Auto-search when username or page changes
  useEffect(() => {
    if (username && username.trim()) {
      searchUsers()
    } else {
      // Clear results if username is invalid
      setResults([])
      setTotalResults(0)
      setHasNextPage(false)
      setErrorState(null)
    }
  }, [username, page, searchUsers])

  const resetSearch = useCallback(() => {
    setUsername('')
    setResults([])
    setPage(1)
    setTotalResults(0)
    setHasNextPage(false)
    setErrorState(null)
  }, [setUsername, setErrorState])

  // Wrap setPage with logging
  const setPageWithLogging = useCallback((newPage: number) => {
    logPageChange(newPage, 'setPage')
    setPage(newPage)
  }, [logPageChange, setPage])

  return {
    username,
    results,
    page,
    totalResults,
    hasNextPage,
    loading,
    error,
    setUsername,
    setPage: setPageWithLogging,
    searchUsers,
    resetSearch,
  }
}