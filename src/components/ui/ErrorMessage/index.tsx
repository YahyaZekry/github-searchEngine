import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack,
} from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  title?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  title = 'Error',
}) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={6}
      borderRadius="md"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <VStack spacing={3} align="center">
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm" fontSize="md">
          {message}
        </AlertDescription>
        {onRetry && (
          <Button
            onClick={onRetry}
            colorScheme="red"
            size="sm"
            leftIcon={<RepeatIcon />}
            mt={2}
          >
            Try Again
          </Button>
        )}
      </VStack>
    </Alert>
  )
}