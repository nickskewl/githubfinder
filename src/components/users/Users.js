import React, { useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { users, loading, searchResult } = githubContext;

  if (loading) {
    return <Spinner />;
  }

  if (!searchResult)
    return (
      <div className="card bg1">
        <h3 className="text-danger py">No User Found :( </h3>
        <p>Sorry, but nothing matched your search query. Please try again.</p>
      </div>
    );
  return (
    <div style={usersStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const usersStyle = {
  display: "grid",
  overflowX: "auto",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
