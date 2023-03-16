import React from "react";

const ListItem = ({ name, lastName, prefix, title, imageUrl }) => {
  return (
    <div
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
    </div>
  );
};

export default ListItem;
