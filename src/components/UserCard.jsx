import React from "react";
import { motion } from "framer-motion";
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
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45, // 10% faster (was 0.5)
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.18 } // 10% faster (was 0.2)
    }
  };

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image src={user.avatar_url} wrapped ui={false} />
        </motion.div>
        <CardContent className="card-main-content">
          <CardHeader>{user.name || user.login}</CardHeader>
          <CardMeta>
            <span className="date">{user.location}</span>
          </CardMeta>
          <CardDescription style={{ color: user.bio ? "" : "lightgrey" }}>
            {user.bio || "No bio available."}
          </CardDescription>
        </CardContent>
        <CardContent extra className="card-followers">
          <Icon name="user" />
          {user.followers} followers
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default UserCard;
