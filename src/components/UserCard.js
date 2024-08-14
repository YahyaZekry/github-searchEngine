import React from "react";
import {
  Card,
  CardContent,
  CardMeta,
  CardHeader,
  CardDescription,
  Image,
  Icon,
} from "semantic-ui-react";

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

export default UserCard;
