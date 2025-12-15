import { useColorMode } from '@chakra-ui/react'

export const useAppTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return {
    isDark: colorMode === 'dark',
    toggleTheme: toggleColorMode,
    colorMode,
  }
}