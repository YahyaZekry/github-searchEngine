import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const GitHubSearchIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 256 257" {...props}>
      <defs>
        <linearGradient id="github-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#24292e', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#40474e', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="search-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#0366d6', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#2188ff', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* GitHub Octocat silhouette */}
      <path 
        fill="url(#github-gradient)" 
        d="M128.0 0.0 C57.3 0.0 0.0 57.3 0.0 128.0 C0.0 184.4 36.2 232.2 86.8 250.2 C93.2 251.4 95.6 247.3 95.6 243.8 C95.6 240.6 95.5 232.4 95.4 223.7 C60.1 231.2 52.5 207.6 52.5 207.6 C46.6 191.8 38.1 187.8 38.1 187.8 C26.2 180.0 38.9 180.2 38.9 180.2 C52.0 181.1 58.8 193.7 58.8 193.7 C70.4 213.4 89.1 207.7 95.8 204.7 C97.0 197.9 100.0 193.2 103.3 190.3 C75.2 187.4 45.7 176.4 45.7 125.6 C45.7 111.1 50.6 99.2 58.7 89.8 C57.4 86.9 53.1 73.3 60.0 55.0 C60.0 55.0 71.2 51.5 95.3 68.7 C106.1 66.1 117.5 64.8 128.0 64.8 C138.5 64.8 149.9 66.1 160.7 68.7 C184.8 51.5 196.0 55.0 196.0 55.0 C202.9 73.3 198.6 86.9 197.3 89.8 C205.4 99.2 210.3 111.1 210.3 125.6 C210.3 176.5 180.7 187.3 152.5 190.2 C156.6 193.8 160.2 200.9 160.2 211.8 C160.2 227.3 160.1 239.9 160.1 243.8 C160.1 247.3 162.5 251.5 169.0 250.2 C219.8 232.1 256.0 184.3 256.0 128.0 C256.0 57.3 198.7 0.0 128.0 0.0 Z"
      />
      
      {/* Magnifying glass overlay */}
      <circle 
        cx="180" 
        cy="180" 
        r="40" 
        fill="none" 
        stroke="url(#search-gradient)" 
        strokeWidth="8"
      />
      <line 
        x1="210" 
        y1="210" 
        x2="240" 
        y2="240" 
        stroke="url(#search-gradient)" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
    </Icon>
  )
}