import React from 'react'
import {
  ChakraProvider,
  ColorModeScript,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import theme from '@/styles/theme'
import { Layout } from '@/components/layout/Layout'
import { SearchForm } from '@/components/common/SearchForm'
import { UserList } from '@/components/common/UserList'
import { PageNavigation } from '@/components/common/PageNavigation'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useGitHubSearch } from '@/hooks/useGitHubSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { RESULTS_PER_PAGE } from '@/utils/constants'
import { calculatePagination } from '@/utils/helpers'

function App() {
  const {
    username,
    results,
    page,
    totalResults,
    hasNextPage,
    loading,
    error,
    setUsername,
    setPage,
  } = useGitHubSearch()

  const debouncedUsername = useDebounce(username, 300)

  // Update search hook with debounced username
  React.useEffect(() => {
    setUsername(debouncedUsername)
  }, [debouncedUsername, setUsername])

  const handleSearch = () => {
    if (username.trim()) {
      setPage(1)
    }
  }

  const handlePageChange = (newPage: number) => {
    console.log('[DEBUG] App: handlePageChange called with:', newPage)
    setPage(newPage)
  }

  const paginationInfo = calculatePagination(page, totalResults, RESULTS_PER_PAGE)

  const textColor = useColorModeValue('gray.700', 'gray.200')

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Layout>
          <VStack spacing={6} align="stretch">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={4} align="stretch">
                <Heading size="lg" color={textColor} textAlign="center">
                  Search GitHub Users
                </Heading>
                <Text color={textColor} textAlign="center" fontSize="md">
                  Find GitHub users by username and explore their profiles
                </Text>
                <SearchForm
                  value={username}
                  onChange={setUsername}
                  onSubmit={handleSearch}
                  isLoading={loading}
                />
              </VStack>
            </motion.div>

            {loading && page === 1 ? (
              <LoadingSpinner message="Searching users..." size="lg" />
            ) : error ? (
              <ErrorMessage
                message={error}
                onRetry={handleSearch}
                title="Search Error"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <UserList users={results} loading={loading && page > 1} />
                
                {results.length > 0 && (
                  <PageNavigation
                    currentPage={page}
                    totalPages={paginationInfo.totalPages}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={paginationInfo.hasPreviousPage}
                    onPageChange={handlePageChange}
                    isLoading={loading}
                  />
                )}
              </motion.div>
            )}
          </VStack>
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App