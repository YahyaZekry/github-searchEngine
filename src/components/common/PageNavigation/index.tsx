import React from 'react'
import {
  HStack,
  Button,
  Text,
  Box,
  useColorModeValue,
  VStack,
  Flex,
  Icon,
  Tooltip,
  Progress,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
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
  const textColor = useColorModeValue('neutral.800', 'neutral.200')
  const mutedTextColor = useColorModeValue('neutral.600', 'neutral.400')
  const buttonBg = useColorModeValue('white', 'neutral.800')
  const buttonBorder = useColorModeValue('neutral.300', 'neutral.600')
  const activeBg = useColorModeValue('brand.500', 'brand.400')
  const progressColor = useColorModeValue('brand.500', 'brand.400')

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

  const progressPercentage = (currentPage / totalPages) * 100

  if (totalPages <= 1) {
    return null
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  const NavButton = ({
    onClick,
    isDisabled,
    icon,
    label,
    children
  }: {
    onClick: () => void
    isDisabled: boolean
    icon: React.ReactNode
    label: string
    children?: React.ReactNode
  }) => (
    <Tooltip label={label} placement="top" hasArrow>
      <motion.div
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          onClick={onClick}
          isDisabled={isDisabled}
          bg={buttonBg}
          borderColor={buttonBorder}
          borderWidth="1px"
          borderRadius="lg"
          size="md"
          variant="outline"
          leftIcon={icon}
          isLoading={isLoading}
          transition="all 0.2s ease-in-out"
          _hover={{
            bg: activeBg,
            color: 'white',
            borderColor: activeBg,
            transform: 'translateY(-2px)',
            boxShadow: 'md',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          _disabled={{
            opacity: 0.5,
            cursor: 'not-allowed',
            _hover: {
              bg: buttonBg,
              color: textColor,
              borderColor: buttonBorder,
              transform: 'none',
              boxShadow: 'none',
            }
          }}
        >
          {children}
        </Button>
      </motion.div>
    </Tooltip>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <VStack spacing={6} align="stretch" width="100%">
        {/* Progress bar */}
        <Box px={4}>
          <VStack spacing={2} align="start">
            <HStack justify="space-between" width="100%">
              <Text fontSize="sm" color={mutedTextColor} fontWeight="500">
                Progress
              </Text>
              <Text fontSize="sm" color={textColor} fontWeight="600">
                {currentPage} of {totalPages} pages
              </Text>
            </HStack>
            <Progress
              value={progressPercentage}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
              bg={useColorModeValue('neutral.200', 'neutral.700')}
              transition="all 0.3s ease-in-out"
            />
          </VStack>
        </Box>

        {/* Navigation buttons */}
        <Flex justify="center" align="center" px={4}>
          <HStack spacing={3} flexWrap="wrap" justify="center">
            <NavButton
              onClick={handleFirst}
              isDisabled={!hasPreviousPage || isLoading}
              icon={<ChevronLeftIcon />}
              label="First page"
            >
              <Text display={{ base: 'none', sm: 'inline' }}>First</Text>
            </NavButton>

            <NavButton
              onClick={handlePrevious}
              isDisabled={!hasPreviousPage || isLoading}
              icon={<Icon as={ChevronLeftIcon} />}
              label="Previous page"
            >
              <Text display={{ base: 'none', sm: 'inline' }}>Previous</Text>
            </NavButton>

            {/* Current page indicator */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                bg={activeBg}
                color="white"
                px={6}
                py={3}
                borderRadius="lg"
                fontWeight="600"
                minW="120px"
                textAlign="center"
                boxShadow="md"
              >
                <Text fontSize="md">
                  Page {currentPage}
                </Text>
                <Text fontSize="xs" opacity={0.8}>
                  of {totalPages}
                </Text>
              </Box>
            </motion.div>

            <NavButton
              onClick={handleNext}
              isDisabled={!hasNextPage || isLoading}
              icon={<Icon as={ChevronRightIcon} />}
              label="Next page"
            >
              <Text display={{ base: 'none', sm: 'inline' }}>Next</Text>
            </NavButton>

            <NavButton
              onClick={handleLast}
              isDisabled={!hasNextPage || isLoading}
              icon={<ChevronRightIcon />}
              label="Last page"
            >
              <Text display={{ base: 'none', sm: 'inline' }}>Last</Text>
            </NavButton>
          </HStack>
        </Flex>

        {/* Quick jump to page */}
        <Flex justify="center" px={4}>
          <Text fontSize="xs" color={mutedTextColor} textAlign="center">
            Navigate through pages or use keyboard shortcuts ← →
          </Text>
        </Flex>
      </VStack>
    </motion.div>
  )
}