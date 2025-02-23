import React, { useState } from "react";
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
      `${API_URL}/search/users?q=${username}&per_page=5&page=${page}`
    );
    const json = await response.json();

    // Fetch detailed information for each user
    const detailedUserPromises = json.items.map(async (user) => {
      const userDetailsResponse = await fetch(`${API_URL}/users/${user.login}`);
      const userDetails = await userDetailsResponse.json();
      return userDetails;
    });

    // Wait for all user details requests to complete
    const detailedUsers = await Promise.all(detailedUserPromises);

    return detailedUsers || [];
  } catch (e) {
    throw new Error(e);
  }
}

export default function App() {
  // State to store the username input by the user
  const [username, setUsername] = useState("");

  // State to store the search results
  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onSearchChange(e) {
    setUsername(e.target.value);
  }

  async function onSearchSubmit(page) {
    setLoading(true);
    setError("");
    try {
      const results = await handleSearch(username, page);
      setResults(results);
    } catch (e) {
      setError("Failed to fetch users. Please try again.");
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
  // Render the main UI of the App
  return (
    <div className="app">
      <div className="navbar">
        <h3>Github User Search Engine</h3>
      </div>
      <SearchForm
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        value={username}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <UserList results={results} />
      <PageNavigation
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        page={page}
        results={results}
      />
    </div>
  );
}
