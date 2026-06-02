import { useState, useCallback, useEffect } from 'react'
import { GitHubUser } from '@/utils/types'
import { RESULTS_PER_PAGE } from '@/utils/constants'
import GitHubApiService from '@/services/githubApi'
import { useDebounce } from './useDebounce'

const apiService = new GitHubApiService()

export const useGitHubSearch = () => {
  const [username, setUsername] = useState('')
  const debouncedUsername = useDebounce(username, 500)
  const [results, setResults] = useState<GitHubUser[]>([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchUsers = useCallback(async (searchTerm: string, currentPage: number) => {
    if (!searchTerm || !searchTerm.trim()) {
      setResults([])
      setTotalResults(0)
      setHasNextPage(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiService.searchUsers(searchTerm, currentPage)
      const totalPages = Math.ceil(response.totalCount / RESULTS_PER_PAGE)

      setResults(response.users)
      setTotalResults(response.totalCount)
      setHasNextPage(currentPage < totalPages)
    } catch (err: any) {
      console.error('Search error:', err)
      setError(err.message || 'An unexpected error occurred')
      setResults([])
      setTotalResults(0)
      setHasNextPage(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-search when debounced username or page changes
  useEffect(() => {
    searchUsers(debouncedUsername, page)
  }, [debouncedUsername, page, searchUsers])

  // Reset page when username changes
  useEffect(() => {
    setPage(1)
  }, [debouncedUsername])

  const resetSearch = useCallback(() => {
    setUsername('')
    setResults([])
    setPage(1)
    setTotalResults(0)
    setHasNextPage(false)
    setError(null)
  }, [])

  return {
    username,
    results,
    page,
    totalResults,
    hasNextPage,
    loading,
    error,
    setUsername,
    setPage,
    searchUsers: () => searchUsers(username, page),
    resetSearch,
  }
}