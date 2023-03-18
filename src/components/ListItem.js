import React from "react";
import { Link } from "react-router-dom";
import { UserProfile } from "../styles/ListItem.styled";

const ListItem = ({ id, name, lastName, prefix, title, imageUrl }) => {
  return (
    <UserProfile>
      <Link
        to={`/user/${id}`}
        className='user-profile'
      >
        <img
          src={`${imageUrl}?v${id}`}
          alt={`${name} ${lastName}`}
        />
        <div>
          <h1>
            {prefix} {name} {lastName}
          </h1>
          <p>{title}</p>
        </div>
      </Link>
    </UserProfile>
  );
};

export default ListItem;
