export interface GitHubUser {
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
}

export interface SearchResponse {
  users: GitHubUser[];
  totalCount: number;
  incomplete_results: boolean;
}

export interface SearchState {
  username: string;
  results: GitHubUser[];
  page: number;
  totalResults: number;
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}