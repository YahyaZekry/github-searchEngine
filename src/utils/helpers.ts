import { ERROR_MESSAGES } from './constants'

export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) {
    return '0'
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getErrorMessage = (error: any): string => {
  if (error.response) {
    const status = error.response.status
    if (status === 403) {
      return ERROR_MESSAGES.RATE_LIMIT
    }
    if (status === 404) {
      return ERROR_MESSAGES.NOT_FOUND
    }
  }
  if (error.request) {
    return ERROR_MESSAGES.NETWORK_ERROR
  }
  return ERROR_MESSAGES.GENERIC
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const calculatePagination = (
  page: number,
  totalResults: number,
  resultsPerPage: number
) => {
  // Guard against invalid inputs
  if (!totalResults || totalResults <= 0 || !resultsPerPage || resultsPerPage <= 0) {
    return {
      currentPage: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    }
  }

  const totalPages = Math.ceil(totalResults / resultsPerPage)
  // GitHub API has a practical maximum page limit of 100 for search results
  // Despite documentation saying 1000, pages above 100 return 422 errors
  const maxPage = Math.min(totalPages, 100)
  const safePage = Math.max(1, Math.min(page, maxPage)) // Ensure page is within valid range
  const hasNextPage = safePage < maxPage
  const hasPreviousPage = safePage > 1

  return {
    currentPage: safePage,
    totalPages: maxPage,
    hasNextPage,
    hasPreviousPage,
  }
}