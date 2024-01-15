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
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

async function handleUserDetails(username) {
  try {
    const response = await fetch(`${API_URL}/users/${username}`);
    const data = await response.json();
    console.log(data);
    return data || {};
  } catch (e) {
    throw new Error(e);
  }
}

export default function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  function onSearchChange(e) {
    setUsername(e.target.value);
  }

  async function onSearchSubmit(e) {
    e.preventDefault();
    const results = await handleSearch(username);
    const userDetails = await handleUserDetails(username);
    setResults(results);
    setUserDetails(userDetails);
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

      <UserList results={results} userDetails={userDetails} />
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
            <CardHeader>{user.login}</CardHeader>
            <CardMeta>
              <span className="date">{user.location}</span>
            </CardMeta>
            <CardDescription>{user.bio}</CardDescription>
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
