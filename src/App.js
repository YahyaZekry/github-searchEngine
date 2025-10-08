import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "./components/SearchForm";
import UserList from "./components/UserList";
import PageNavigation from "./components/PageNavigation";
import "./App.css";

const API_URL = "https://api.github.com";

// Function to handle the search for GitHub users by username, limited to 5 items for testing purpose
async function handleSearch(username, page = 1) {
  try {
    // Fetch the search results from GitHub API
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

    // Fetch detailed information for each user
    const detailedUserPromises = json.items.map(async (user) => {
      try {
        const userDetailsResponse = await fetch(`${API_URL}/users/${user.login}`);
        if (!userDetailsResponse.ok) {
          console.warn(`Failed to fetch details for user ${user.login}`);
          return null;
        }
        const userDetails = await userDetailsResponse.json();
        return userDetails;
      } catch (error) {
        console.warn(`Error fetching details for user ${user.login}:`, error);
        return null;
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

  // State to store the search results
  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  function onSearchChange(e) {
    setUsername(e.target.value);
  }

  async function onSearchSubmit(pageNum = 1) {
    if (!username.trim()) {
      setError("Please enter a GitHub username to search.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const searchResult = await handleSearch(username.trim(), pageNum);
      const { users, totalCount } = searchResult;

      setResults(users);
      setTotalResults(totalCount);
      setHasNextPage(pageNum * 5 < totalCount);

      if (users.length === 0) {
        setError("No users found. Please try a different username.");
      }
    } catch (e) {
      setError(e.message || "Failed to fetch users. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  }

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
      {/* Animated background elements */}
      <div className="background-animations">
        <motion.div
          className="floating-element floating-1"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5.4, // 10% faster (was 6)
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
            duration: 7.2, // 10% faster (was 8)
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9 // 10% faster (was 1)
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
            duration: 6.3, // 10% faster (was 7)
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8 // 10% faster (was 2)
          }}
        />
        <motion.div
          className="floating-element floating-4"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4.5, // 10% faster
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="floating-element floating-5"
          animate={{
            y: [0, 18, 0],
            x: [0, 25, 0],
            rotate: [0, -7, 0],
          }}
          transition={{
            duration: 6.75, // 10% faster
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div
          className="floating-element floating-6"
          animate={{
            y: [0, -12, 0],
            x: [0, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 5.85, // 10% faster
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        <motion.div
          className="floating-element floating-7"
          animate={{
            y: [0, 25, 0],
            x: [0, -10, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 4.95,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2
          }}
        />
        <motion.div
          className="floating-element floating-8"
          animate={{
            y: [0, -18, 0],
            x: [0, 22, 0],
            scale: [1, 0.85, 1],
          }}
          transition={{
            duration: 7.65,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />
        <motion.div
          className="floating-element floating-9"
          animate={{
            y: [0, 14, 0],
            x: [0, -18, 0],
            rotate: [0, -12, 0],
          }}
          transition={{
            duration: 6.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.8
          }}
        />
        <motion.div
          className="floating-element floating-10"
          animate={{
            y: [0, -22, 0],
            x: [0, 12, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
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
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="error-message"
          >
            {error}
          </motion.p>
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
