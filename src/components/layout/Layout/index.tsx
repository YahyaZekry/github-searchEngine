import React from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Flex,
  HStack,
  Text,
  Hide,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GitHubSearchIcon } from '@/components/ui/GitHubSearchIcon'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue('neutral.50', 'dark.bg.primary')
  const headerBg = useColorModeValue('white', 'dark.bg.secondary')
  const borderColor = useColorModeValue('neutral.200', 'dark.border.primary')
  const subtitleColor = useColorModeValue('neutral.600', 'dark.text.secondary')
  const gradientDecoration = useColorModeValue('linear(to-b, brand.50, transparent)', 'linear(to-b, dark.bg.primary, transparent)')
  const gradientOpacity = useColorModeValue(0.5, 0.3)
  const titleGradient = useColorModeValue('linear(to-r, brand.500, accent.500)', 'linear(to-r, brand.400, accent.400)')
  const contentBg = useColorModeValue('white', 'dark.bg.secondary')
  const contentShadow = useColorModeValue('md', 'dark.lg')
  const bgPattern = useColorModeValue(
    'radial-gradient(circle at 1px 1px, neutral.200 1px, transparent 1px)',
    'radial-gradient(circle at 1px 1px, dark.border.primary 1px, transparent 1px)'
  )
  const bgPatternOpacity = useColorModeValue(0.3, 0.1)

  return (
    <Box minH="100vh" bg={bg} position="relative" overflow="hidden">
      {/* Background gradient decoration */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="400px"
        bgGradient={gradientDecoration}
        opacity={gradientOpacity}
        zIndex={0}
      />
      
      <Container
        maxW={{
          base: "100%",
          sm: "container.sm",
          md: "container.md",
          lg: "container.lg",
          xl: "container.xl"
        }}
        py={{ base: 4, sm: 6, md: 8 }}
        px={{ base: 4, sm: 6, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <VStack spacing={{ base: 6, sm: 8, md: 10 }} align="stretch">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Flex
              justify="space-between"
              align="center"
              py={{ base: 4, sm: 5, md: 6 }}
              bg={headerBg}
              borderRadius={{ base: "xl", sm: "2xl" }}
              px={{ base: 4, sm: 6, md: 8 }}
              boxShadow="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor={borderColor}
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 4, sm: 0 }}
            >
              <HStack spacing={{ base: 3, sm: 4 }} align="center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <GitHubSearchIcon
                    w={{ base: 8, sm: 9, md: 10 }}
                    h={{ base: 8, sm: 9, md: 10 }}
                    color="brand.500"
                  />
                </motion.div>
                <VStack align="start" spacing={1} flex={1}>
                  <Heading
                    size={{ base: "md", sm: "lg", md: "lg" }}
                    bgGradient={titleGradient}
                    bgClip="text"
                    fontWeight="700"
                    letterSpacing="-0.02em"
                    textAlign={{ base: "center", sm: "left" }}
                  >
                    GitHub Users Search
                  </Heading>
                  <Hide below="sm">
                    <Text
                      fontSize="sm"
                      color={subtitleColor}
                      fontWeight="500"
                    >
                      Discover and explore GitHub profiles
                    </Text>
                  </Hide>
                </VStack>
              </HStack>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThemeToggle />
              </motion.div>
            </Flex>
          </motion.div>

          {/* Main content area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            style={{ width: '100%' }}
          >
            <Box
              borderRadius={{ base: "xl", sm: "2xl" }}
              p={{ base: 4, sm: 6, md: 8 }}
              bg={contentBg}
              boxShadow={contentShadow}
              border="1px solid"
              borderColor={borderColor}
              backdropFilter="blur(10px)"
              position="relative"
              overflow="hidden"
              width="100%"
            >
              {/* Subtle background pattern */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bgImage={bgPattern}
                bgSize="20px 20px"
                opacity={bgPatternOpacity}
                pointerEvents="none"
              />
              
              {/* Content */}
              <Box position="relative" zIndex={1} width="100%">
                {children}
              </Box>
            </Box>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Flex
              justify="center"
              py={{ base: 3, md: 4 }}
              color={subtitleColor}
              fontSize={{ base: "xs", sm: "sm" }}
              direction={{ base: "column", sm: "row" }}
              gap={2}
              textAlign="center"
            >
              <Text>
                Built with ❤️ using React, Chakra UI & Framer Motion 🐻🧉
              </Text>
            </Flex>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  )
}