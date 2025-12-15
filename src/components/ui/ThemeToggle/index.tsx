import React from 'react'
import {
  Button,
  useColorModeValue,
  useColorMode,
  Tooltip,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface ThemeToggleProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'md' }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  
  const iconColor = useColorModeValue('gray.600', 'gray.300')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Tooltip
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      placement="bottom"
    >
      <Button
        onClick={toggleColorMode}
        variant="ghost"
        size={size}
        _hover={{ bg: hoverBg }}
        aria-label="Toggle color mode"
      >
        {isDark ? (
          <SunIcon color={iconColor} boxSize={5} />
        ) : (
          <MoonIcon color={iconColor} boxSize={5} />
        )}
      </Button>
    </Tooltip>
  )
}