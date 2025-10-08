import React from "react";
import { motion } from "framer-motion";
import UserCard from "./UserCard";

function UserList({ results }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09, // 10% faster (was 0.1)
        delayChildren: 0.18 // 10% faster (was 0.2)
      }
    }
  };

  return (
    <motion.div
      className="list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {results.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </motion.div>
  );
}

export default UserList;
