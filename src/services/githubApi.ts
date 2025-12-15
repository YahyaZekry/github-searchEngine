import ApiService from './api'
import { GitHubUser, SearchResponse } from '@/utils/types'
import { GITHUB_API_BASE_URL, RESULTS_PER_PAGE } from '@/utils/constants'

// Define the GitHub API search response interface
interface GitHubSearchResponse {
  items: Array<{
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    location: string | null;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
    created_at: string;
    updated_at: string;
  }>;
  total_count: number;
  incomplete_results: boolean;
}

class GitHubApiService extends ApiService {
  constructor() {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    super(GITHUB_API_BASE_URL, token)
  }

  async searchUsers(
    username: string,
    page: number = 1
  ): Promise<SearchResponse> {
    // Debug logging to track page validation
    console.log('[DEBUG] GitHub API searchUsers called with:', { username, page })
    
    // Validate page number - GitHub API has a practical limit much lower than documented
    // Based on testing, pages above 100 return 422 errors
    if (page < 1 || page > 100) {
      console.log('[DEBUG] Page validation failed for page:', page)
      throw new Error('Page number must be between 1 and 100. GitHub API only supports up to 100 pages for search results.')
    }
    
    console.log('[DEBUG] Page validation passed for page:', page)

    try {
      const response = await this.get('/search/users', {
        params: {
          q: username,
          per_page: RESULTS_PER_PAGE,
          page,
        },
      }) as GitHubSearchResponse

      return {
        users: response.items.map((item) => this.transformUserResponse(item)),
        totalCount: response.total_count,
        incomplete_results: response.incomplete_results,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getUserDetails(username: string): Promise<GitHubUser> {
    try {
      const user = await this.get(`/users/${username}`)
      return this.transformUserResponse(user)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private transformUserResponse(user: any): GitHubUser {
    return {
      id: user.id,
      login: user.login,
      name: user.name || null,
      avatar_url: user.avatar_url,
      bio: user.bio || null,
      location: user.location || null,
      followers: user.followers || 0,
      following: user.following || 0,
      public_repos: user.public_repos || 0,
      html_url: user.html_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || 'API Error'

      switch (status) {
        case 403:
          return new Error('GitHub API rate limit exceeded. Please try again later.')
        case 404:
          return new Error('User not found.')
        case 422:
          // Handle specific validation errors from GitHub API
          if (message.includes('query')) {
            return new Error('Invalid search query. Please check your search terms and try again.')
          }
          return new Error('Invalid request. Please check your input and try again.')
        default:
          return new Error(`${message} (${status})`)
      }
    }

    // Handle custom validation errors from our own validation
    if (error.message && (
      error.message.includes('Page number must be between') ||
      error.message.includes('Username must be at least')
    )) {
      return error
    }

    if (error.request) {
      return new Error('Network error. Please check your connection.')
    }

    return new Error('An unexpected error occurred.')
  }
}

export default GitHubApiService