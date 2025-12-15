export const GITHUB_API_BASE_URL = 'https://api.github.com'
export const RESULTS_PER_PAGE = 10
export const DEBOUNCE_DELAY = 300

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  RATE_LIMIT: 'GitHub API rate limit exceeded. Please try again later.',
  NOT_FOUND: 'No users found matching your search.',
  GENERIC: 'An error occurred. Please try again.',
}

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
}