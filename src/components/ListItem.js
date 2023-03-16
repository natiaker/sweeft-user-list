import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ id, name, lastName, prefix, title, imageUrl }) => {
  return (
    <Link
      to={`/user/${id}`}
      className='user-container'
      style={{ border: "2px solid red", width: "200px" }}
    >
      <img
        src={imageUrl}
        alt={`${name} ${lastName}`}
        style={{ width: "200px" }}
      />
      <div>
        <h1>
          {prefix} {name} {lastName}
        </h1>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default ListItem;
