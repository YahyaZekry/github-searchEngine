import React from 'react'
import {
  Button,
  useColorModeValue,
  useColorMode,
  Tooltip,
  HStack,
  Text,
  Circle,
  Box,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface ThemeToggleProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'switch' | 'compact'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  variant = 'default'
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  
  const iconColor = useColorModeValue('neutral.600', 'neutral.400')
  const hoverBg = useColorModeValue('neutral.100', 'neutral.700')
  const activeBg = useColorModeValue('brand.500', 'brand.400')
  const switchBg = useColorModeValue('neutral.300', 'neutral.600')
  const switchActiveBg = useColorModeValue('brand.500', 'brand.400')

  const sizeMap = {
    xs: { boxSize: 4, padding: 1, fontSize: 'xs' },
    sm: { boxSize: 5, padding: 2, fontSize: 'sm' },
    md: { boxSize: 6, padding: 3, fontSize: 'md' },
    lg: { boxSize: 8, padding: 4, fontSize: 'lg' }
  }

  const currentSize = sizeMap[size]

  // Default button variant
  if (variant === 'default') {
    return (
      <Tooltip
        label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        placement="bottom"
        hasArrow
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            size={size}
            bg={useColorModeValue('white', 'neutral.800')}
            border="1px solid"
            borderColor={useColorModeValue('neutral.200', 'neutral.700')}
            borderRadius="lg"
            _hover={{
              bg: hoverBg,
              transform: 'translateY(-1px)',
              boxShadow: 'sm'
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            aria-label="Toggle color mode"
            transition="all 0.2s ease-in-out"
          >
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {isDark ? (
                <SunIcon color={iconColor} boxSize={currentSize.boxSize} />
              ) : (
                <MoonIcon color={iconColor} boxSize={currentSize.boxSize} />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </Tooltip>
    )
  }

  // Switch variant
  if (variant === 'switch') {
    return (
      <Tooltip
        label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        placement="bottom"
        hasArrow
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            size={size}
            bg={switchBg}
            borderRadius="full"
            p={1}
            minW="60px"
            h="30px"
            position="relative"
            _hover={{ bg: hoverBg }}
            aria-label="Toggle color mode"
            transition="all 0.3s ease-in-out"
          >
            <motion.div
              style={{
                position: 'absolute',
                left: isDark ? 'auto' : '2px',
                right: isDark ? '2px' : 'auto',
              }}
              animate={{
                left: isDark ? 'auto' : '2px',
                right: isDark ? '2px' : 'auto',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Circle
                size="22px"
                bg={switchActiveBg}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="sm"
              >
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {isDark ? (
                    <MoonIcon color="white" boxSize={3} />
                  ) : (
                    <SunIcon color="white" boxSize={3} />
                  )}
                </motion.div>
              </Circle>
            </motion.div>
          </Button>
        </motion.div>
      </Tooltip>
    )
  }

  // Compact variant
  return (
    <Tooltip
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      placement="bottom"
      hasArrow
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          size={size}
          borderRadius="full"
          p={currentSize.padding}
          _hover={{ bg: hoverBg }}
          aria-label="Toggle color mode"
          transition="all 0.2s ease-in-out"
        >
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isDark ? (
              <SunIcon color={iconColor} boxSize={currentSize.boxSize} />
            ) : (
              <MoonIcon color={iconColor} boxSize={currentSize.boxSize} />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </Tooltip>
  )
}