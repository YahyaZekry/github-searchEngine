import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "./components/SearchForm.jsx";
import UserList from "./components/UserList.jsx";
import PageNavigation from "./components/PageNavigation.jsx";
import "./App.css";

const API_URL = "https://api.github.com";

// Function to handle the search for GitHub users by username, limited to 5 items for testing purpose
async function handleSearch(username, page = 1) {
  try {
    // Use GitHub's search API with more fields to avoid N+1 problem
    const response = await fetch(
      `${API_URL}/search/users?q=${encodeURIComponent(username)}&per_page=5&page=${page}`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else if (response.status === 422) {
        throw new Error("Invalid search query. Please check your username.");
      } else if (response.status >= 500) {
        throw new Error("GitHub API is temporarily unavailable. Please try again later.");
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    }

    const json = await response.json();

    if (!json.items || json.items.length === 0) {
      return { users: [], totalCount: 0 };
    }

    // Fetch detailed information for each user in parallel with better error handling
    const detailedUserPromises = json.items.map(async (user) => {
      try {
        const userDetailsResponse = await fetch(`${API_URL}/users/${user.login}`);
        if (!userDetailsResponse.ok) {
          console.warn(`Failed to fetch details for user ${user.login}`);
          // Return basic info from search results if detailed fetch fails
          return {
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            name: null,
            bio: null,
            location: null,
            followers: 0,
            following: 0,
            public_repos: 0,
          };
        }
        const userDetails = await userDetailsResponse.json();
        return userDetails;
      } catch (error) {
        console.warn(`Error fetching details for user ${user.login}:`, error);
        // Return basic info if fetch fails
        return {
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          name: null,
          bio: null,
          location: null,
          followers: 0,
          following: 0,
          public_repos: 0,
        };
      }
    });

    // Wait for all user details requests to complete
    const detailedUsers = await Promise.all(detailedUserPromises);

    // Filter out null results and return
    const validUsers = detailedUsers.filter(user => user !== null);

    return {
      users: validUsers,
      totalCount: json.total_count || 0
    };
  } catch (e) {
    if (e.message.includes("fetch")) {
      throw new Error("Network error. Please check your internet connection.");
    }
    throw e;
  }
}

export default function App() {
  // State to store the username input by the user
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // State to store the search results
  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Ref for debouncing timer
  const debounceTimer = useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback((searchValue) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      setSearchTerm(searchValue);
    }, 500); // 500ms delay
  }, []);

  const onSearchSubmit = useCallback(async (pageNum = 1) => {
    const searchValue = searchTerm || username;
    if (!searchValue.trim()) {
      setError("Please enter a GitHub username to search.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const searchResult = await handleSearch(searchValue.trim(), pageNum);
      const { users, totalCount } = searchResult;

      setResults(users);
      setTotalResults(totalCount);
      setHasNextPage(pageNum * 5 < totalCount);

      if (users.length === 0) {
        setError("No users found. Please try a different username.");
      }
    } catch (e) {
      // Provide more specific error messages
      let errorMessage = "Failed to fetch users. Please try again.";
      
      if (e.message.includes("rate limit")) {
        errorMessage = "GitHub API rate limit exceeded. Please wait a moment and try again.";
      } else if (e.message.includes("network")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (e.message.includes("Invalid search")) {
        errorMessage = "Invalid search query. Please check your input and try again.";
      } else if (e.message.includes("temporarily unavailable")) {
        errorMessage = "GitHub is temporarily unavailable. Please try again later.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, username]);

  // Retry function for failed searches
  const retrySearch = useCallback(() => {
    setError("");
    onSearchSubmit(page);
  }, [page, onSearchSubmit]);

  function onSearchChange(e) {
    const value = e.target.value;
    setUsername(value);
    debouncedSearch(value);
  }

  // Trigger search when debounced term changes
  React.useEffect(() => {
    if (searchTerm.trim()) {
      setPage(1); // Reset to first page for new search
      onSearchSubmit(1);
    } else {
      setResults([]);
      setTotalResults(0);
      setError("");
    }
  }, [searchTerm, onSearchSubmit]); // Include onSearchSubmit dependency

  function onNextPage() {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      onSearchSubmit(newPage);
      return newPage;
    });
  }

  function onPrevPage() {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      onSearchSubmit(newPage);
      return newPage;
    });
  }
  // Animation variants (10% faster)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.45, // 10% faster (was 0.5)
        when: "beforeChildren",
        staggerChildren: 0.18 // 10% faster (was 0.2)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 } // 10% faster (was 0.5)
    }
  };

  // Render the main UI of the App
  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`} data-theme={darkMode ? "dark" : "light"}>
      {/* Animated background elements - Reduced for better performance */}
      <div className="background-animations">
        <motion.div
          className="floating-element floating-1"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="floating-element floating-2"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 7.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9
          }}
        />
        <motion.div
          className="floating-element floating-3"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />
      </div>

      <motion.div
        className="app"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      <motion.div className={`navbar ${darkMode ? 'dark' : ''}`} variants={itemVariants}>
        <div className="navbar-content">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Github User Search Engine
          </motion.h3>
          <motion.button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SearchForm
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          value={username}
        />
      </motion.div>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-container"
          >
            <div className="loading-spinner">
              <motion.div
                className="spinner-circle"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <motion.p
              className="loading-text"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="error-message"
          >
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <p className="error-text">{error}</p>
              <button
                onClick={retrySearch}
                className="retry-button"
                aria-label="Retry search"
              >
                🔄 Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {totalResults > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="results-info"
          >
            Showing {results.length} of {totalResults} results (Page {page})
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={itemVariants}
          >
            <UserList results={results} />
          </motion.div>
        )}
      </AnimatePresence>

        <AnimatePresence>
          {(hasNextPage || page > 1) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              variants={itemVariants}
            >
              <PageNavigation
                onPrevPage={onPrevPage}
                onNextPage={onNextPage}
                page={page}
                results={results}
                hasNextPage={hasNextPage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
