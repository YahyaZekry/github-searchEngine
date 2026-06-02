import { extendTheme } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/react'

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  colors: {
    // Modern neutral palette with better dark mode colors
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a', // Modern dark slate instead of pure black
      950: '#020617', // Even darker for high contrast elements
    },
    // Enhanced brand colors with better dark mode variants
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    // Modern accent colors with better contrast
    accent: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    // Success colors optimized for both modes
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    // Warning colors with better visibility
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    // Error colors with proper contrast
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    // New dark mode specific colors
    dark: {
      bg: {
        primary: '#0f172a', // Main background
        secondary: '#1e293b', // Cards, panels
        tertiary: '#334155', // Hover states, elevated elements
        overlay: 'rgba(15, 23, 42, 0.8)', // Modal overlays
      },
      text: {
        primary: '#f8fafc', // Main text
        secondary: '#cbd5e1', // Secondary text
        tertiary: '#94a3b8', // Muted text
        inverse: '#0f172a', // Text on colored backgrounds
      },
      border: {
        primary: '#334155', // Main borders
        secondary: '#475569', // Secondary borders
        accent: '#64748b', // Accent borders
      },
      shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        dark: '0 8px 32px rgba(0, 0, 0, 0.4)',
        glow: '0 0 20px rgba(59, 130, 246, 0.15)',
      },
    },
  },
  gradients: {
    subtle: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    brand: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    darkGlass: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
    // New modern gradients for dark mode
    darkSubtle: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    darkCard: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    darkAccent: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
    darkSurface: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.3) 100%)',
    mesh: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #fda085 100%)',
    aurora: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #00d2ff 100%)',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'dark.bg.primary' : 'neutral.50',
        color: props.colorMode === 'dark' ? 'dark.text.primary' : 'neutral.900',
        transition: 'all 0.3s ease-in-out',
      },
      '*': {
        transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      },
      // Custom scrollbar for dark mode
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'dark.bg.secondary' : 'neutral.100',
      },
      '::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'dark.border.accent' : 'neutral.300',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        bg: props.colorMode === 'dark' ? 'dark.text.tertiary' : 'neutral.400',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: 'lg',
        transition: 'all 0.2s ease-in-out',
        _focus: {
          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
        },
        _active: {
          transform: 'translateY(1px)',
        },
      },
      variants: {
        gradient: {
          bg: 'gradients.brand',
          color: 'white',
          _hover: {
            bg: 'gradients.brand',
            transform: 'translateY(-2px)',
            boxShadow: 'dark.lg',
          },
          _dark: {
            bg: 'gradients.darkAccent',
            boxShadow: 'dark.glow',
          },
        },
        glass: {
          bg: 'gradients.glass',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
          },
          _dark: {
            bg: 'gradients.darkGlass',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          },
        },
        dark: {
          bg: 'dark.bg.secondary',
          color: 'dark.text.primary',
          border: '1px solid',
          borderColor: 'dark.border.primary',
          _hover: {
            bg: 'dark.bg.tertiary',
            borderColor: 'dark.border.accent',
            transform: 'translateY(-1px)',
            boxShadow: 'dark.md',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: '2xl',
          boxShadow: 'sm',
          transition: 'all 0.3s ease-in-out',
          _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-4px)',
          },
          overflow: 'hidden',
        },
        _dark: {
          bg: 'dark.bg.secondary',
          borderColor: 'dark.border.primary',
          boxShadow: 'dark.sm',
          _hover: {
            boxShadow: 'dark.lg',
            borderColor: 'dark.border.accent',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'lg',
          transition: 'all 0.2s ease-in-out',
          _focus: {
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
          },
        },
        _dark: {
          field: {
            bg: 'dark.bg.secondary',
            borderColor: 'dark.border.primary',
            color: 'dark.text.primary',
            _placeholder: {
              color: 'dark.text.tertiary',
            },
            _focus: {
              borderColor: 'brand.400',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
            },
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
        letterSpacing: '-0.02em',
        _dark: {
          color: 'dark.text.primary',
        },
      },
    },
    // Enhanced component styles for dark mode
    Modal: {
      baseStyle: {
        overlay: {
          bg: 'dark.bg.overlay',
          backdropFilter: 'blur(4px)',
        },
        dialog: {
          bg: 'dark.bg.secondary',
          borderRadius: '2xl',
          border: '1px solid',
          borderColor: 'dark.border.primary',
          boxShadow: 'dark.2xl',
        },
      },
    },
    Popover: {
      baseStyle: {
        content: {
          bg: 'dark.bg.secondary',
          border: '1px solid',
          borderColor: 'dark.border.primary',
          boxShadow: 'dark.lg',
        },
        arrow: {
          bg: 'dark.bg.secondary',
          borderColor: 'dark.border.primary',
        },
      },
    },
    Tooltip: {
      baseStyle: {
        bg: 'dark.bg.tertiary',
        color: 'dark.text.primary',
        borderRadius: 'md',
        border: '1px solid',
        borderColor: 'dark.border.primary',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme