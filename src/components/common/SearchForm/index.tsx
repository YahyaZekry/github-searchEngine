import React from 'react'
import {
  FormControl,
  Input,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface SearchFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
  placeholder?: string
}

export const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Search GitHub users...',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const inputBg = useColorModeValue('white', 'gray.800')
  const inputBorder = useColorModeValue('gray.300', 'gray.600')

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <FormControl>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          bg={inputBg}
          borderColor={inputBorder}
          _focus={{
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px blue.500',
          }}
          pr="4.5rem"
          size="lg"
          isDisabled={isLoading}
        />
        <Button
          type="submit"
          position="absolute"
          right="0.5rem"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          isLoading={isLoading}
          colorScheme="blue"
          size="md"
          px={4}
        >
          <SearchIcon />
        </Button>
      </FormControl>
    </Box>
  )
}