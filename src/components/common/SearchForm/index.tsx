import React, { useState, useEffect } from 'react'
import {
  FormControl,
  Input,
  Button,
  Box,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Text,
  HStack,
  Fade,
  ScaleFade,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
  placeholder?: string
  error?: string | null
}

export const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Search GitHub users...',
  error = null,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [validationMessage, setValidationMessage] = useState('')

  // Validate input
  useEffect(() => {
    if (!value) {
      setIsValid(true)
      setValidationMessage('')
      return
    }

    // Check for invalid characters
    const invalidChars = /[<>\"'&]/
    if (invalidChars.test(value)) {
      setIsValid(false)
      setValidationMessage('Search contains invalid characters')
      return
    }

    // Check minimum length
    if (value.length < 2) {
      setIsValid(false)
      setValidationMessage('Search must be at least 2 characters')
      return
    }

    // Check maximum length
    if (value.length > 39) {
      setIsValid(false)
      setValidationMessage('GitHub usernames cannot exceed 39 characters')
      return
    }

    setIsValid(true)
    setValidationMessage('')
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && isValid) {
      setHasSearched(true)
      onSubmit()
    }
  }

  const handleClear = () => {
    onChange('')
    setHasSearched(false)
    setIsValid(true)
    setValidationMessage('')
  }

  const inputBg = useColorModeValue('white', 'neutral.800')
  const inputBorder = useColorModeValue('neutral.300', 'neutral.600')
  const errorBorder = useColorModeValue('error.500', 'error.400')
  const focusBorderColor = useColorModeValue('brand.500', 'brand.400')
  const placeholderColor = useColorModeValue('neutral.500', 'neutral.400')
  const iconColor = useColorModeValue('neutral.400', 'neutral.500')
  const errorColor = useColorModeValue('error.600', 'error.400')

  const shouldShowError = !isValid || error

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" position="relative">
      <FormControl isInvalid={shouldShowError}>
        <motion.div
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.02 }}
          animate={{
            borderColor: shouldShowError ? errorBorder : inputBorder,
            boxShadow: shouldShowError ? `0 0 0 3px rgba(239, 68, 68, 0.15)` : 'none'
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <InputGroup>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              bg={inputBg}
              borderColor={shouldShowError ? errorBorder : inputBorder}
              borderRadius="xl"
              borderWidth="2px"
              _focus={{
                borderColor: shouldShowError ? errorBorder : focusBorderColor,
                boxShadow: shouldShowError
                  ? `0 0 0 3px rgba(239, 68, 68, 0.15)`
                  : `0 0 0 3px rgba(66, 153, 225, 0.15)`,
              }}
              _hover={{
                borderColor: shouldShowError ? errorBorder : focusBorderColor,
              }}
              pr="4.5rem"
              size="lg"
              fontSize="md"
              fontWeight="500"
              isDisabled={isLoading}
              _placeholder={{
                color: placeholderColor,
              }}
              transition="all 0.2s ease-in-out"
            />
            <InputRightElement width="auto" pr={2}>
              <HStack spacing={1}>
                {value && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={handleClear}
                      borderRadius="md"
                      minW="auto"
                      h="auto"
                      p={1}
                      color={iconColor}
                      _hover={{
                        bg: 'neutral.100',
                        color: 'neutral.600',
                      }}
                    >
                      <CloseIcon boxSize={3} />
                    </Button>
                  </motion.div>
                )}
                <Button
                  type="submit"
                  isLoading={isLoading}
                  colorScheme={shouldShowError ? "error" : "brand"}
                  size="md"
                  px={4}
                  borderRadius="md"
                  isDisabled={!value.trim() || !isValid || isLoading}
                  leftIcon={shouldShowError ? <WarningIcon /> : <SearchIcon />}
                  variant={value.trim() && !isLoading && isValid ? "solid" : "ghost"}
                  transition="all 0.2s ease-in-out"
                  _hover={{
                    transform: 'translateY(-1px)',
                    boxShadow: 'md',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                />
              </HStack>
            </InputRightElement>
          </InputGroup>
        </motion.div>

        {/* Validation error message */}
        <AnimatePresence>
          {shouldShowError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <FormErrorMessage mt={2}>
                {error || validationMessage}
              </FormErrorMessage>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search suggestions/help text */}
        <AnimatePresence>
          {isFocused && !value && !error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Box mt={2} pl={4}>
                <FormHelperText color={placeholderColor}>
                  Try searching for usernames like "facebook", "microsoft", or "google"
                </FormHelperText>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent searches indicator */}
        <AnimatePresence>
          {hasSearched && !value && !error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Box mt={2} pl={4}>
                <FormHelperText color={placeholderColor}>
                  Press Enter to search again or type a new username
                </FormHelperText>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character count indicator */}
        <AnimatePresence>
          {value && value.length > 30 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Box mt={2} pl={4}>
                <Text
                  fontSize="xs"
                  color={value.length > 39 ? errorColor : placeholderColor}
                  fontWeight={value.length > 39 ? "600" : "normal"}
                >
                  {value.length}/39 characters
                </Text>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </FormControl>
    </Box>
  )
}