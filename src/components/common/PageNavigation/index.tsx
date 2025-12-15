import React from 'react'
import {
  HStack,
  Button,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface PageNavigationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  isLoading = false,
}) => {
  const textColor = useColorModeValue('gray.700', 'gray.200')

  const handlePrevious = () => {
    if (hasPreviousPage && !isLoading) {
      console.log('[DEBUG] PageNavigation: Previous clicked, changing from', currentPage, 'to', currentPage - 1)
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (hasNextPage && !isLoading) {
      console.log('[DEBUG] PageNavigation: Next clicked, changing from', currentPage, 'to', currentPage + 1)
      onPageChange(currentPage + 1)
    }
  }

  const handleFirst = () => {
    if (!isLoading) {
      console.log('[DEBUG] PageNavigation: First clicked, changing from', currentPage, 'to 1')
      onPageChange(1)
    }
  }

  const handleLast = () => {
    if (!isLoading && totalPages > 0) {
      console.log('[DEBUG] PageNavigation: Last clicked, changing from', currentPage, 'to', totalPages)
      onPageChange(totalPages)
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <Box py={6}>
      <HStack justify="center" align="center" spacing={4}>
        <Button
          onClick={handleFirst}
          isDisabled={!hasPreviousPage || isLoading}
          size="sm"
          variant="outline"
        >
          First
        </Button>

        <Button
          onClick={handlePrevious}
          isDisabled={!hasPreviousPage || isLoading}
          size="sm"
          variant="outline"
          leftIcon={<ChevronLeftIcon />}
        >
          Previous
        </Button>

        <Text color={textColor} fontWeight="medium" minW="120px" textAlign="center">
          Page {currentPage} of {totalPages}
        </Text>

        <Button
          onClick={handleNext}
          isDisabled={!hasNextPage || isLoading}
          size="sm"
          variant="outline"
          rightIcon={<ChevronRightIcon />}
        >
          Next
        </Button>

        <Button
          onClick={handleLast}
          isDisabled={!hasNextPage || isLoading}
          size="sm"
          variant="outline"
        >
          Last
        </Button>
      </HStack>
    </Box>
  )
}