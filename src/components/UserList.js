import React from "react";
import UserCard from "./UserCard";

function UserList({ results }) {
  return (
    <div className="list">
      {results.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
