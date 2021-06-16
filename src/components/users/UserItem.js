import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  const { login, avatar_url } = user;
  return (
    <div className="card text-center bg1">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />

      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my">
          More
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
