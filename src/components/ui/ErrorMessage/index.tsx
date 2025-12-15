import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  useColorModeValue,
  Icon,
  Flex,
  Container,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { WarningIcon, RepeatIcon } from '@chakra-ui/icons'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  title?: string
  variant?: 'default' | 'card' | 'inline'
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  title = 'Something went wrong',
  variant = 'default',
}) => {
  const errorBg = useColorModeValue('error.50', 'error.900')
  const errorBorder = useColorModeValue('error.200', 'error.700')
  const errorColor = useColorModeValue('error.700', 'error.200')
  const errorIconColor = useColorModeValue('error.500', 'error.400')
  const textColor = useColorModeValue('neutral.800', 'neutral.200')
  const mutedTextColor = useColorModeValue('neutral.600', 'neutral.400')

  // Card variant for full-page errors
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Container maxW="md" py={8}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            bg={errorBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={errorBorder}
            p={8}
            textAlign="center"
          >
            <VStack spacing={6}>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon
                  as={WarningIcon}
                  boxSize={16}
                  color={errorIconColor}
                />
              </motion.div>
              
              <VStack spacing={3}>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="600"
                >
                  {title}
                </Text>
                <Text
                  fontSize="md"
                  color={mutedTextColor}
                  lineHeight="1.6"
                >
                  {message}
                </Text>
              </VStack>

              {onRetry && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onRetry}
                    colorScheme="error"
                    size="lg"
                    leftIcon={<RepeatIcon />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}
            </VStack>
          </Flex>
        </Container>
      </motion.div>
    )
  }

  // Inline variant for smaller errors
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <HStack
          bg={errorBg}
          borderWidth="1px"
          borderColor={errorBorder}
          borderRadius="lg"
          p={3}
          spacing={3}
          align="center"
        >
          <Icon as={WarningIcon} color={errorIconColor} boxSize={5} />
          <Text color={errorColor} fontSize="sm" flex={1}>
            {message}
          </Text>
          {onRetry && (
            <Button
              size="sm"
              variant="ghost"
              color={errorColor}
              onClick={onRetry}
              _hover={{ bg: 'error.100' }}
            >
              <Icon as={RepeatIcon} boxSize={4} />
            </Button>
          )}
        </HStack>
      </motion.div>
    )
  }

  // Default alert variant
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={6}
        borderRadius="lg"
        bg={errorBg}
        borderWidth="1px"
        borderColor={errorBorder}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AlertIcon boxSize="40px" mr={0} color={errorIconColor} />
        </motion.div>
        <VStack spacing={3} align="center">
          <AlertTitle mt={4} mb={1} fontSize="lg" color={errorColor}>
            {title}
          </AlertTitle>
          <AlertDescription maxWidth="sm" fontSize="md" color={mutedTextColor}>
            {message}
          </AlertDescription>
          {onRetry && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onRetry}
                colorScheme="error"
                size="sm"
                leftIcon={<RepeatIcon />}
                mt={2}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
              >
                Try Again
              </Button>
            </motion.div>
          )}
        </VStack>
      </Alert>
    </motion.div>
  )
}