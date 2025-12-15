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
  Flex,
  Icon,
  Tooltip,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { GitHubUser } from '@/utils/types'
import { formatNumber, formatDate } from '@/utils/helpers'
import GitHubApiService from '@/services/githubApi'
import { TimeIcon, CalendarIcon } from '@chakra-ui/icons'

interface UserCardProps {
  user: GitHubUser
  index: number
}

export const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  const [detailedUser, setDetailedUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const cardBg = useColorModeValue('white', 'neutral.800')
  const textColor = useColorModeValue('neutral.800', 'neutral.200')
  const borderColor = useColorModeValue('neutral.200', 'neutral.700')
  const mutedTextColor = useColorModeValue('neutral.600', 'neutral.400')
  const accentColor = useColorModeValue('brand.500', 'brand.400')
  const gradientBg = useColorModeValue('linear-gradient(135deg, brand.50, accent.50)', 'linear-gradient(135deg, neutral.800, neutral.700)')

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

    if (isInView) {
      fetchUserDetails()
    }
  }, [user, isInView])

  // Use detailed user info if available, otherwise fall back to basic user info
  const displayUser = detailedUser || user

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ height: '100%' }}
    >
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="sm"
        as={Link}
        href={displayUser.html_url}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{
          textDecoration: 'none',
          boxShadow: 'xl',
          borderColor: accentColor,
        }}
        transition="all 0.3s ease-in-out"
        height="100%"
        minHeight="420px"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {/* Gradient overlay on hover */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="120px"
          bg={gradientBg}
          opacity={isHovered ? 0.1 : 0}
          transition="opacity 0.3s ease-in-out"
          zIndex={0}
        />

        <CardHeader pb={4} position="relative" zIndex={1}>
          <VStack spacing={4}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Box position="relative">
                <Image
                  src={displayUser.avatar_url}
                  alt={`${displayUser.login} avatar`}
                  boxSize="90px"
                  borderRadius="full"
                  border="4px solid"
                  borderColor={borderColor}
                  objectFit="cover"
                  boxShadow="md"
                />
                {displayUser.site_admin && (
                  <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    bg="accent.500"
                    borderRadius="full"
                    p={1}
                    boxSize="6"
                  >
                    <Text fontSize="xs" color="white" fontWeight="bold">
                      STAFF
                    </Text>
                  </Box>
                )}
              </Box>
            </motion.div>
            
            <VStack spacing={2} textAlign="center" flex={1}>
              <Heading
                size="md"
                color={textColor}
                fontWeight="600"
                noOfLines={1}
                letterSpacing="-0.01em"
              >
                {displayUser.name || displayUser.login}
              </Heading>
              <Text
                fontSize="sm"
                color={accentColor}
                fontWeight="500"
                display="flex"
                alignItems="center"
                gap={1}
              >
                @{displayUser.login}
              </Text>
            </VStack>
          </VStack>
        </CardHeader>

        <Divider borderColor={borderColor} opacity={0.6} />

        <CardBody pt={4} flex={1} display="flex" flexDirection="column" position="relative" zIndex={1}>
          <VStack align="start" spacing={4} flex={1} height="100%">
            {/* About Me Section */}
            <Box width="100%">
              {displayUser.bio ? (
                <VStack align="start" spacing={2}>
                  <Text fontSize="xs" fontWeight="600" color={mutedTextColor} letterSpacing="0.05em">
                    BIO
                  </Text>
                  <Text
                    noOfLines={2}
                    color={textColor}
                    fontSize="sm"
                    lineHeight="1.5"
                    minHeight="2.5rem"
                  >
                    {displayUser.bio}
                  </Text>
                </VStack>
              ) : (
                <VStack align="start" spacing={2}>
                  <Text fontSize="xs" fontWeight="600" color={mutedTextColor} letterSpacing="0.05em">
                    BIO
                  </Text>
                  <Box minHeight="2.5rem" display="flex" alignItems="center">
                    <Text fontSize="sm" color={mutedTextColor} fontStyle="italic">
                      No bio available
                    </Text>
                  </Box>
                </VStack>
              )}
            </Box>

            {/* Additional Info */}
            <VStack align="start" spacing={2} width="100%">
              {displayUser.location && (
                <HStack spacing={2}>
                  <Icon as={TimeIcon} color={mutedTextColor} boxSize={4} />
                  <Text fontSize="sm" color={textColor}>
                    {displayUser.location}
                  </Text>
                </HStack>
              )}
              
              
              {displayUser.blog && (
                <HStack spacing={2}>
                  <Icon as={TimeIcon} color={mutedTextColor} boxSize={4} />
                  <Text
                    fontSize="sm"
                    color={accentColor}
                    noOfLines={1}
                    isTruncated
                  >
                    {displayUser.blog}
                  </Text>
                </HStack>
              )}
            </VStack>

            {/* Spacer to push stats and date to bottom */}
            <Box flex={1} />

            {/* Stats Section */}
            <Box width="100%">
              {loading ? (
                <Flex justify="center" width="100%" py={3}>
                  <VStack spacing={2}>
                    <Spinner size="sm" color={accentColor} />
                    <Text fontSize="sm" color={mutedTextColor}>Loading stats...</Text>
                  </VStack>
                </Flex>
              ) : (
                <VStack spacing={3} width="100%">
                  <HStack justify="space-between" width="100%">
                    <Tooltip label="Public repositories">
                      <Badge
                        bg="brand.50"
                        color="brand.700"
                        px={3}
                        py={1.5}
                        borderRadius="lg"
                        fontSize="xs"
                        fontWeight="600"
                        display="flex"
                        alignItems="center"
                        gap={1}
                        minW="80px"
                        justifyContent="center"
                      >
                        {formatNumber(displayUser.public_repos)}
                        <Text as="span" opacity={0.7}>repos</Text>
                      </Badge>
                    </Tooltip>
                    
                    <Tooltip label="Followers">
                      <Badge
                        bg="accent.50"
                        color="accent.700"
                        px={3}
                        py={1.5}
                        borderRadius="lg"
                        fontSize="xs"
                        fontWeight="600"
                        display="flex"
                        alignItems="center"
                        gap={1}
                        minW="80px"
                        justifyContent="center"
                      >
                        {formatNumber(displayUser.followers)}
                        <Text as="span" opacity={0.7}>followers</Text>
                      </Badge>
                    </Tooltip>
                    
                    <Tooltip label="Following">
                      <Badge
                        bg="success.50"
                        color="success.700"
                        px={3}
                        py={1.5}
                        borderRadius="lg"
                        fontSize="xs"
                        fontWeight="600"
                        display="flex"
                        alignItems="center"
                        gap={1}
                        minW="80px"
                        justifyContent="center"
                      >
                        {formatNumber(displayUser.following)}
                        <Text as="span" opacity={0.7}>following</Text>
                      </Badge>
                    </Tooltip>
                  </HStack>
                </VStack>
              )}
            </Box>

            {/* Join Date */}
            <Box width="100%" pt={2}>
              <HStack spacing={2}>
                <Icon as={CalendarIcon} color={mutedTextColor} boxSize={3} />
                <Text fontSize="xs" color={mutedTextColor} fontWeight="500">
                  Joined {formatDate(displayUser.created_at)}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </motion.div>
  )
}