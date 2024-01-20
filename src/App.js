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

async function handleSearch(username) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${username}`);
    const json = await response.json();
    console.log(json);

    // Fetch detailed information for each user
    const detailedUserPromises = json.items.map(async (user) => {
      const userDetailsResponse = await fetch(`${API_URL}/users/${user.login}`);
      const userDetails = await userDetailsResponse.json();
      console.log(userDetails);
      return userDetails;
    });

    // Wait for all user details requests to complete
    const detailedUsers = await Promise.all(detailedUserPromises);

    console.log(detailedUsers);
    return detailedUsers || [];
  } catch (e) {
    throw new Error(e);
  }
}

export default function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);

  function onSearchChange(e) {
    setUsername(e.target.value);
  }

  async function onSearchSubmit(e) {
    e.preventDefault();
    const results = await handleSearch(username);
    setResults(results);
  }

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
