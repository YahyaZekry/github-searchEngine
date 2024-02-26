import React, { useState } from "react";
import {
  Form,
  FormInput,
  FormGroup,
  FormButton,
  Card,
  CardContent,
  CardMeta,
  CardHeader,
  CardDescription,
  Image,
  Icon,
} from "semantic-ui-react";
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

  function onSearchChange(e) {
    setUsername(e.target.value);
  }

  async function onSearchSubmit(e) {
    const results = await handleSearch(username, page);
    setResults(results);
  }

  function onNextPage() {
    setPage((prevPage) => prevPage + 1);
    onSearchSubmit();
  }

  function onPrevPage() {
    setPage((prevPage) => prevPage - 1);
    onSearchSubmit();
  }
  // Render the main UI of the App
  return (
    <div className="app">
      <div class="navbar">
        <h3>Github User Search Engine</h3>
      </div>
      <SearchForm
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        value={username}
      />

      <UserList results={results} />
      {results.length > 0 ? (
        <PageNavigation onPrevPage={onPrevPage} onNextPage={onNextPage} />
      ) : null}
    </div>
  );
}

function SearchForm({ onSubmit, onChange, value }) {
  return (
    <div className="search-form">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <FormInput
            value={value}
            onChange={onChange}
            placeholder="Enter GitHub username"
          />
          <FormButton content="Search" />
        </FormGroup>
      </Form>
    </div>
  );
}

function UserList({ results }) {
  return (
    <div className="list">
      {results.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <>
      <div className="card">
        <Card>
          <Image src={user.avatar_url} wrapped ui={false} />
          <CardContent>
            <CardHeader>{user.name || user.login}</CardHeader>
            <CardMeta>
              <span className="date">{user.location}</span>
            </CardMeta>
            <CardDescription style={{ color: user.bio ? "" : "lightgrey" }}>
              {user.bio || "No bio available."}
            </CardDescription>
          </CardContent>
          <CardContent extra>
            <Icon name="user" />
            {user.followers} followers
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function PageNavigation(page, results, onPrevPage, onNextPage) {
  return (
    <div className="pageNavigation">
      {page > 1 && <button onClick={onPrevPage}>Previous</button>}
      <FormButton onClick={onNextPage}>Next</FormButton>
    </div>
  );
}
