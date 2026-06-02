# GitHub Users Search

A modern GitHub users search application with a clean, responsive interface, built with React, TypeScript, and Vite.

## Features

- **GitHub User Search**: Search for GitHub users by username with real-time results
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes with smooth transitions
- **Pagination**: Navigate through search results with intuitive pagination controls
- **Error Handling**: Graceful error handling with user-friendly error messages
- **Loading States**: Beautiful loading animations while fetching data
- **Modern UI**: Built with Chakra UI for a polished, accessible interface
- **Smooth Animations**: Delightful micro-interactions using Framer Motion

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Chakra UI** - Component library for modern UI design
- **Framer Motion** - Animation library for smooth transitions
- **Axios** - HTTP client for API requests
- **Vitest** - Testing framework
- **ESLint** - Code linting and formatting

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yahyazekry/github-users.git
cd github-users
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Search for Users**: Type a GitHub username in the search box
2. **Browse Results**: View user profiles with avatar, username, and profile link
3. **Navigate Pages**: Use pagination controls to explore more results
4. **Toggle Theme**: Switch between light and dark modes using the theme toggle

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── SearchForm/  # Search input component
│   │   ├── UserCard/    # User profile card
│   │   ├── UserList/    # List of users
│   │   └── PageNavigation/ # Pagination controls
│   ├── layout/          # Layout components
│   │   └── Layout/      # Main app layout
│   └── ui/              # UI components
│       ├── ErrorMessage/ # Error display
│       ├── LoadingSpinner/ # Loading animation
│       └── ThemeToggle/  # Theme switcher
├── hooks/               # Custom React hooks
│   ├── useGitHubSearch.ts # GitHub API logic
│   ├── useDebounce.ts   # Debounce hook
│   └── useTheme.ts      # Theme management
├── services/            # API services
│   ├── githubApi.ts     # GitHub API client
│   └── api.ts           # API configuration
├── styles/              # Styling
│   └── theme/           # Chakra UI theme
└── utils/               # Utility functions
    ├── constants.ts      # App constants
    ├── helpers.ts       # Helper functions
    └── types.ts         # TypeScript types
```

## Technologies Used

- **React 19**: Modern React with the latest features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Chakra UI**: Component library for responsive design
- **Framer Motion**: Animation library for smooth interactions
- **Axios**: HTTP client for API requests

## 🌐 Deployment

The application is deployed at: https://yahyazekry.github.io/github-searchEngine

To deploy to GitHub Pages:

```bash
npm run build
npm run deploy
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## Acknowledgments

- GitHub for the amazing API
- Chakra UI for the excellent component library
- Framer Motion for the smooth animations