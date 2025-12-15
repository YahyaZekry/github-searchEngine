import { extendTheme } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/react'

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    github: {
      bgPrimary: '#f6f8fa',
      bgSecondary: '#ffffff',
      textPrimary: '#24292e',
      textSecondary: '#586069',
      border: '#e1e4e8',
      accent: '#0366d6',
      success: '#28a745',
      warning: '#ffc107',
      error: '#d73a49',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'github.bgPrimary',
        color: props.colorMode === 'dark' ? 'white' : 'github.textPrimary',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'github.bgSecondary',
          borderColor: 'github.border',
          borderWidth: '1px',
          borderRadius: '6px',
          boxShadow: 'sm',
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'github.accent',
      },
    },
  },
})

export default theme