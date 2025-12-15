import React from 'react'
import {
  Spinner,
  Box,
  Text,
  VStack,
  HStack,
  Circle,
  useColorModeValue,
  Flex,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface LoadingSpinnerProps {
  message?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'github'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'md',
  variant = 'default',
}) => {
  const textColor = useColorModeValue('neutral.700', 'neutral.300')
  const mutedTextColor = useColorModeValue('neutral.500', 'neutral.400')
  const accentColor = useColorModeValue('brand.500', 'brand.400')
  const dotColor = useColorModeValue('brand.300', 'brand.600')

  const sizeMap = {
    xs: { spinner: 'xs', box: 8, dots: 2 },
    sm: { spinner: 'sm', box: 10, dots: 3 },
    md: { spinner: 'md', box: 12, dots: 4 },
    lg: { spinner: 'lg', box: 16, dots: 5 },
    xl: { spinner: 'xl', box: 20, dots: 6 }
  }

  const currentSize = sizeMap[size]

  // Dots animation variant
  const DotsLoader = () => (
    <HStack spacing={2}>
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        >
          <Circle
            size={currentSize.dots}
            bg={dotColor}
            borderRadius="full"
          />
        </motion.div>
      ))}
    </HStack>
  )

  // Pulse animation variant
  const PulseLoader = () => (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Circle
        size={currentSize.box}
        bg={accentColor}
        opacity={0.2}
        borderRadius="full"
      />
      <Circle
        size={currentSize.box * 0.6}
        bg={accentColor}
        opacity={0.4}
        borderRadius="full"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
      <Circle
        size={currentSize.box * 0.3}
        bg={accentColor}
        borderRadius="full"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </motion.div>
  )

  // GitHub animation variant
  const GitHubLoader = () => (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Icon
        as={ExternalLinkIcon}
        boxSize={currentSize.box}
        color={accentColor}
      />
    </motion.div>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />
      case 'pulse':
        return <PulseLoader />
      case 'github':
        return <GitHubLoader />
      default:
        return <Spinner size={currentSize.spinner} thickness="3px" speed="0.8s" color={accentColor} />
    }
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      py={12}
      px={4}
    >
      <VStack spacing={6} align="center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {renderLoader()}
        </motion.div>
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VStack spacing={2} align="center">
              <Text
                color={textColor}
                fontSize="lg"
                fontWeight="500"
                textAlign="center"
              >
                {message}
              </Text>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Text
                  color={mutedTextColor}
                  fontSize="sm"
                  textAlign="center"
                >
                  Please wait while we fetch the data
                </Text>
              </motion.div>
            </VStack>
          </motion.div>
        )}
      </VStack>
    </Flex>
  )
}