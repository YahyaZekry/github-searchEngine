import React from 'react'
import {
  VStack,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubUser } from '@/utils/types'
import { UserCard } from '@/components/common/UserCard'

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
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const textColor = useColorModeValue('gray.700', 'gray.200')

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Text color={textColor}>Loading users...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="red.500">{error}</Text>
      </Box>
    )
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color={textColor}>No users found. Try a different search term.</Text>
      </Box>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        spacing={6}
        align="stretch"
        autoRows="1fr"
      >
        <AnimatePresence>
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <UserCard user={user} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </SimpleGrid>
    </motion.div>
  )
}