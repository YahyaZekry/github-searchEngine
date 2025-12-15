import React from 'react'
import {
  ChakraProvider,
  ColorModeScript,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

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

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

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

  const textColor = useColorModeValue('neutral.800', 'neutral.200')
  const subtitleColor = useColorModeValue('neutral.600', 'neutral.400')

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Layout>
          <VStack spacing={8} align="stretch">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <VStack spacing={6} align="stretch">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Heading
                    size="2xl"
                    color={textColor}
                    textAlign="center"
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    bgClip="text"
                    fontWeight="700"
                    letterSpacing="-0.02em"
                  >
                    Search GitHub Users
                  </Heading>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Text
                    color={subtitleColor}
                    textAlign="center"
                    fontSize="lg"
                    maxW="600px"
                    mx="auto"
                    lineHeight="1.6"
                  >
                    Discover amazing developers and explore their GitHub profiles with our powerful search engine
                  </Text>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <SearchForm
                    value={username}
                    onChange={setUsername}
                    onSubmit={handleSearch}
                    isLoading={loading}
                    error={error}
                  />
                </motion.div>
              </VStack>
            </motion.div>

            <AnimatePresence mode="wait">
              {loading && page === 1 ? (
                <motion.div
                  key="loading"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <LoadingSpinner message="Searching users..." size="lg" />
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <ErrorMessage
                    message={error}
                    onRetry={handleSearch}
                    title="Search Error"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <VStack spacing={8} align="stretch">
                    <UserList users={results} loading={loading && page > 1} />
                    
                    {results.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <PageNavigation
                          currentPage={page}
                          totalPages={paginationInfo.totalPages}
                          hasNextPage={hasNextPage}
                          hasPreviousPage={paginationInfo.hasPreviousPage}
                          onPageChange={handlePageChange}
                          isLoading={loading}
                        />
                      </motion.div>
                    )}
                  </VStack>
                </motion.div>
              )}
            </AnimatePresence>
          </VStack>
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App