import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  Badge,
  Link,
  useColorModeValue,
  Spinner,
  Divider,
  Box,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { GitHubUser } from '@/utils/types'
import { formatNumber, formatDate } from '@/utils/helpers'
import GitHubApiService from '@/services/githubApi'

interface UserCardProps {
  user: GitHubUser
  index: number
}

export const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  const [detailedUser, setDetailedUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(false)
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400')

  // Fetch detailed user information when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      // Only fetch if we don't have the detailed information already
      if (user.followers === 0 && user.following === 0 && user.public_repos === 0) {
        setLoading(true)
        try {
          const apiService = new GitHubApiService()
          const userDetails = await apiService.getUserDetails(user.login)
          setDetailedUser(userDetails)
        } catch (error) {
          console.error('Failed to fetch user details:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setDetailedUser(user)
      }
    }

    fetchUserDetails()
  }, [user])

  // Use detailed user info if available, otherwise fall back to basic user info
  const displayUser = detailedUser || user

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        as={Link}
        href={displayUser.html_url}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{
          textDecoration: 'none',
          boxShadow: 'lg',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.2s ease-in-out"
        height="100%"
        minHeight="380px"
        display="flex"
        flexDirection="column"
      >
        <CardHeader pb={3}>
          <HStack spacing={4}>
            <Image
              src={displayUser.avatar_url}
              alt={`${displayUser.login} avatar`}
              boxSize="70px"
              borderRadius="full"
              border="3px solid"
              borderColor={borderColor}
              objectFit="cover"
            />
            <VStack align="start" spacing={1} flex={1}>
              <Heading size="md" color={textColor} fontWeight="600">
                {displayUser.name || displayUser.login}
              </Heading>
              <Text fontSize="sm" color="gray.500" fontWeight="500">
                @{displayUser.login}
              </Text>
            </VStack>
          </HStack>
        </CardHeader>

        <Divider borderColor={borderColor} />

        <CardBody pt={4} flex={1} display="flex" flexDirection="column">
          <VStack align="start" spacing={3} flex={1} height="100%">
            {/* About Me Section */}
            <Box width="100%" flex={1}>
              {displayUser.bio ? (
                <>
                  <Text fontSize="xs" fontWeight="600" color={mutedTextColor} mb={1}>
                    ABOUT ME
                  </Text>
                  <Text noOfLines={2} color={textColor} fontSize="sm" lineHeight="1.5" minHeight="2.5rem">
                    {displayUser.bio}
                  </Text>
                </>
              ) : (
                <Box minHeight="3.5rem">
                  <Text fontSize="xs" color={mutedTextColor} fontStyle="italic">
                    No bio available
                  </Text>
                </Box>
              )}
            </Box>

            {/* Location */}
            {displayUser.location && (
              <HStack>
                <Text fontSize="sm" color={mutedTextColor}>
                  📍 {displayUser.location}
                </Text>
              </HStack>
            )}

            {/* Spacer to push stats and date to bottom */}
            <Box flex={1} />

            {/* Stats Section */}
            <Box width="100%">
              {loading ? (
                <HStack justify="center" width="100%" py={2}>
                  <Spinner size="sm" color="blue.500" />
                  <Text fontSize="sm" color={mutedTextColor}>Loading stats...</Text>
                </HStack>
              ) : (
                <VStack spacing={2} width="100%" align="center">
                  {/* Top badge - repos */}
                  <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="md" fontSize="xs" minW="90px" textAlign="center">
                    {formatNumber(displayUser.public_repos)} repos
                  </Badge>
                  {/* Bottom badges - followers and following side by side */}
                  <HStack spacing={2}>
                    <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="md" fontSize="xs" minW="90px" textAlign="center">
                      {formatNumber(displayUser.followers)} followers
                    </Badge>
                    <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="md" fontSize="xs" minW="90px" textAlign="center">
                      {formatNumber(displayUser.following)} following
                    </Badge>
                  </HStack>
                </VStack>
              )}
            </Box>

            {/* Join Date */}
            <Box width="100%">
              <Text fontSize="xs" color={mutedTextColor}>
                Joined {formatDate(displayUser.created_at)}
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </motion.div>
  )
}