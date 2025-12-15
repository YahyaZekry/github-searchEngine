import React from 'react'
import { Spinner, Box, Text } from '@chakra-ui/react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'md',
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
    >
      <Spinner size={size} thickness="4px" speed="0.65s" emptyColor="gray.200" />
      {message && (
        <Text mt={4} color="gray.500" fontSize="sm">
          {message}
        </Text>
      )}
    </Box>
  )
}