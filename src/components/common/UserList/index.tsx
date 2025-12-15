import React, { useRef } from 'react'
import {
  VStack,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
  HStack,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GitHubUser } from '@/utils/types'
import { UserCard } from '@/components/common/UserCard'
import { SearchIcon, PersonIcon } from '@chakra-ui/icons'

interface UserListProps {
  users: GitHubUser[]
  loading?: boolean
  error?: string | null
}

export const UserList: React.FC<UserListProps> = ({
  users,
  loading = false,
  error = null,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -30,
      transition: {
        duration: 0.3
      }
    }
  }

  const textColor = useColorModeValue('neutral.800', 'neutral.200')
  const mutedTextColor = useColorModeValue('neutral.600', 'neutral.400')
  const emptyStateBg = useColorModeValue('neutral.50', 'neutral.800')

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="neutral.200"
        p={6}
        height="420px"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <VStack spacing={4} align="center">
          <Box
            boxSize="90px"
            borderRadius="full"
            bg="neutral.200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <VStack spacing={2} width="100%">
            <Box
              h="24px"
              bg="neutral.200"
              borderRadius="md"
              width="80%"
              mx="auto"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <Box
              h="16px"
              bg="neutral.200"
              borderRadius="md"
              width="60%"
              mx="auto"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </VStack>
        </VStack>
        <VStack spacing={3} align="start" flex={1} width="100%">
          <Box
            h="14px"
            bg="neutral.200"
            borderRadius="md"
            width="100%"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
          <Box
            h="14px"
            bg="neutral.200"
            borderRadius="md"
            width="80%"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          />
          <Box flex={1} />
          <HStack spacing={2} width="100%">
            <Box
              h="32px"
              bg="neutral.200"
              borderRadius="lg"
              flex={1}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }}
            />
            <Box
              h="32px"
              bg="neutral.200"
              borderRadius="lg"
              flex={1}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
            />
            <Box
              h="32px"
              bg="neutral.200"
              borderRadius="lg"
              flex={1}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1.4 }}
            />
          </HStack>
        </VStack>
      </Box>
    </motion.div>
  )

  if (loading && users.length === 0) {
    return (
      <Box ref={ref} py={8}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={6} align="center" mb={8}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Icon as={SearchIcon} boxSize={12} color="brand.500" />
            </motion.div>
            <Text fontSize="lg" color={textColor} fontWeight="500">
              Searching for amazing developers...
            </Text>
            <Text fontSize="sm" color={mutedTextColor}>
              This might take a moment
            </Text>
          </VStack>
          
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            spacing={6}
            align="stretch"
            autoRows="1fr"
          >
            {[...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </SimpleGrid>
        </motion.div>
      </Box>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          px={8}
          bg={emptyStateBg}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="neutral.200"
        >
          <VStack spacing={4} textAlign="center">
            <Icon as={UserIcon} boxSize={16} color="error.500" />
            <VStack spacing={2}>
              <Text fontSize="xl" color={textColor} fontWeight="600">
                Oops! Something went wrong
              </Text>
              <Text fontSize="md" color={mutedTextColor}>
                {error}
              </Text>
            </VStack>
          </VStack>
        </Flex>
      </motion.div>
    )
  }

  if (users.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          px={8}
          bg={emptyStateBg}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="neutral.200"
        >
          <VStack spacing={6} textAlign="center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon as={SearchIcon} boxSize={16} color="brand.500" />
            </motion.div>
            <VStack spacing={2}>
              <Text fontSize="xl" color={textColor} fontWeight="600">
                No users found
              </Text>
              <Text fontSize="md" color={mutedTextColor} maxW="400px">
                Try searching with different keywords, check your spelling, or browse popular usernames like "facebook", "microsoft", or "google"
              </Text>
            </VStack>
          </VStack>
        </Flex>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      style={{ width: '100%' }}
    >
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          '2xl': 5
        }}
        spacing={6}
        align="stretch"
        autoRows="1fr"
      >
        <AnimatePresence mode="popLayout">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              variants={itemVariants}
              layout
              exit="exit"
              style={{ height: '100%' }}
            >
              <UserCard user={user} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </SimpleGrid>
      
      {/* Loading more indicator */}
      {loading && users.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Flex justify="center" py={8}>
            <VStack spacing={3}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Icon as={SearchIcon} boxSize={8} color="brand.500" />
              </motion.div>
              <Text fontSize="sm" color={mutedTextColor}>
                Loading more users...
              </Text>
            </VStack>
          </Flex>
        </motion.div>
      )}
    </motion.div>
  )
}