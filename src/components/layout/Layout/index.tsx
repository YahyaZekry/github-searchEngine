import React from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue('github.bgPrimary', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" bg={bg}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center" py={4}>
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.600)"
              bgClip="text"
              fontWeight="bold"
            >
              GitHub Users Search
            </Heading>
            <ThemeToggle />
          </Flex>

          <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="sm"
          >
            {children}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}